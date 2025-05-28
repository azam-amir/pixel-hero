import { memo } from "react";

const Coin = memo(({ x }) => {
  return (
    <div
      className="absolute bottom-[102px] w-9 h-9 bg-yellow-300 border-2 border-black rounded-full animate-bounce"
      style={{
        left: `${x}px`,
        width: "36px",
        height: "36px",
      }}
    />
  );
});

export default Coin;
