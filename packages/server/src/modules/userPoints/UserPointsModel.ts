import mongoose, { Document, Model } from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const UserPointsSchema = new Schema(
  {
    points: {
      type: Number,
      required: false,
    },
    storeId: {
      type: ObjectId,
      ref: 'Store',
      required: false,
    },
    userId: {
      type: ObjectId,
      ref: 'User',
      required: false,
    },
  },
  {
    collection: 'UserPoints',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export interface IUserPoints extends Document {
  readonly points: number;
  readonly storeId: string;
  readonly userId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

const UserPointsModel: Model<IUserPoints> = mongoose.model('UserPoints', UserPointsSchema);

export default UserPointsModel;
