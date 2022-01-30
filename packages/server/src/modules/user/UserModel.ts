import mongoose, { Document, Model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: 'name is required',
    },
    username: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: 'email is required',
    },
    password: {
      type: String,
      required: 'password is required',
    },
    type: {
      type: String,
      required: 'type is required, can be provider or customer',
    }
  },
  {
    collection: 'User',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export interface IUser extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly type: string; // provider or customer
  readonly authenticate: (plainTextPassword: string) => boolean;
  readonly encryptPassword: (password: string | undefined) => string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

UserSchema.methods = {
  authenticate(plainTextPassword) {
    return bcrypt.compareSync(plainTextPassword, this.password);
  },
  encryptPassword(password) {
    return bcrypt.hashSync(password, 8);
  },
};

const UserModel: Model<IUser> = mongoose.model('User', UserSchema);

export default UserModel;
