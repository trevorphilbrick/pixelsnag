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
    };
  }
}
