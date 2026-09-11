"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Sparkles, RefreshCw, Eye, Tag, CheckCircle } from "lucide-react";
import { Product } from "@/types/product";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import ProductDetailModal from "./ProductDetailModal";

// Initial Demo Products (Fallback if Sanity DB has not been populated yet)
const INITIAL_DEMO_PRODUCTS: Product[] = [
  {
    _id: "op-01",
    name: "Monkey D. Luffy (Parallel SEC) — OP05",
    slug: { current: "monkey-d-luffy-op05" },
    category: "one-piece",
    type: "card",
    price: 3500000,
    description: "Thẻ bài Monkey D. Luffy phiên bản Secret Parallel Rare cực hiếm thuộc booster pack OP-05 Awakening of the New Era. Tình trạng card MINT 10/10.",
    inStock: true,
    rarity: "SEC Parallel",
    images: [],
  },
  {
    _id: "pk-01",
    name: "Charizard ex Special Art Rare — 151",
    slug: { current: "charizard-ex-sar-151" },
    category: "pokemon",
    type: "card",
    price: 2800000,
    description: "Lá bài Charizard ex SAR mã #201/165 thuộc bộ Pokémon Card 151 Nhật Bản. Minh họa ấn tượng với hiệu ứng holo lấp lánh.",
    inStock: true,
    rarity: "SAR (Special Art)",
    images: [],
  },
  {
    _id: "op-02",
    name: "Booster Box One Piece OP-07 500 Years Into the Future",
    slug: { current: "booster-box-op07" },
    category: "one-piece",
    type: "box",
    price: 1450000,
    description: "Hộp bài nguyên seal chính hãng Bandai gồm 24 pack (6 lá/pack). Cơ hội trúng thẻ Manga Rare Boa Hancock & Portgas D. Ace!",
    inStock: true,
    rarity: "Booster Box Seal",
    images: [],
  },
  {
    _id: "pk-02",
    name: "Pikachu Illustrator Commemorative Promo",
    slug: { current: "pikachu-illustrator-promo" },
    category: "pokemon",
    type: "card",
    price: 5200000,
    description: "Thẻ bài Pikachu kỉ niệm giới hạn phát hành tại Nhật Bản. Có khay bảo vệ Acrylic từ tính bảo quản an toàn.",
    inStock: true,
    rarity: "Promo Limited",
    images: [],
  },
  {
    _id: "op-03",
    name: "Bao Sleeve Bảo Vệ Thẻ One Piece Premium (65 cái)",
    slug: { current: "op-sleeve-premium" },
    category: "one-piece",
    type: "accessory",
    price: 220000,
    description: "Bọc thẻ bài cao cấp in hình logo Băng Mũ Rơm chuẩn kích thước 67x92mm, chất liệu Matte chống chói.",
    inStock: true,
    rarity: "Phụ kiện chính hãng",
    images: [],
  },
  {
    _id: "pk-03",
    name: "Pokémon TCG Elite Trainer Box Scarlet & Violet",
    slug: { current: "pokemon-etb-scarlet-violet" },
    category: "pokemon",
    type: "box",
    price: 1300000,
    description: "Bộ Elite Trainer Box đầy đủ 9 booster packs, bọc thẻ bài promo Koraidon/Miraidon, xúc xắc chỉ số và hộp đựng tiện lợi.",
    inStock: true,
    rarity: "ETB Sealed",
    images: [],
  },
];

export default function RandomProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Function to randomize array order
  const shuffleArray = useCallback(<T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  }, []);

  const fetchAndRandomizeProducts = useCallback(async () => {
    setLoading(true);
    try {
      // Query Sanity
      const query = `*[_type == "product"] {
        _id,
        name,
        slug,
        category,
        type,
        price,
        description,
        inStock,
        rarity,
        images
      }`;
      const sanityProducts: Product[] = await client.fetch(query);

      if (sanityProducts && sanityProducts.length > 0) {
        // Randomize Sanity products
        setProducts(shuffleArray(sanityProducts).slice(0, 4));
      } else {
        // Fallback to randomized demo products
        setProducts(shuffleArray(INITIAL_DEMO_PRODUCTS).slice(0, 4));
      }
    } catch (err) {
      console.error("Error fetching Sanity products:", err);
      setProducts(shuffleArray(INITIAL_DEMO_PRODUCTS).slice(0, 4));
    } finally {
      setLoading(false);
    }
  }, [shuffleArray]);

  // Run randomize every time the page loads
  useEffect(() => {
    fetchAndRandomizeProducts();
  }, [fetchAndRandomizeProducts]);

  return (
    <section className="py-20 bg-black border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="border-b border-slate-800 pb-6">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Khám phá các mẫu thẻ bài, box và phụ kiện hot từ cả hai vũ trụ One Piece & Pokémon!
            </p>
          </div>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const thumbnail = product.images && product.images.length > 0
                ? urlForImage(product.images[0])?.url()
                : null;

              const fallbackImage = product.category === "one-piece" ? "/banner1.jpg" : "/banner2.jpg";
              const displayImage = thumbnail || fallbackImage;

              return (
                <div
                  key={product._id}
                  onClick={() => setSelectedProduct(product)}
                  className="group relative bg-[#09090b] border border-slate-800 hover:border-slate-600 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Card Header & Image */}
                  <div className="relative aspect-square w-full bg-slate-900/90 overflow-hidden">
                    <Image
                      src={displayImage}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/90 text-slate-200 border border-slate-700 backdrop-blur-md">
                      {product.category === "one-piece" ? "One Piece" : "Pokémon"}
                    </span>

                    {/* Type Badge */}
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-800/90 text-slate-300 border border-slate-700">
                      {product.type === "card" ? "Thẻ Bài" : product.type === "box" ? "Box" : "Phụ Kiện"}
                    </span>

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-bold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-4 h-4" /> Xem Chi Tiết
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      {product.rarity && (
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Tag className="w-3 h-3 text-slate-400" /> {product.rarity}
                        </div>
                      )}
                      <h3 className="text-base font-bold text-slate-100 group-hover:text-white transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-lg font-extrabold text-emerald-400">
                        {typeof product.price === "number" ? `${product.price.toLocaleString("vi-VN")}đ` : "Liên hệ"}
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        <CheckCircle className="w-3 h-3 text-emerald-400" /> Còn hàng
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
