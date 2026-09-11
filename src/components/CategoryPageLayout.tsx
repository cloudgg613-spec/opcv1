"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { Filter, Search, Eye, Tag, CheckCircle, XCircle, Layers, SlidersHorizontal } from "lucide-react";
import { Product, ProductCategory, ProductType } from "@/types/product";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import ProductDetailModal from "./ProductDetailModal";

interface CategoryPageLayoutProps {
  category: ProductCategory;
  title: string;
  subtitle: string;
  bannerImage: string;
}

// Initial Demo Products for Category Fallback
const DEMO_ONE_PIECE_PRODUCTS: Product[] = [
  {
    _id: "op-01",
    name: "Monkey D. Luffy (Parallel SEC) — OP05 Awakening of the New Era",
    slug: { current: "monkey-d-luffy-op05" },
    category: "one-piece",
    type: "card",
    price: 3500000,
    description: "Thẻ bài Monkey D. Luffy phiên bản Secret Parallel Rare cực hiếm thuộc booster pack OP-05. Tình trạng card MINT 10/10, bảo quản khay Acrylic.",
    inStock: true,
    rarity: "SEC Parallel",
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
    _id: "op-04",
    name: "Roronoa Zoro Leader Alt-Art (Parallel) — OP01",
    slug: { current: "roronoa-zoro-leader-op01" },
    category: "one-piece",
    type: "card",
    price: 4200000,
    description: "Thẻ Leader Roronoa Zoro Alt-Art thuộc bộ OP-01 Romance Dawn. Lá bài staple cực mạnh cho deck Đỏ/Xanh Lá.",
    inStock: true,
    rarity: "Leader Alt-Art",
    images: [],
  },
  {
    _id: "op-05",
    name: "Double Pack Set DP-04 Wings of the Captain",
    slug: { current: "double-pack-dp04" },
    category: "one-piece",
    type: "box",
    price: 380000,
    description: "Bộ Double Pack gồm 2 gói bài OP-06 và 1 Don!! Card thiết kế giới hạn.",
    inStock: false,
    rarity: "Pack Set",
    images: [],
  },
  {
    _id: "op-06",
    name: "Album Đựng Thẻ Bài One Piece 9-Pocket Leather Binder",
    slug: { current: "op-album-9pocket" },
    category: "one-piece",
    type: "accessory",
    price: 450000,
    description: "Sổ album da cao cấp 9 ngăn chứa tới 360 thẻ bài, có khóa kéo bảo vệ chống bụi nước tuyệt đối.",
    inStock: true,
    rarity: "Phụ kiện cao cấp",
    images: [],
  },
];

