import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  openAIKey: string | null;
};

type Action = {
  setOpenAIKey: (key: string | null) => void;
};

export const useSettingsState = create<State & Action>()(
  persist(
    (set) => ({
      openAIKey: null,
      setOpenAIKey: (key: string) => set(() => ({ openAIKey: key })),
    }),
    { name: "settings-storage" }
  )
);
