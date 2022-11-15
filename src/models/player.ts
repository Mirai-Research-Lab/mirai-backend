import mongoose from "mongoose";
import bcrypt from "bcrypt";
interface PlayerAttrs {
  email: string;
  address?: string[];
  username: string;
  password: string;
  total_score: number;
  highest_score: number;
  funding_address?: string;
  image?: string;
}

interface PlayerModel extends mongoose.Model<PlayerDoc> {
  build(attrs: PlayerAttrs): PlayerDoc;
}

export interface PlayerDoc extends mongoose.Document {
  email: string;
  address?: string[];
  username: string;
  password: string;
  total_score: number;
  highest_score: number;
  funding_address?: string;
  image?: string;
}

const PlayerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true,
    },
    address: [
      {
        type: String,
        required: false,
        unique: false,
        default: "0x000000000000dEaD",
      },
    ],
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    total_score: {
      type: Number,
      default: 0,
    },
    highest_score: {
      type: Number,
      default: 0,
    },
    funding_address: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/03/39/45/96/360_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg",
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
    timestamps: true,
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
