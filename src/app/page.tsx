import HeroSlideshow from "@/components/HeroSlideshow";
import RandomProductsSection from "@/components/RandomProductsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-slate-100">
      {/* 2. Section Giới thiệu shop + Slideshow */}
      <HeroSlideshow />

      {/* 3. Section Sản phẩm nổi bật (Random client-side mỗi lần load) */}
      <RandomProductsSection />

      {/* 4. Section Liên hệ: Thông tin tĩnh + Form gửi email Formspree */}
      <ContactSection />
    </main>
  );
}
