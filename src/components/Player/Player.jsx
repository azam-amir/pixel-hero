import { motion } from "framer-motion";
import { memo, useEffect } from "react";
import { useGameStore } from "../../stores/useGameStore";

const Player = () => {
  const { playerX, playerY, isJumping, movePlayer, jump } = useGameStore();

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      const step = 20;
      if (e.key === "ArrowRight") movePlayer(playerX + step);
      else if (e.key === "ArrowLeft") movePlayer(playerX - step);
      else if (e.key === " " || e.key === "ArrowUp") jump();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playerX, movePlayer, jump]);

  return (
    <motion.div
      animate={{
        x: playerX,
        y: isJumping ? -100 : playerY,
      }}
      transition={{ type: "spring", damping: 10 }}
      className="absolute bottom-24 w-12 h-12 bg-yellow-400 border-2 border-black rounded-md"
    />
  );
};

export default memo(Player);
//
