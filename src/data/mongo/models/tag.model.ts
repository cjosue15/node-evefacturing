import mongoose, { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { TenantSchema } from './tenant.model';

export interface TagSchema extends Document {
  name: string;
  active: boolean;
  tenant: TenantSchema;
  description?: string;
}

const tagSchema = new Schema<TagSchema>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
    },
    active: {
      type: Boolean,
      default: true,
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
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

tagSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
  },
});

tagSchema.plugin(paginate);

export const TagModel = model<TagSchema, mongoose.PaginateModel<TagSchema>>('Tag', tagSchema);
