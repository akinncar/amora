import mongoose, { Document, Model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const StoreSchema = new Schema(
  {
    name: {
      type: String,
      required: 'name is required',
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
    collection: 'Store',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export interface IStore extends Document {
  readonly name: string;
  readonly description: string;
  readonly pictureUrl: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

const StoreModel: Model<IStore> = mongoose.model('Store', StoreSchema);

export default StoreModel;
