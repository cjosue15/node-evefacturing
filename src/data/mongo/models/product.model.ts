import { CategorySchema } from "./category.model";
import { TagSchema } from "./tag.model";

export interface ProductSchema extends Document {
  title: string;
  sku: string;
  price: number;
  discountedPrice: number;
  active: boolean;
  inStock: boolean;
  // fileImage: string;
  stock: number;
  category: CategorySchema;
  tag: TagSchema;
  description?: string;
}
