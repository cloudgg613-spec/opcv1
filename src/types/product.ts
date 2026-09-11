export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export type ProductCategory = "one-piece" | "pokemon";
export type ProductType = "card" | "box" | "accessory";

export interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  category: ProductCategory;
  type: ProductType;
  price: number;
  description?: string;
  inStock: boolean;
  rarity?: string;
  images?: SanityImage[];
}
