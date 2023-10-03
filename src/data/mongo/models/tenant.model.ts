import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    tenant: {
      type: String,
    },
    logo: {
      type: String,
      nullable: true,
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
