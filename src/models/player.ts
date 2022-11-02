import mongoose from "mongoose";

interface PlayerAttrs {
  email: string,
  username: string;
  password: string;
  nfts?: string[]; // array of nft ipfs links
  score?: number;
  rank?: number;
}

interface PlayerModel extends mongoose.Model<PlayerDoc> {
  build(attrs: PlayerAttrs): PlayerDoc;
}

export interface PlayerDoc extends mongoose.Document {
  email: string,
  username: string;
  password: string,
  nfts?: string[];
  score?: number;
  rank?: number;
}

const PlayerSchema = new mongoose.Schema(
  {
    email:{
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    nfts: [
      {
        type: String,
      },
    ],
    score: {
      type: Number,
    },
    rank: {
      type: Number,
      default: -1
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
