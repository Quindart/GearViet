import requests
from bs4 import BeautifulSoup
import json
import uuid
import time
from dotenv import load_dotenv

load_dotenv()

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

API_URL = "http://localhost:8000/product"
BEARER_TOKEN = os.getenv("API_BEARER")

DEFAULT_SUBCATEGORY_ID = "68397dc7f1382c4b0e7c562c"

def get_product_links(collection_url):
    response = requests.get(collection_url, headers=HEADERS)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    links = []
    for a in soup.select("a[href^='/products/']"):
        href = a.get("href")
        full_url = "https://thegioigear.vn" + href.split('?')[0]
        if full_url not in links:
            links.append(full_url)
    return links

def scrape_product_page(url):
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    name = soup.select_one("h1.green")
    brand = soup.select_one(".pro-brand .title")
    price_tag = soup.select_one("#pro-price .price-now")
    description_html = soup.select_one(".product-description-tab")
    image_tags = soup.select(".product-gallery .item img")

    name = name.text.strip() if name else "Unknown"
    brand = brand.text.strip() if brand else "no brand"
    price = 0
    if price_tag:
        price_text = price_tag.text.strip().replace(",", "").replace("₫", "")
        try:
            price = int(price_text)
        except:
            price = 0

    image_urls = [
        "https:" + img.get("data-src")
        for img in image_tags if img.get("data-src")
    ]

    description = str(description_html) if description_html else ""

    code = str(uuid.uuid4())[:13]
    
    product_payload = {
        "name": name,
        "code": code,
        "image": [{"url": url, "public_id": str(uuid.uuid4())[:8]} for url in image_urls],
        "price": price,
        "description": description,
        "available": 999,
        "brand": brand,
        "subcategory": DEFAULT_SUBCATEGORY_ID
    }

    print(f"🔍 Scraped product: {name} - Price: {price}₫ - Images: {len(image_urls)}")

    return product_payload

def post_to_api(product_data):
    headers = {
        "Authorization": BEARER_TOKEN,
        "Content-Type": "application/json"
    }
    try:
        response = requests.post(API_URL, headers=headers, json=product_data)
        if response.status_code in [200, 201]:
            print(f"✅ Product '{product_data['name']}' posted successfully.")
        else:
            print(f"❌ Failed to post '{product_data['name']}': {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ Error posting '{product_data['name']}': {e}")

if __name__ == "__main__":
    all_products = []
    base_url = "https://thegioigear.vn/collections/cpu-bo-vi-xu-ly/"
    product_links = get_product_links(base_url)
    print(f"🔍 Found {len(product_links)} product links.")

    for idx, link in enumerate(product_links):
        try:
            print(f"🔄 Scraping ({idx+1}/{len(product_links)}): {link}")
            product = scrape_product_page(link)
            all_products.append(product)
            post_to_api(product)
            time.sleep(1)
        except Exception as e:
            print(f"❌ Failed on {link}: {e}")

    with open("products_output.json", "w", encoding="utf-8") as f:
        json.dump(all_products, f, ensure_ascii=False, indent=2)

    print("✅ Done. Saved to products_output.json and posted to API.")
