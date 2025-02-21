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
});
