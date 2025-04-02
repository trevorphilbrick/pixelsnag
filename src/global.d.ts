export {};

declare global {
  interface Window {
    screenshot: {
      captureScreenRegion: () => Promise<string | null>;
      captureMonitor: (monitorNumber: number) => Promise<string | null>;
    };
    electron: {
      captureScreen: () => Promise<string | null>;
      getSources: () => Promise<any[]>;
      onScreenshotShortcut: (callback: () => void) => () => void;
      copyToClipboard: (dataUrl: string) => Promise<boolean>;
      focusWindow: () => Promise<void>;
      getOs: () => string;
      getEnv: (key: string) => Promise<string>;
      minimizeWindow: () => Promise<void>;
      copyTextToClipboard: (text: string) => Promise<boolean>;
    };
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}
