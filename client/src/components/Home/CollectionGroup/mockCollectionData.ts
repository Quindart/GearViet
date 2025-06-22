export interface Product {
  id: number;
  name: string;
  image: string;
  originalPrice?: number;
  salePrice: number;
  discount?: number;
  href: string;
}

export const pcGamingTags = [
  "Gold i3",
  "Platinum i5",
  "Diamond i7",
  "Master i9",
];

export const monitorTags = [
  "Phân Loại Màn Hình",
  "Giá Tiền",
  "Kích Thước",
  "Độ Phân Giải",
  "Tần Số Quét",
  "Phụ Kiện",
];

export const keyboardTags = [
  "Keyboard Dưới 1 Triệu",
  "Keyboard Từ 1 Đến 2 Triệu",
  "Keyboard Từ 2 Đến 3 Triệu",
  "Keyboard Trên 3 Triệu",
  "Keyboard Wireless",
];

export const mockPCGamingProducts: Product[] = [
  {
    id: 1,
    name: "Bộ máy tính TGG DIAMOND I | 12TH",
    image: "https://placehold.co/450x400/png",
    originalPrice: 20490000,
    salePrice: 19890000,
    discount: 3,
    href: "/products/pc-tgg-diamond-i-12th",
  },
  {
    id: 2,
    name: "Bộ máy tính TGG GOLD I | 12TH",
    image: "https://placehold.co/450x400/png",
    originalPrice: 12490000,
    salePrice: 11790000,
    discount: 6,
    href: "/products/pc-tgg-gold-i-12th",
  },
  {
    id: 3,
    name: "Bộ máy tính TGG GOLD I | 14th",
    image: "https://placehold.co/450x400/png",
    originalPrice: 24990000,
    salePrice: 24340000,
    discount: 3,
    href: "/products/pc-tgg-gold-i-14th",
  },
  {
    id: 4,
    name: "Bộ máy tính TGG GOLD III | 13TH",
    image: "https://placehold.co/450x400/png",
    originalPrice: 15390000,
    salePrice: 14669000,
    discount: 5,
    href: "/products/pc-tgg-gold-iii-13th",
  },
  {
    id: 5,
    name: "Bộ máy tính TGG GOLD V | 12TH",
    image: "https://placehold.co/450x400/png",
    originalPrice: 19190000,
    salePrice: 17838000,
    discount: 7,
    href: "/products/pc-tgg-gold-v-12th",
  },
  {
    id: 6,
    name: "Bộ máy tính TGG PLATIUM I | 12TH",
    image: "https://placehold.co/450x400/png",
    originalPrice: 14990000,
    salePrice: 14750000,
    discount: 2,
    href: "/products/pc-tgg-platinum-i-12th",
  },
  {
    id: 7,
    name: "Bộ máy tính TGG MASTER X | 13TH",
    image: "https://placehold.co/450x400/png",
    originalPrice: 29990000,
    salePrice: 27990000,
    discount: 7,
    href: "/products/pc-tgg-master-x-13th",
  },
  {
    id: 8,
    name: "Bộ máy tính TGG ELITE PRO | 12TH",
    image: "https://placehold.co/450x400/png",
    originalPrice: 35990000,
    salePrice: 32990000,
    discount: 8,
    href: "/products/pc-tgg-elite-pro-12th",
  },
];

