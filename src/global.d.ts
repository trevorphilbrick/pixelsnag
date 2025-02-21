export {};

declare global {
  interface Window {
    electron: {
      captureScreen: () => Promise<string | null>;
      getSources: () => Promise<any[]>;
      captureSource: (sourceId: string) => Promise<string | null>;
    };
  }
}
