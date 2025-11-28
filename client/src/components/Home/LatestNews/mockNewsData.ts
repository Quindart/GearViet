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
    image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/visa_thang_5_a530e55b4a.jpg",
    date: "20/08/2024",
    href: "/news/cpu-arrow-lake-overview",
    excerpt:
      "Tổng Quan Về CPU phổ thông Của Thế Hệ Arrow Core Ultra 3 205 hoặc 215, có thể sẽ là 1 trong những chiếc CPU phổ ...",
  },
  {
    id: 2,
    title: "Switch Quang và Switch Cơ: Switch nào tốt hơn?",
    image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/jcb_thang_9_cover_cf4990dce1.jpg",
    date: "09/06/2023",
    href: "/news/switch-quang-vs-switch-co",
    excerpt:
      "So sánh chi tiết giữa switch quang và switch cơ để giúp bạn lựa chọn loại phù hợp nhất.",
  },
  {
    id: 3,
    title: "Sự khác biệt giữa Low-profile switch và Normal-profile switch",
    image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/NF_1dab2fab07.png",
    date: "02/06/2023",
    href: "/news/low-profile-vs-normal-profile-switch",
    excerpt:
      "Tìm hiểu sự khác biệt về thiết kế, cảm giác gõ và ứng dụng của hai loại switch này.",
  },
  {
    id: 4,
    title: "Cách chọn Switch 'bàn phím cơ' phù hợp với bạn!",
    image: "https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2025/7/15/2-175257638060967765479.png",
    date: "24/04/2023",
    href: "/news/cach-chon-switch-ban-phim-co",
    excerpt:
      "Hướng dẫn chi tiết cách chọn switch phù hợp với nhu cầu sử dụng và sở thích cá nhân.",
  },
  {
    id: 5,
    title: "Vì sự lý AMD 7000X3D có giá khởi điểm 449 USD !!!",
    image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/NF_1dab2fab07.png",
    date: "09/02/2023",
    href: "/news/amd-7000x3d-pricing",
    excerpt:
      "Phân tích về mức giá của dòng CPU AMD 7000X3D và lý do tại sao có mức giá như vậy.",
  },
  {
    id: 6,
    title: "Razer chính thức ra mắt Leviathan V2 Pro",
    image: "https://genk.mediacdn.vn/139269124445442048/2022/5/20/photo-1-1653035865256503262648-1653039950084-16530399504671413924173.jpg",
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
    image: "https://minhancomputer.com/media/news/1711_Banner-chinh-MAN-HINH-31.png",
    date: "20/08/2024",
    href: "/tech-news/intel-gaming-cpu-promotion",
  },
  {
    id: 8,
    title: "KHUYẾN MÃI CÙNG CORSAIR VÀ ELGATO THÁNG 2",
    image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/NF_1dab2fab07.png",
    date: "21/02/2024",
    href: "/tech-news/corsair-elgato-promotion-february",
  },
  {
    id: 9,
    title: "Khuyến Mãi Cuối Năm Cùng AMD x Thế Giới Gear",
    image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/NF_1dab2fab07.pngg",
    date: "08/11/2023",
    href: "/tech-news/amd-end-year-promotion",
  },
  {
    id: 10,
    title: "RAM DDR5 - CÔNG NGHỆ TIÊN TIẾN VÀ ỨNG DỤNG THỰC TẾ",
    image: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/NF_1_7f96ff2159.png",
    date: "10/10/2023",
    href: "/tech-news/ram-ddr5-technology-applications",
  },
];
