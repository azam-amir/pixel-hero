// store.js
import { create } from "zustand";

export const useGameStore = create((set) => ({
  // Player state
  playerX: 50,
  playerY: 0,
  isJumping: false,
  lives: 3,
  score: 0,

  // Coins state
  coins: [{ x: 100 }, { x: 300 }], // Example coins

  // Actions
  movePlayer: (x) => set({ playerX: Math.max(0, Math.min(x, 740)) }),
  jump: async () => {
    set({ isJumping: true });
    await new Promise((resolve) => setTimeout(resolve, 400)); // Simulate jump
    set({ isJumping: false });
  },
  addScore: (points) => set((state) => ({ score: state.score + points })),
  loseLife: () => set((state) => ({ lives: state.lives - 1 })),
}));