export const mockMonitorProducts: Product[] = [
  {
    id: 9,
    name: "Màn Hình Gaming ASUS TUF VG27AQ 27 Inch 165Hz IPS",
    image: "https://placehold.co/450x400/png",
    originalPrice: 8490000,
    salePrice: 7990000,
    discount: 6,
    href: "/products/monitor-asus-tuf-vg27aq",
  },
  {
    id: 10,
    name: "Màn Hình LG 27GP850-B 27 Inch 165Hz Nano IPS",
    image: "https://placehold.co/450x400/png",
    originalPrice: 9990000,
    salePrice: 9290000,
    discount: 7,
    href: "/products/monitor-lg-27gp850-b",
  },
  {
    id: 11,
    name: "Màn Hình Samsung Odyssey G5 32 Inch 144Hz VA",
    image: "https://placehold.co/450x400/png",
    originalPrice: 7490000,
    salePrice: 6990000,
    discount: 7,
    href: "/products/monitor-samsung-odyssey-g5",
  },
  {
    id: 12,
    name: "Màn Hình AOC 24G2 24 Inch 144Hz IPS FreeSync",
    image: "https://placehold.co/450x400/png",
    originalPrice: 4490000,
    salePrice: 3990000,
    discount: 11,
    href: "/products/monitor-aoc-24g2",
  },
  {
    id: 13,
    name: "Màn Hình MSI Optix MAG274QRF-QD 27 Inch 165Hz",
    image: "https://placehold.co/450x400/png",
    originalPrice: 11990000,
    salePrice: 10990000,
    discount: 8,
    href: "/products/monitor-msi-optix-mag274qrf",
  },
  {
    id: 14,
    name: "Màn Hình Dell S2721DGF 27 Inch 165Hz IPS G-Sync",
    image: "https://placehold.co/450x400/png",
    originalPrice: 9990000,
    salePrice: 8990000,
    discount: 10,
    href: "/products/monitor-dell-s2721dgf",
  },
  {
    id: 15,
    name: "Màn Hình BenQ ZOWIE XL2546K 24.5 Inch 240Hz TN",
    image: "https://placehold.co/450x400/png",
    originalPrice: 13990000,
    salePrice: 12990000,
    discount: 7,
    href: "/products/monitor-benq-zowie-xl2546k",
  },
  {
    id: 16,
    name: "Màn Hình Alienware AW2521H 25 Inch 360Hz IPS",
    image: "https://placehold.co/450x400/png",
    originalPrice: 15990000,
    salePrice: 14990000,
    discount: 6,
    href: "/products/monitor-alienware-aw2521h",
  },
];

export const mockKeyboardProducts: Product[] = [
  {
    id: 17,
    name: "Bàn Phím Cơ Logitech G Pro X TKL - Cherry MX Blue",
    image: "https://placehold.co/450x400/png",
    originalPrice: 2990000,
    salePrice: 2490000,
    discount: 17,
    href: "/products/keyboard-logitech-g-pro-x-tkl",
  },
  {
    id: 18,
    name: "Bàn Phím Cơ Corsair K70 RGB MK.2 - Cherry MX Red",
    image: "https://placehold.co/450x400/png",
    originalPrice: 3990000,
    salePrice: 3490000,
    discount: 13,
    href: "/products/keyboard-corsair-k70-rgb-mk2",
  },
  {
    id: 19,
    name: "Bàn Phím Cơ Razer BlackWidow V3 - Green Switch",
    image: "https://placehold.co/450x400/png",
    originalPrice: 3490000,
    salePrice: 2990000,
    discount: 14,
    href: "/products/keyboard-razer-blackwidow-v3",
  },
  {
    id: 20,
    name: "Bàn Phím Cơ SteelSeries Apex Pro TKL - OmniPoint",
    image: "https://placehold.co/450x400/png",
    originalPrice: 4990000,
    salePrice: 4290000,
    discount: 14,
    href: "/products/keyboard-steelseries-apex-pro-tkl",
  },
  {
    id: 21,
    name: "Bàn Phím Cơ HyperX Alloy FPS Pro TKL - Cherry MX",
    image: "https://placehold.co/450x400/png",
    originalPrice: 1990000,
    salePrice: 1690000,
    discount: 15,
    href: "/products/keyboard-hyperx-alloy-fps-pro",
  },
  {
    id: 22,
    name: "Bàn Phím Cơ ASUS ROG Strix Scope TKL - Cherry MX",
    image: "https://placehold.co/450x400/png",
    originalPrice: 2490000,
    salePrice: 2190000,
    discount: 12,
    href: "/products/keyboard-asus-rog-strix-scope",
  },
  {
    id: 23,
    name: "Bàn Phím Cơ Keychron K2 V2 Wireless - Gateron",
    image: "https://placehold.co/450x400/png",
    originalPrice: 2790000,
    salePrice: 2390000,
    discount: 14,
    href: "/products/keyboard-keychron-k2-v2",
  },
  {
    id: 24,
    name: "Bàn Phím Cơ Ducky One 2 Mini RGB - Cherry MX",
    image: "https://placehold.co/450x400/png",
    originalPrice: 2990000,
    salePrice: 2690000,
    discount: 10,
    href: "/products/keyboard-ducky-one-2-mini",
  },
];
