import mongoose from "mongoose";

const UserAccessSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
});
