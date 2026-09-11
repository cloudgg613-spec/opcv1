"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/one-piece", label: "One Piece" },
    { href: "/pokemon", label: "Pokémon" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/90 border-b border-slate-800/80 shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-18 flex items-center justify-between">
        {/* Logo (Trái) */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60 group-hover:border-slate-500 transition-all duration-300 shadow-md shrink-0">
            <Image
              src="/logo.png"
              alt="OPC Store Logo"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm sm:text-lg tracking-tight text-white leading-none sm:leading-tight">
              OPC STORE
            </span>
            <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5 sm:mt-0">
              Card Game Collection
            </span>
          </div>
        </Link>

        {/* Menu Ngang Desktop */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-white font-bold border-b-2 border-slate-300 pb-0.5"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/#contact"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-200 text-black font-bold text-xs tracking-wide transition-all shadow-md"
          >
            <Phone className="w-3.5 h-3.5 text-black" />
            Liên hệ ngay
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800/90 px-3 py-2.5 space-y-1 animate-fadeIn backdrop-blur-xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex sm:hidden items-center justify-center gap-2 mt-2 px-3 py-2 rounded-lg bg-white hover:bg-slate-200 text-black font-bold text-xs transition-all shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-black" />
            Liên hệ ngay
          </Link>
        </div>
      )}
    </header>
  );
}
