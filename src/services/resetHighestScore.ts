import { Player } from "../models/player";

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
