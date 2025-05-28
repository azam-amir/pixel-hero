import { create } from "zustand";

export const useGameStore = create((set) => ({
  // Player state
  playerX: 200,
  playerY: 0,
  playerWidth: 48,
  playerHeight: 72,
  isJumping: false,
  lives: 3,
  score: 0,

  // Game world state
  coins: [],
  lastCoinTime: 0,

  // Actions
  movePlayer: (x) => set({ playerX: Math.max(0, Math.min(x, 740)) }),

  jump: async () => {
    if (useGameStore.getState().isJumping) return;
    set({ isJumping: true });
    await new Promise((resolve) => setTimeout(resolve, 400));
    set({ isJumping: false });
  },

  addScore: (points) => set((state) => ({ score: state.score + points })),

  addCoin: () =>
    set((state) => ({
      coins: [
        ...state.coins,
        {
          x: 800 + Math.random() * 400,
          id: Date.now(),
          width: 36,
          height: 36,
        },
      ],
      lastCoinTime: Date.now(),
    })),

  removeCoin: (id) =>
    set((state) => ({
      coins: state.coins.filter((coin) => coin.id !== id),
    })),

  moveCoins: (amount) =>
    set((state) => ({
      coins: state.coins
        .map((coin) => ({
          ...coin,
          x: coin.x - amount,
        }))
        .filter((coin) => coin.x > -50),
    })),

  loseLife: () => set((state) => ({ lives: state.lives - 1 })),

  checkCollisions: () => {
    const state = useGameStore.getState();
    const playerBottom =
      state.playerY + (state.isJumping ? -100 : 0) + state.playerHeight;

    state.coins.forEach((coin) => {
      // Check if player and coin overlap and player is not jumping
      if (
        state.playerX < coin.x + coin.width &&
        state.playerX + state.playerWidth > coin.x &&
        playerBottom > 102 && // Coin's bottom position
        playerBottom - state.playerHeight < 102 + coin.height &&
        !state.isJumping
      ) {
        state.removeCoin(coin.id);
        state.addScore(10);
      }
    });
  },
}));
