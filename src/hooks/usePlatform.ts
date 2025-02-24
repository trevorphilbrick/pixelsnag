export const usePlatform = () => {
  const p = window.electron.getOs();
  const platform = {
    isMac: p === "darwin",
    isWindows: p === "win32",
    isLinux: p === "linux",
  };

  return platform;
};
