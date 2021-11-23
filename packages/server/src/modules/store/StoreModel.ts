import mongoose, { Document, Model, Types } from "mongoose";
import bcrypt from "bcrypt";

const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const StoreSchema = new Schema(
  {
    name: {
      type: String,
      required: "name is required",
    },
    description: {
      type: String,
      required: false,
    },
    pictureUrl: {
      type: String,
      required: false,
    },
  },
  {
    collection: "Store",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

export interface IStore extends Document {
  name: string;
  description: string;
  pictureUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const StoreModel: Model<IStore> = mongoose.model("Store", StoreSchema);

export default StoreModel;
