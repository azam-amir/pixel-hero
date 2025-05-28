import { useEffect } from "react";
import { useGameStore } from "../../stores/useGameStore";

const GameLoop = () => {
  const { playerX, coins, addCoin, addScore, removeCoin, moveCoins } =
    useGameStore();

  useEffect(() => {
    let animationFrameId;
    const coinSpeed = 3; // How fast coins move left

    const loop = () => {
      // Move all coins left
      moveCoins(coinSpeed);

      // Check for collisions
      coins.forEach((coin) => {
        if (Math.abs(playerX - coin.x) < 30) {
          addScore(10);
          removeCoin(coin.id);
        }
      });

      // Add new coins randomly
      if (Math.random() < 0.01 && coins.length < 5) {
        addCoin();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [playerX, coins, addCoin, addScore, removeCoin, moveCoins]);

  return null;
};

export default GameLoop;
