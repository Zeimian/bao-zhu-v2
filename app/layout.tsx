import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "宝珠 AI 营养管理系统",
  description: "智能 SOP 解析与营养计算平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