const DEMO_POKEMON_PRODUCTS: Product[] = [
  {
    _id: "pk-01",
    name: "Charizard ex Special Art Rare — 151 Japanese",
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
  {
    _id: "pk-04",
    name: "Mewtwo VSTAR Universe SAR — S12a",
    slug: { current: "mewtwo-vstar-sar" },
    category: "pokemon",
    type: "card",
    price: 1900000,
    description: "Lá bài Mewtwo VSTAR Special Art Rare thuộc bộ High Class Pack VSTAR Universe. Tình trạng Gem Mint 10.",
    inStock: true,
    rarity: "SAR High Class",
    images: [],
  },
  {
    _id: "pk-05",
    name: "Hộp Bảo Quản Thẻ Deck Box Pokémon Pokéball Premium",
    slug: { current: "pokeball-deck-box" },
    category: "pokemon",
    type: "accessory",
    price: 290000,
    description: "Hộp da đựng bộ bài TCG in hình Pokéball từ tính cao cấp, chứa tới 100+ thẻ bài bọc hai lớp.",
    inStock: true,
    rarity: "Deck Box Official",
    images: [],
  },
  {
    _id: "pk-06",
    name: "Booster Box Pokémon Terastal Festival ex (SV8a)",
    slug: { current: "booster-box-sv8a" },
    category: "pokemon",
    type: "box",
    price: 1650000,
    description: "Hộp bài High Class Pack mới nhất của Nhật Bản, nguyên seal 10 pack (10 lá/pack với bảo chứng trúng ex/SAR).",
    inStock: false,
    rarity: "High Class Box",
    images: [],
  },
];

export default function CategoryPageLayout({
  category,
  title,
  subtitle,
  bannerImage,
}: CategoryPageLayoutProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filters State
  const [typeFilter, setTypeFilter] = useState<"all" | ProductType>("all");
  const [stockFilter, setStockFilter] = useState<"all" | "inStock" | "outOfStock">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc">("newest");

  // Fetch Sanity Data
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const query = `*[_type == "product" && category == $category] {
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
      const data: Product[] = await client.fetch(query, { category });

      if (data && data.length > 0) {
        setProducts(data);
      } else {
        // Fallback demo data according to category
        setProducts(category === "one-piece" ? DEMO_ONE_PIECE_PRODUCTS : DEMO_POKEMON_PRODUCTS);
      }
    } catch (err) {
      console.error(`Error fetching ${category} products:`, err);
      setProducts(category === "one-piece" ? DEMO_ONE_PIECE_PRODUCTS : DEMO_POKEMON_PRODUCTS);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filtered and Sorted Products computation
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Type filter
        if (typeFilter !== "all" && product.type !== typeFilter) return false;

        // Stock filter
        if (stockFilter === "inStock" && !product.inStock) return false;
        if (stockFilter === "outOfStock" && product.inStock) return false;

        // Search query filter
        if (searchQuery.trim() !== "") {
          const query = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchRarity = product.rarity?.toLowerCase().includes(query) || false;
          const matchDesc = product.description?.toLowerCase().includes(query) || false;
          return matchName || matchRarity || matchDesc;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return 0; // Default order
      });
  }, [products, typeFilter, stockFilter, searchQuery, sortBy]);

  return (
    <main className="min-h-screen bg-black text-slate-100 pb-20">
      {/* Category Hero Banner */}
      <section className="relative w-full h-[280px] sm:h-[360px] bg-black flex items-center overflow-hidden border-b border-slate-800">
        <Image
          src={bannerImage}
          alt={title}
          fill
          priority
          className="object-cover object-center filter brightness-[0.70] contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Filter & Search Bar Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="p-6 rounded-3xl bg-[#09090b] border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            {/* Filter Title & Counter */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800">
                <Filter className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  Bộ Lọc Sản Phẩm
                </h3>
                <p className="text-xs text-slate-400">
                  Hiển thị <span className="text-slate-200 font-bold">{filteredProducts.length}</span> / {products.length} sản phẩm
                </p>
              </div>
            </div>

            {/* Search Box */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm tên sản phẩm, rarity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-slate-500 transition-all"
              />
            </div>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* 1. Loại sản phẩm (Type Filter) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-400" /> Loại Sản Phẩm:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { value: "all", label: "Tất cả" },
                  { value: "card", label: "Thẻ bài" },
                  { value: "box", label: "Box" },
                  { value: "accessory", label: "Phụ kiện" },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setTypeFilter(item.value as "all" | ProductType)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      typeFilter === item.value
                        ? "bg-slate-800 text-white border border-slate-700 shadow-md"
                        : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Tình trạng hàng (Stock Filter) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Tình Trạng Hàng:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { value: "all", label: "Tất cả" },
                  { value: "inStock", label: "Còn hàng" },
                  { value: "outOfStock", label: "Tạm hết" },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setStockFilter(item.value as "all" | "inStock" | "outOfStock")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      stockFilter === item.value
                        ? "bg-slate-800 text-white border border-slate-700 shadow-md"
                        : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Sắp xếp (Sort Option) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" /> Sắp Xếp Theo:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "newest" | "price-asc" | "price-desc")}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-500 transition-all"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 sm:h-80 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-[#09090b] border border-slate-800 rounded-3xl space-y-4">
            <XCircle className="w-12 h-12 text-slate-500 mx-auto" />
            <h4 className="text-lg font-bold text-slate-200">Không Tìm Thấy Sản Phẩm Phù Hợp</h4>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Thử thay đổi bộ lọc loại sản phẩm, tình trạng hoặc từ khóa tìm kiếm để xem kết quả khác.
            </p>
            <button
              onClick={() => {
                setTypeFilter("all");
                setStockFilter("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
            >
              Đặt Lại Bộ Lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => {
              const thumbnail = product.images && product.images.length > 0
                ? urlForImage(product.images[0])?.url()
                : null;
              const displayImage = thumbnail || bannerImage;

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

                    {/* Category Tag */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-900/90 text-slate-200 border border-slate-700 backdrop-blur-md">
                      {product.category === "one-piece" ? "One Piece" : "Pokémon"}
                    </span>

                    {/* Stock Status Badge */}
                    <span
                      className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border ${
                        product.inStock
                          ? "bg-emerald-500/90 text-slate-950 border-emerald-400"
                          : "bg-rose-500/90 text-white border-rose-400"
                      }`}
                    >
                      {product.inStock ? "Còn hàng" : "Hết hàng"}
                    </span>

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-bold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-4 h-4" /> Xem Chi Tiết Modal
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-slate-400">
                        <span className="uppercase tracking-wider flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {product.type === "card" ? "Thẻ Bài" : product.type === "box" ? "Box" : "Phụ Kiện"}
                        </span>
                        {product.rarity && (
                          <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                            {product.rarity}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-100 group-hover:text-white transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-lg font-extrabold text-emerald-400">
                        {typeof product.price === "number" ? `${product.price.toLocaleString("vi-VN")}đ` : "Liên hệ"}
                      </span>

                      <span className="text-[11px] font-semibold text-slate-400 group-hover:text-white underline transition-colors">
                        Chi tiết →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Product Detail Modal Popup */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
