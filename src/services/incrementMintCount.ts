import { Player } from "../models/player";

export const incrementMintCount = async (username: string) => {
  try {
    const player = await Player.findOne({
      username: username,
    });
    player.set({ mintCount: player.mintCount + 1 });

    await player.save();

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
