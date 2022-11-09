import mongoose from "mongoose";
import bcrypt from "bcrypt";
interface PlayerAttrs {
  email: string;
  address?: string;
  username: string;
  password: string;
  nfts?: string[]; // array of nft ipfs links
  total_score: number;
  highest_score: number;
  rank?: number;
}

interface PlayerModel extends mongoose.Model<PlayerDoc> {
  build(attrs: PlayerAttrs): PlayerDoc;
}

export interface PlayerDoc extends mongoose.Document {
  email: string;
  address?: string;
  username: string;
  password: string;
  nfts?: string[];
  rank?: number;
  total_score: number;
  highest_score: number;
}

const PlayerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true,
    },
    address: [{
      type: String,
      required: false,
      unique: false,
      default: "0x000000000000DeAd",
    }],
    username: {
      type: String,
      required: true,
      unique: true,
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
    total_score: {
      type: Number,
      default: 0,
    },
    highest_score: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: -1,
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

PlayerSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await bcrypt.hash(this.get("password"), 10);
    this.set("password", hashed);
  }
  done();
});

PlayerSchema.statics.build = (attrs: PlayerAttrs) => {
  return new Player(attrs);
};

const Player = mongoose.model<PlayerDoc, PlayerModel>("Player", PlayerSchema);

export { Player };
