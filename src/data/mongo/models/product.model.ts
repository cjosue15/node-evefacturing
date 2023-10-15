import mongoose, { PaginateModel, Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { CategorySchema } from './category.model';
import { TagSchema } from './tag.model';
import { TenantSchema } from './tenant.model';

export interface ProductSchema extends Document {
  name: string;
  sku: string;
  price: number;
  discountedPrice: number;
  active: boolean;
  inStock: boolean;
  // fileImage: string;
  stock: number;
  tenant: TenantSchema;
  category: CategorySchema;
  tag: TagSchema;
  status: 'PUBLISHED' | 'DRAFT' | 'INACTIVE';
  description?: string;
}

const productSchema = new Schema<ProductSchema>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    sku: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    discountedPrice: {
      type: Number,
      // required: [true, 'Discounted Price is required'],
    },
    active: {
      type: Boolean,
      default: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['PUBLISHED', 'DRAFT', 'INACTIVE'],
      default: 'PUBLISHED',
    },
    // fileImage: {
    //   type: String,
    //   required: [true, 'Image is required'],
    // },
    stock: {
      type: Number,
      default: 0,
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    tag: {
      type: Schema.Types.ObjectId,
      ref: 'Tag',
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
  },
});

productSchema.plugin(paginate);

export const ProductModel = model<ProductSchema, PaginateModel<ProductSchema>>('Product', productSchema);
