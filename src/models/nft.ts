import mongoose from "mongoose";

interface NftAttrs {
  address: string;
  tokenId: string;
  OwnerAddress: string;
  imageUrl: string;
}

interface NftModel extends mongoose.Model<NftDoc> {
  build(attrs: NftAttrs): NftDoc;
}

interface NftDoc extends mongoose.Document {
    address: string;
    tokenId: string;
    OwnerAddress: string;
    imageUrl: string;
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
    OwnerAddress: [
      {
        type: String,
        required: true,
      },
    ],
    imageUrl: {
      type: String,
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
