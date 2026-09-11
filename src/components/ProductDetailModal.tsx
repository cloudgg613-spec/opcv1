"use client";

import { useState } from "react";
import Image from "next/image";
import { X, CheckCircle, XCircle, Tag, Sparkles, MessageCircle, Phone } from "lucide-react";
import { Product } from "@/types/product";
import { urlForImage } from "@/sanity/lib/image";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  // Format price
  const formattedPrice = typeof product.price === "number"
    ? `${product.price.toLocaleString("vi-VN")} VNĐ`
    : "Liên hệ shop";

  // Process images
  const images = product.images || [];
  const activeImage = images[activeImageIndex];
  const activeImageUrl = activeImage
    ? typeof activeImage === "string"
      ? activeImage
      : urlForImage(activeImage)?.url() || "/banner1.jpg"
    : "/banner1.jpg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Modal Card Container */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#09090b] border border-slate-700/80 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-all"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gallery Image Preview (Trái) */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner">
              <Image
                src={activeImageUrl}
                alt={product.name}
                fill
                className="object-contain p-2 hover:scale-105 transition-transform duration-300"
              />
              {/* Category Tag Badge */}
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-slate-900/90 text-slate-200 border border-slate-700 backdrop-blur-md">
                {product.category === "one-piece" ? "One Piece TCG" : "Pokémon TCG"}
              </span>
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => {
                  const imgUrl = typeof img === "string" ? img : urlForImage(img)?.url() || "/banner1.jpg";
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-slate-900 ${
                        idx === activeImageIndex
                          ? "border-slate-400 scale-105 shadow-md"
                          : "border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={imgUrl} alt={`${product.name} ${idx + 1}`} fill className="object-contain p-1" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Product Details (Phải) */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                  <Tag className="w-3.5 h-3.5" />
                  {product.type === "card" ? "Thẻ Bài" : product.type === "box" ? "Box Sản Phẩm" : "Phụ Kiện"}
                </span>

                {product.rarity && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-slate-900 text-slate-300 border border-slate-800 uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                    {product.rarity}
                  </span>
                )}

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold border ${
                    product.inStock
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                  }`}
                >
                  {product.inStock ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {product.inStock ? "Còn Hàng" : "Tạm Hết Hàng"}
                </span>
              </div>

              {/* Title & Price */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {product.name}
              </h2>

              <div className="text-3xl font-extrabold text-emerald-400">
                {formattedPrice}
              </div>

              {/* Description */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  Mô Tả Sản Phẩm:
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {product.description || "Chưa có mô tả chi tiết cho sản phẩm này."}
                </p>
              </div>
            </div>

            {/* Direct Purchase Contact CTA */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <p className="text-xs text-slate-400 italic">
                * Shop không hỗ trợ thanh toán online trực tiếp. Khách hàng vui lòng liên hệ ngoài để đặt mua & nhận tư vấn chi tiết!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://zalo.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat Zalo Đặt Hàng
                </a>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Xem Thông Tin Shop
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
