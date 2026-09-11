import { defineField, defineType } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Sản phẩm",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên sản phẩm",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Danh mục",
      type: "string",
      options: {
        list: [
          { title: "One Piece", value: "one-piece" },
          { title: "Pokémon", value: "pokemon" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Loại sản phẩm",
      type: "string",
      options: {
        list: [
          { title: "Thẻ bài", value: "card" },
          { title: "Box", value: "box" },
          { title: "Phụ kiện", value: "accessory" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Giá (VNĐ)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "description",
      title: "Mô tả sản phẩm",
      type: "text",
    }),
    defineField({
      name: "inStock",
      title: "Còn hàng",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "rarity",
      title: "Độ hiếm (Rarity)",
      type: "string",
      description: "Chủ yếu áp dụng cho thẻ bài (VD: Secret Rare, Parallel SR, R, UC...)",
    }),
    defineField({
      name: "images",
      title: "Bộ sưu tập ảnh",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Ảnh đầu tiên trong mảng là ảnh đại diện/thumbnail",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "images.0",
      price: "price",
    },
    prepare(selection) {
      const { title, subtitle, media, price } = selection;
      const categoryLabel = subtitle === "one-piece" ? "One Piece" : subtitle === "pokemon" ? "Pokémon" : subtitle;
      const formattedPrice = typeof price === "number" ? `${price.toLocaleString("vi-VN")}đ` : "Chưa có giá";
      return {
        title,
        subtitle: `${categoryLabel} — ${formattedPrice}`,
        media,
      };
    },
  },
});
