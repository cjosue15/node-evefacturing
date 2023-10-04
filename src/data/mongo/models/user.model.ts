import mongoose, { Document } from "mongoose";

type Role = "admin" | "user";

export interface UserSchema extends Document {
  name: string;
  lastName?: string;
  dni?: string;
  email: string;
  password: string;
  role: Role;
}

const userSchema = new mongoose.Schema<UserSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    dni: {
      type: String,
      required: false,
      minlength: 8,
      maxlength: 8,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id;
    delete ret.password;
  },
});

export const UserModel = mongoose.model("User", userSchema);
