import mongoose from "mongoose";

interface PlayerAttrs {
  username: string;
  nfts: string[]; // array of nft ipfs links
  score: number;
  rank: number;
}

interface PlayerModel extends mongoose.Model<PlayerDoc> {
  build(attrs: PlayerAttrs): PlayerDoc;
}

interface PlayerDoc extends mongoose.Document {
  username: string;
  nfts: string[];
  score: number;
  rank: number;
}

const PlayerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nfts: [
      {
        type: String,
        required: true,
      },
    ],
    score: {
      type: Number,
      required: true,
    },
    rank: {
      type: Number,
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

PlayerSchema.statics.build = (attrs: PlayerAttrs) => {
  return new Player(attrs);
};

const Player = mongoose.model<PlayerDoc, PlayerModel>("Player", PlayerSchema);

export { Player };
