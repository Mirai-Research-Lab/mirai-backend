import mongoose from "mongoose";
import { PlayerDoc } from "./player";

interface NftAttrs {
  address: string;
  tokenId: string;
  imageUrl: string;
  Owner: PlayerDoc;
}

interface NftModel extends mongoose.Model<NftDoc> {
  build(attrs: NftAttrs): NftDoc;
}

interface NftDoc extends mongoose.Document {
  address: string;
  tokenId: string;
  imageUrl: string;
  Owner: PlayerDoc;
}

const NftSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
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

NftSchema.statics.build = (attrs: NftAttrs) => {
  return new Nft(attrs);
};

const Nft = mongoose.model<NftDoc, NftModel>("Nft", NftSchema);

export { Nft };
