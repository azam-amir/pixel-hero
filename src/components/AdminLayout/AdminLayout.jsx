import { memo } from "react";
import HUD from "../HUD/HUD";
import Player from "../Player/Player";
import Coin from "../Coin/Coin";
import { useGameStore } from "../../stores/useGameStore";
import GameLoop from "../Gameloop/Gameloop";

const GameLayout = memo(() => {
  const { coins, playerX } = useGameStore();

  return (
    <div className="relative w-[800px] h-[500px] !mx-[10px] border-4 border-black overflow-hidden rounded-xl shadow-lg">
      {/* Static background */}
      <div className="absolute inset-0 bg-blue-300">
        {/* Ground */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-green-600" />
      </div>

      <HUD />
      <GameLoop />

      {/* Player */}
      <Player />

      {/* Coins */}
      {coins.map((coin) => (
        <Coin key={coin.id} x={coin.x} />
      ))}

      <Controls />
    </div>
  );
});

const Controls = memo(() => {
  const { movePlayer, jump } = useGameStore();

  const handleMove = (direction) => {
    const moveAmount = 10;
    const { playerX } = useGameStore.getState();

    if (direction === "left") {
      movePlayer(playerX - moveAmount);
    } else if (direction === "right") {
      movePlayer(playerX + moveAmount);
    }
  };

  return (
    <div className="absolute bottom-28 right-4 flex flex-col items-center gap-4">
      <button
        onClick={jump}
        className="w-14 h-14 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 flex justify-center items-center text-2xl select-none cursor-pointer"
      >
        ⬆️
      </button>
      <div className="flex gap-4">
        <button
          onClick={() => handleMove("left")}
          className="w-14 h-14 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 flex justify-center items-center text-2xl select-none cursor-pointer"
        >
          ⬅️
        </button>
        <button
          onClick={() => handleMove("right")}
          className="w-14 h-14 bg-gray-300 rounded-full shadow-md hover:bg-gray-400 flex justify-center items-center text-2xl select-none cursor-pointer"
        >
          ➡️
        </button>
      </div>
    </div>
  );
});

export default GameLayout;
