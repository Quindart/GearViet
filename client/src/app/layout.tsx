import type { Metadata } from "next";
import { mulish } from '@/config/fonts'
import "./globals.css";

export const metadata: Metadata = {
  title: "Thế Giới Gaming hàng đầu Việt Nam",
  description: "Cung cấp các thiết bị và linh kiện Hi-End chính hãng Làm việc: T2 - CN 9:00 AM - 20:00 PM. Theo dõi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={mulish.variable}>
      <body>{children}</body>
    </html>
  )
}
