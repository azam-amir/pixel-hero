import { memo, useEffect } from "react";
import { useGameStore } from "../../stores/useGameStore";

const Coin = ({ x }) => {
  const { playerX, addScore } = useGameStore();

  // Check collision with player
  useEffect(() => {
    const isColliding = Math.abs(playerX - x) < 20; // Rough collision check
    if (isColliding) {
      addScore(10);
      // Remove coin logic here (update store)
    }
  }, [playerX, x]);
  return (
    <div
      className="absolute bottom-36 w-8 h-8 bg-yellow-300 border-2 border-black rounded-full"
      style={{ left: `${x}px` }}
    />
  );
};

export default memo(Coin);
