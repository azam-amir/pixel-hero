import { memo } from "react";
import { useGameStore } from "../../stores/useGameStore";

const HUD = () => {
  const { score, lives } = useGameStore();
  return (
    <div className="absolute top-2 left-4 text-white text-xl font-bold flex gap-6">
      <span>🏅 Score: {score}</span>
      <span>❤️ Lives: {lives}</span>
    </div>
  );
};

export default memo(HUD);
