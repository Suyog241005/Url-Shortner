import { model, Schema } from "mongoose";

const urlSchema = new Schema({
  shortUrl: { type: String, required: true },
  longUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
}, { timestamps: true });

export const Url = model("Url", urlSchema);
