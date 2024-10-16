import type { Metadata } from "next";
import "./globals.css";

// 검색 최적화 시 중요!!
// 페이지마다 타이틀, 설명 다르게 들어가는 경우 있음.
export const metadata: Metadata = {
  title: "영화 위키",
  description: "일별 박스 오피스를 확인하고 영화 정보와 영화인 정보를 조회할 수 있습니다.",
  openGraph: {
    title: "영화 위키",
    description: "일별 박스 오피스를 확인하고 영화 정보와 영화인 정보를 조회할 수 있습니다.",
    images: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* 파비콘 */}</head>
      <body>{children}</body>
    </html>
  );
}
