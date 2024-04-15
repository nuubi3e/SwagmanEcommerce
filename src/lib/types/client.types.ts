export type ProductDetail = {
  name: string;
  price: number;
  sizes: {
    price: number;
    size: string;
    _id: string;
  }[];
  rating: number;
  reviews: Review[];
  description: string;
  categoryId: string;
  images: string[];
  ingredients: Ingredient[];
  units: number;
};

export type Ingredient = { name: string; description: string; _id: string };
export type Review = {
  userId: string;
  review: string;
  rating: number;
  username: string;
  date: string;
  _id: string;
};

export type ProductBrief = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  rating: number;
};

export type Category = {
  _id: string;
  name: string;
};
