import CategoryPageLayout from "@/components/CategoryPageLayout";

export const metadata = {
  title: "One Piece Card Game — OPC Store",
  description: "Bộ sưu tập thẻ bài, booster box và phụ kiện One Piece Card Game chính hãng.",
};

export default function OnePiecePage() {
  return (
    <CategoryPageLayout
      category="one-piece"
      title="One Piece Card Game Collection"
      subtitle="Tổng hợp thẻ bài hiếm (Parallel SEC, Alt-Art, Leader), Booster Box nguyên seal và phụ kiện bảo vệ thẻ chính hãng Bandai."
      bannerImage="/banner1.jpg"
    />
  );
}
