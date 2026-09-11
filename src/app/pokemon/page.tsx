import CategoryPageLayout from "@/components/CategoryPageLayout";

export const metadata = {
  title: "Pokémon TCG Collection — OPC Store",
  description: "Trưng bày bộ sưu tập thẻ bài, Elite Trainer Box và phụ kiện Pokémon TCG chính hãng.",
};

export default function PokemonPage() {
  return (
    <CategoryPageLayout
      category="pokemon"
      title="Pokémon TCG Collection"
      subtitle="Khám phá các lá bài Special Art Rare (SAR), Promo giới hạn, Elite Trainer Box và phụ kiện TCG cao cấp cho nhà sưu tầm."
      bannerImage="/banner2.jpg"
    />
  );
}
