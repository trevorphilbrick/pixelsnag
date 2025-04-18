import { create } from "zustand";
import { placeholder, meshGradient1 } from "../images";

type State = {
  screenshotUrl: string | null;
  backgroundImageUrl: string;
};

type Action = {
  setScreenshotUrl: (url: string) => void;
  setBackgroundImageUrl: (url: string) => void;
};

export const useScreenshotStore = create<State & Action>((set) => ({
  screenshotUrl: placeholder,
  backgroundImageUrl: meshGradient1,
  setScreenshotUrl: (url) => set(() => ({ screenshotUrl: url })),
  setBackgroundImageUrl: (url) =>
    set(() => ({
      backgroundImageUrl: url,
    })),
}));
