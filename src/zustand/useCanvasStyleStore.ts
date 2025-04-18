import { create } from "zustand";

export const initialCanvasStyleState: Omit<
  CanvasStyleState,
  | "setCanvasPadding"
  | "setInnerPadding"
  | "setBorderRadius"
  | "setPaddingColor"
  | "setShadowColor"
  | "setShadowBlur"
  | "setShadowOffsetY"
  | "setBrightness"
  | "setContrast"
  | "setOpacity"
  | "setBlur"
  | "resetSizingState"
  | "resetImageAdjustmentState"
  | "resetShadowState"
> = {
  canvasPadding: 48,
  innerPadding: 16,
  borderRadius: 12,
  paddingColor: null,
  shadowColor: "rgba(0, 0, 0, 0.4)",
  shadowBlur: 20,
  shadowOffsetY: 8,
  brightness: 100,
  contrast: 100,
  opacity: 100,
  blur: 0,
};

interface CanvasStyleState {
  canvasPadding: number;
  innerPadding: number;
  borderRadius: number;
  paddingColor: string | null;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetY: number;
  brightness: number;
  contrast: number;
  opacity: number;
  blur: number;
  setCanvasPadding: (padding: number) => void;
  setInnerPadding: (padding: number) => void;
  setBorderRadius: (radius: number) => void;
  setPaddingColor: (color: string | null) => void;
  setShadowColor: (color: string) => void;
  setShadowBlur: (blur: number) => void;
  setShadowOffsetY: (offset: number) => void;
  setBrightness: (brightness: number) => void;
  setContrast: (contrast: number) => void;
  setOpacity: (opacity: number) => void;
  setBlur: (blur: number) => void;
  resetSizingState: () => void;
  resetImageAdjustmentState: () => void;
  resetShadowState: () => void;
}

export const useCanvasStyleStore = create<CanvasStyleState>((set) => ({
  ...initialCanvasStyleState,
  setCanvasPadding: (padding) => set({ canvasPadding: padding }),
  setInnerPadding: (padding) => set({ innerPadding: padding }),
  setBorderRadius: (radius) => set({ borderRadius: radius }),
  setPaddingColor: (color) => set({ paddingColor: color }),
  setShadowColor: (color) => set({ shadowColor: color }),
  setShadowBlur: (blur) => set({ shadowBlur: blur }),
  setShadowOffsetY: (offset) => set({ shadowOffsetY: offset }),
  setBrightness: (brightness) => set({ brightness: brightness }),
  setContrast: (contrast) => set({ contrast: contrast }),
  setOpacity: (opacity) => set({ opacity: opacity }),
  setBlur: (blur) => set({ blur: blur }),
  resetSizingState: () =>
    set({
      canvasPadding: initialCanvasStyleState.canvasPadding,
      innerPadding: initialCanvasStyleState.innerPadding,
      paddingColor: initialCanvasStyleState.paddingColor,
      borderRadius: initialCanvasStyleState.borderRadius,
    }),
  resetImageAdjustmentState: () =>
    set({
      brightness: initialCanvasStyleState.brightness,
      contrast: initialCanvasStyleState.contrast,
      opacity: initialCanvasStyleState.opacity,
      blur: initialCanvasStyleState.blur,
    }),
  resetShadowState: () =>
    set({
      shadowColor: initialCanvasStyleState.shadowColor,
      shadowBlur: initialCanvasStyleState.shadowBlur,
      shadowOffsetY: initialCanvasStyleState.shadowOffsetY,
    }),
}));
