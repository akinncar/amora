import mongoose, { Document, Model } from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const UserStoreSchema = new Schema(
  {
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
    collection: 'UserStore',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export interface IUserStore extends Document {
  readonly storeId: string;
  readonly userId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

const UserStoreModel: Model<IUserStore> = mongoose.model('UserStore', UserStoreSchema);

export default UserStoreModel;
