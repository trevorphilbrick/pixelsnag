import React, { useState } from "react";
import Canvas from "../components/Canvas";
import Sidebar from "../components/Sidebar";
import clsx from "clsx";
import { placeholder } from "../images";

function Editor() {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [screenshotUrl, setScreenshotUrl] = useState<string>(placeholder);

  return (
    <div
      className={clsx(
        "flex h-screen w-screen overflow-x-hidden bg-neutral-800"
      )}
    >
      <Canvas
        setCtx={setCtx}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setScreenshotUrl={setScreenshotUrl}
      />
      <Sidebar
        ctx={ctx}
        isSidebarOpen={isSidebarOpen}
        screenshotUrl={screenshotUrl}
        setScreenshotUrl={setScreenshotUrl}
      />
    </div>
  );
}

export default Editor;
