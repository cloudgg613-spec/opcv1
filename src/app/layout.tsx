import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DifyChatbot from "@/components/DifyChatbot";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OPC Store — One Piece & Pokémon Card Game",
  description: "Website trưng bày sản phẩm thẻ bài, box & phụ kiện One Piece và Pokémon.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-black text-slate-100 min-h-screen flex flex-col justify-between selection:bg-slate-700 selection:text-white`}
      >
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <DifyChatbot />
      </body>
    </html>
  );
}
