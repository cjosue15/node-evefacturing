import mongoose, { Document, Schema } from "mongoose";
import { TenantSchema } from "./tenant.model";

export interface CategorySchema extends Document {
  name: string;
  available: boolean;
  tenant: TenantSchema;
  description?: string | null;
  logo?: string | null;
}

const categorySchema = new mongoose.Schema<CategorySchema>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    available: {
      type: Boolean,
      default: true,
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    logo: {
      type: String,
      default: null,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
  },
});

export const CategoryModel = mongoose.model("Category", categorySchema);
