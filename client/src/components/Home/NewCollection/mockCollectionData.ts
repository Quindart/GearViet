export interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice?: number;
  salePrice: number;
  discount?: number;
  href: string;
}

export const mockNewProducts: Product[] = [
  {
    id: 1,
    name: "Giá Treo Màn Hình - HyperWork T9 Pro III / 2 Màn Hình / 17-32 Inch",
    image: "https://placehold.co/180/png",
    salePrice: 2390000,
    href: "/products/monitor-arm-hyperwork-t9-pro",
  },
  {
    id: 2,
    name: "Case Máy Tính - Tryx LUCA L70 Black White",
    image: "https://placehold.co/180/png",
    salePrice: 5490000,
    href: "/products/case-tryx-luca-l70",
  },
  {
    id: 3,
    name: "Tản nhiệt nước AIO - TryX Panorama ARGB 360mm",
    image: "https://placehold.co/180/png",
    salePrice: 9790000,
    href: "/products/aio-tryx-panorama-360",
  },
  {
    id: 4,
    name: "Bàn Phím Cơ Gaming - Corsair K70 RGB Pro",
    image: "https://placehold.co/180/png",
    salePrice: 3290000,
    href: "/products/keyboard-corsair-k70",
  },
  {
    id: 5,
    name: "Màn Hình Gaming - ASUS TUF VG27AQ 27 Inch 144Hz",
    image: "https://placehold.co/180/png",
    salePrice: 6490000,
    href: "/products/monitor-asus-tuf-vg27aq",
  },
];

export const mockBestSellers: Product[] = [
  {
    id: 6,
    name: "Lót chuột - COUGAR ARENA BLACK / 800 x 300 x 5mm",
    image: "https://placehold.co/180/png",
    originalPrice: 350000,
    salePrice: 290000,
    discount: 17,
    href: "/products/mousepad-cougar-arena",
  },
  {
    id: 7,
    name: "Chuột Chơi Game Không Dây - Razer Basilisk V3 Pro",
    image: "https://placehold.co/180/png",
    originalPrice: 1999000,
    salePrice: 1490000,
    discount: 25,
    href: "/products/mouse-razer-basilisk-v3",
  },
  {
    id: 8,
    name: "Tai Nghe Chơi Game Có Dây - Razer Kraken V3 X",
    image: "https://placehold.co/180/png",
    originalPrice: 1490000,
    salePrice: 1290000,
    discount: 13,
    href: "/products/headset-razer-kraken-v3x",
  },
  {
    id: 9,
    name: "Card Đồ Họa - NVIDIA GeForce RTX 4070 Super",
    image: "https://placehold.co/180/png",
    originalPrice: 18990000,
    salePrice: 16990000,
    discount: 11,
    href: "/products/gpu-rtx-4070-super",
  },
  {
    id: 10,
    name: "RAM Gaming - G.Skill Trident Z5 32GB DDR5 6000MHz",
    image: "https://placehold.co/180/png",
    originalPrice: 4590000,
    salePrice: 3990000,
    discount: 13,
    href: "/products/ram-gskill-trident-z5",
  },
];
