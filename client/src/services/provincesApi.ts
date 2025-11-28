const PROVINCES_API_BASE = "https://provinces.open-api.vn/api/v2";

export interface Province {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  wards: Ward[];
}

export interface Ward {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
}

export const getProvinces = async (): Promise<Province[]> => {
  try {
    const response = await fetch(`${PROVINCES_API_BASE}/`);
    if (!response.ok) {
      throw new Error("Failed to fetch provinces");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get provinces error:", error);
    return [];
  }
};

export const getProvinceWithWards = async (
  provinceCode: number
): Promise<Province | null> => {
  try {
    const response = await fetch(
      `${PROVINCES_API_BASE}/p/${provinceCode}?depth=2`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch province with wards");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get province with wards error:", error);
    return null;
  }
};

