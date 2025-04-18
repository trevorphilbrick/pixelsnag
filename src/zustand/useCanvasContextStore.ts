import { create } from "zustand";

type State = {
  ctx: CanvasRenderingContext2D | null;
};

type Action = {
  setCtx: (ctx: CanvasRenderingContext2D) => void;
};

export const useCanvasContextStore = create<State & Action>((set) => ({
  ctx: null,
  setCtx: (ctx: CanvasRenderingContext2D) => set(() => ({ ctx })),
}));
