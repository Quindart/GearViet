export interface NewsItem {
  id: number;
  title: string;
  image: string;
  date: string;
  href: string;
  excerpt?: string;
}

export const mockGeneralNews: NewsItem[] = [
  {
    id: 1,
    title: "Tổng Quan Về CPU phổ thông Của Thế Hệ Arrow",
    image: "https://placehold.co/450x300/png",
    date: "20/08/2024",
    href: "/news/cpu-arrow-lake-overview",
    excerpt:
      "Tổng Quan Về CPU phổ thông Của Thế Hệ Arrow Core Ultra 3 205 hoặc 215, có thể sẽ là 1 trong những chiếc CPU phổ ...",
  },
  {
    id: 2,
    title: "Switch Quang và Switch Cơ: Switch nào tốt hơn?",
    image: "https://placehold.co/450x300/png",
    date: "09/06/2023",
    href: "/news/switch-quang-vs-switch-co",
    excerpt:
      "So sánh chi tiết giữa switch quang và switch cơ để giúp bạn lựa chọn loại phù hợp nhất.",
  },
  {
    id: 3,
    title: "Sự khác biệt giữa Low-profile switch và Normal-profile switch",
    image: "https://placehold.co/450x300/png",
    date: "02/06/2023",
    href: "/news/low-profile-vs-normal-profile-switch",
    excerpt:
      "Tìm hiểu sự khác biệt về thiết kế, cảm giác gõ và ứng dụng của hai loại switch này.",
  },
  {
    id: 4,
    title: "Cách chọn Switch 'bàn phím cơ' phù hợp với bạn!",
    image: "https://placehold.co/450x300/png",
    date: "24/04/2023",
    href: "/news/cach-chon-switch-ban-phim-co",
    excerpt:
      "Hướng dẫn chi tiết cách chọn switch phù hợp với nhu cầu sử dụng và sở thích cá nhân.",
  },
  {
    id: 5,
    title: "Vì sự lý AMD 7000X3D có giá khởi điểm 449 USD !!!",
    image: "https://placehold.co/450x300/png",
    date: "09/02/2023",
    href: "/news/amd-7000x3d-pricing",
    excerpt:
      "Phân tích về mức giá của dòng CPU AMD 7000X3D và lý do tại sao có mức giá như vậy.",
  },
  {
    id: 6,
    title: "Razer chính thức ra mắt Leviathan V2 Pro",
    image: "https://placehold.co/450x300/png",
    date: "13/01/2023",
    href: "/news/razer-leviathan-v2-pro-launch",
    excerpt:
      "Soundbar gaming mới nhất từ Razer với nhiều tính năng và công nghệ tiên tiến.",
  },
];

export const mockTechNews: NewsItem[] = [
  {
    id: 7,
    title: "MUA CPU NHÂN GAME HOT TỪ INTEL",
    image: "https://placehold.co/450x300/png",
    date: "20/08/2024",
    href: "/tech-news/intel-gaming-cpu-promotion",
  },
  {
    id: 8,
    title: "KHUYẾN MÃI CÙNG CORSAIR VÀ ELGATO THÁNG 2",
    image: "https://placehold.co/450x300/png",
    date: "21/02/2024",
    href: "/tech-news/corsair-elgato-promotion-february",
  },
  {
    id: 9,
    title: "Khuyến Mãi Cuối Năm Cùng AMD x Thế Giới Gear",
    image: "https://placehold.co/450x300/png",
    date: "08/11/2023",
    href: "/tech-news/amd-end-year-promotion",
  },
  {
    id: 10,
    title: "RAM DDR5 - CÔNG NGHỆ TIÊN TIẾN VÀ ỨNG DỤNG THỰC TẾ",
    image: "https://placehold.co/450x300/png",
    date: "10/10/2023",
    href: "/tech-news/ram-ddr5-technology-applications",
  },
];
