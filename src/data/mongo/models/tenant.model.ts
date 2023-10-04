import mongoose, { Document } from "mongoose";

export interface TenantSchema extends Document {
  tenant: string;
  logo?: string | null;
}

const tenantSchema = new mongoose.Schema<TenantSchema>(
  {
    tenant: {
      type: String,
      required: true,
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

tenantSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
  },
});

export const TenantModel = mongoose.model("Tenant", tenantSchema);
