import mongoose from "mongoose";
interface walletAttrs {
  email: string;
  address: string;
}

interface walletaddressModel extends mongoose.Model<walletaddressDoc> {
  build(attrs: walletAttrs): walletaddressDoc;
}

export interface walletaddressDoc extends mongoose.Document {
  email: string;
  address?: string[];
  username: string;
  password: string;
  nfts?: string[];
  rank?: number;
  total_score: number;
  highest_score: number;
}

const WalletaddressSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      unique: true,
      default: "0x000000000000dEaD",
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
WalletaddressSchema.statics.build = (attrs: walletAttrs) => {
  return new Wallet(attrs);
};

const Wallet = mongoose.model<walletaddressDoc, walletaddressModel>(
  "WalletAddress",
  WalletaddressSchema
);

export { Wallet };
