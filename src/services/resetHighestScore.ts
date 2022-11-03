import { Player } from "../models/Player";

const resetHighestScore = () => {
  Player.updateMany(
    {},
    {
      $set: {
        highestScore: 0,
      },
    }
  );
};

export { resetHighestScore };
