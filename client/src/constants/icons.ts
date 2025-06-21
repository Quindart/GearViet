export const ICONS = {
  SEARCH: "search-icon.svg",
  LOCATION: "location-icon.svg",
  USER: "user-icon.svg",
  CART: "cart-icon.svg",
  MENU: "header-menu.png",
  MENU_ACTIVE: "header-menu-active.png",
  WARRANTY: "header-doi-tra.jpeg",
  PAYMENT: "header-hinh-thuc-thanh-toan.jpeg",
  SHIPPING: "header-giao-hang.png",
  INSTALLMENT: "header-tra-gop.png",
  ARROW_DOWN: "arrow-down.svg",
  PHONE: "phone-icon.svg",
  FOOTER_DA_THONG_BAO: "footer-da-thong-bao.png",
  FOOTER_TRUST: "footer-trust.jpeg",
  FOOTER_LOGO: "footer-logo.jpeg",
} as const;

export type IconName = keyof typeof ICONS;
