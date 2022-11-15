import { Player } from "../models/player";

const resetHighestScore = () => {
  Player.find().then((players) => {
    players.forEach((player) => {
      player.highest_score = 0;
      player.save();
    });
  });
};

export { resetHighestScore };
