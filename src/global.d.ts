export {};

declare global {
  interface Window {
    screenshot: {
      captureScreenRegion: () => Promise<string | null>;
    };
    electron: {
      captureScreen: () => Promise<string | null>;
      getSources: () => Promise<any[]>;
      captureSource: (sourceId: string) => Promise<string | null>;
      onScreenshotShortcut: (callback: () => void) => () => void;
      copyToClipboard: (dataUrl: string) => Promise<boolean>;
      focusWindow: () => Promise<void>;
      getOs: () => string;
      getEnv: (key: string) => Promise<string>;
    };
  }
}
