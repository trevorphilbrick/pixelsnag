import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { TransformComponent } from "react-zoom-pan-pinch";
import { TransformWrapper } from "react-zoom-pan-pinch";
import SourceSelection from "./SourceSelection";

function Canvas({
  setCtx,
  isSidebarOpen,
  setIsSidebarOpen,
  setScreenshotUrl,
}: {
  setCtx: (ctx: CanvasRenderingContext2D) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  setScreenshotUrl: (url: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [showSourceSelection, setShowSourceSelection] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    const fetchSources = async () => {
      const availableSources = await window.electron.getSources();
      console.log(availableSources);
      setSources(availableSources);
    };

    fetchSources();
  }, []);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    console.log(canvas);
    if (!canvas) return;

    // Create a temporary link element
    const link = document.createElement("a");
    link.download = "canvas-image.png";
    link.href = canvas.toDataURL("image/png");

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyToClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, "image/png");
      });

      // Create ClipboardItem and write to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);
    } catch (err) {
      console.error("Failed to copy image to clipboard:", err);
    }
  };

  const handleSnippingCapture = async () => {
    setIsCapturing(true);
    try {
      const imageUrl = await window.screenshot.captureScreenRegion();
      if (imageUrl) {
        setScreenshot(imageUrl);
        setScreenshotUrl(imageUrl);
      }
    } catch (error) {
      console.error("Failed to capture screenshot:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      setCtx(ctx);
    }
  }, [setCtx]);

  useEffect(() => {
    console.log(screenshot);
  }, [screenshot]);

  return (
    <>
      <SourceSelection
        showSourceSelection={showSourceSelection}
        onClose={() => setShowSourceSelection(false)}
        sources={sources}
        setScreenshot={setScreenshot}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
        setScreenshotUrl={setScreenshotUrl}
      />
      <div
        className={clsx(
          "flex-1 bg-neutral-800 flex flex-col items-center justify-center overflow-hidden relative ",
          isSidebarOpen ? "w-full" : "w-screen"
        )}
      >
        <div className="py-2 px-4 w-full flex justify-end gap-2 items-center">
          <button
            onClick={handleSnippingCapture}
            disabled={isCapturing}
            className="p-3 bg-neutral-900 rounded-full flex items-center justify-center shadow-md hover:bg-neutral-700 transition-colors duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-neutral-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664"
              />
            </svg>
          </button>
          <button
            id="screenshot-button"
            onClick={() => setShowSourceSelection(!showSourceSelection)}
            className="p-3 bg-neutral-900 rounded-full flex items-center justify-center shadow-md hover:bg-neutral-700 transition-colors duration-200 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-neutral-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopyToClipboard();
            }}
            className="p-3 bg-neutral-900 rounded-full flex items-center justify-center shadow-md hover:bg-neutral-700 transition-colors duration-200 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-neutral-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            className="p-3 bg-neutral-900 rounded-full flex items-center justify-center shadow-md hover:bg-neutral-700 transition-colors duration-200 active:scale-95"
          >
            {
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-neutral-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                />
              </svg>
            }
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-3 bg-neutral-900 rounded-full flex items-center justify-center shadow-md hover:bg-neutral-700 transition-colors duration-200 active:scale-95"
          >
            {isSidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-neutral-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-neutral-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
        <TransformWrapper minScale={0.1} maxScale={4}>
          <TransformComponent
            wrapperStyle={{
              width: "100%",
              height: "100%",
            }}
          >
            <canvas ref={canvasRef}></canvas>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </>
  );
}

export default Canvas;
