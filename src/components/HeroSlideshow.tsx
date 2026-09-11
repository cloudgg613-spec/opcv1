"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, Flame } from "lucide-react";

const slides = [
  {
    image: "/banner3.jpg",
    title: "Trưng Bày & Sưu Tầm Đẳng Cấp",
    subtitle: "Chuyên bán và nhận order thẻ PSA, Box và phụ kiện chính hãng Japan One Piece và Pokémon",
    tag: "OPC STORE PREVIEW",
    buttonText: "Liên Hệ Shop",
    buttonLink: "/#contact",
    accentColor: "from-slate-100 via-slate-200 to-slate-400",
  },
  {
    image: "/banner1.jpg",
    title: "One Piece Card Game",
    subtitle: "Bộ sưu tập thẻ bài One Piece chính hãng hot nhất. Khám phá ngay các lá bài SR, SEC, Parallel Rare ấn tượng!",
    tag: "HOT ITEM",
    buttonText: "Xem Thẻ One Piece",
    buttonLink: "/one-piece",
    accentColor: "from-[#38bdf8] via-slate-100 to-[#818cf8]",
  },
  {
    image: "/banner2.jpg",
    title: "Pokémon TCG Collection",
    subtitle: "Tổng hợp thẻ bài Pokémon hiếm, booster box và phụ kiện cao cấp dành cho mọi nhà sưu tầm đam mê.",
    tag: "POKÉMON SPECIAL",
    buttonText: "Xem Thẻ Pokémon",
    buttonLink: "/pokemon",
    accentColor: "from-blue-400 via-slate-100 to-indigo-300",
  },
];

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[620px] md:h-[700px] overflow-hidden bg-black flex items-center justify-center">
      {/* Background Slideshow Images */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-100 scale-100 z-0" : "opacity-0 scale-105 pointer-events-none"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={idx === 0}
            className="object-cover object-center filter brightness-[0.75] contrast-105"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/50" />
        </div>
      ))}

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Overlay Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6 animate-fadeIn">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-2xl">
          <span className="block text-slate-100">Chào mừng đến với</span>
          <span className="block text-white">OPC Store</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed drop-shadow-md">
          {slides[currentIndex].subtitle}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={slides[currentIndex].buttonLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-slate-200 text-black font-extrabold text-base shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Flame className="w-5 h-5 text-black" />
            {slides[currentIndex].buttonText}
          </Link>
        </div>
      </div>

      {/* Manual Slide Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/60 hover:bg-slate-800/90 text-slate-300 hover:text-white border border-slate-800 backdrop-blur-md transition-all hidden sm:block"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/60 hover:bg-slate-800/90 text-slate-300 hover:text-white border border-slate-800 backdrop-blur-md transition-all hidden sm:block"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "w-8 bg-slate-300 shadow-md"
                : "w-2.5 bg-slate-700 hover:bg-slate-500"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
