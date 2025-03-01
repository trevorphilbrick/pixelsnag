// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  getSources: async () => {
    const sources = await ipcRenderer.invoke("get-sources");
    return sources;
  },
  captureSource: (sourceId: string) =>
    ipcRenderer.invoke("capture-source", sourceId),
  onScreenshotShortcut: (callback: () => void) => {
    const listener = () => callback();
    ipcRenderer.on("trigger-screenshot", listener);

    // Return cleanup function
    return () => {
      ipcRenderer.removeListener("trigger-screenshot", listener);
    };
  },
  copyToClipboard: (dataUrl: string) =>
    ipcRenderer.invoke("copy-to-clipboard", dataUrl),
  focusWindow: () => ipcRenderer.invoke("focus-window"),
  getEnv: (key: string) => ipcRenderer.invoke("get-env", key),
  getOs: () => ipcRenderer.invoke("get-os"),
});
