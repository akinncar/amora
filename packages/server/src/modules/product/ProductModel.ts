import mongoose, { Document, Model } from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
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
    points: {
      type: Number,
      required: false,
    },
    storeId: {
      type: ObjectId,
      required: false,
    },
  },
  {
    collection: 'Product',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export interface IProduct extends Document {
  readonly name: string;
  readonly description: string;
  readonly pictureUrl: string;
  readonly points: number;
  readonly storeId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

const ProductModel: Model<IProduct> = mongoose.model('Product', ProductSchema);

export default ProductModel;
