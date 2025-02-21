import React, { useState } from "react";
import clsx from "clsx";

function SourceSelection({
  showSourceSelection = false,
  onClose,
  selectedSource,
  sources,
  setSelectedSource,
  setScreenshotUrl,
}: {
  showSourceSelection?: boolean;
  onClose: () => void;
  selectedSource: string | null;
  sources: any[];
  setSelectedSource: (sourceId: string) => void;
  setScreenshotUrl: (url: string) => void;
}) {
  if (!showSourceSelection) return null;

  const handleClose = () => {
    onClose();
  };

  const takeScreenshot = async () => {
    if (!selectedSource) {
      console.error("No source selected!");
      return;
    }

    console.log("Capturing full-resolution screenshot...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          // @ts-expect-error - TODO: fix this
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: selectedSource,
            minWidth: 1920,
            minHeight: 1080,
            maxWidth: 3840,
            maxHeight: 2160,
            maxFrameRate: 1,
          },
        },
      });

      const video = document.createElement("video");
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
        setTimeout(() => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Stop stream and get image data
          stream.getTracks().forEach((track) => track.stop());
          const imageData = canvas.toDataURL("image/png");
          setScreenshotUrl(imageData);
        }, 500);
      };
    } catch (error) {
      console.error("Failed to capture screen:", error);
    }
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50",
        "flex items-center justify-center",
        "bg-black/50"
      )}
      onClick={handleClose}
    >
      <div
        className="bg-neutral-900 p-4 rounded-lg shadow-lg relative pb-16"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg mb-6 text-neutral-300 font-semibold">
          Select A Source
        </h3>
        <div className="gap-2 text-neutral-300 max-w-96 max-h-96 overflow-y-auto">
          <h4 className="text-md text-neutral-300 font-semibold mb-3">
            Screens
          </h4>

          <div className="flex flex-wrap gap-4 pb-4">
            {sources
              .filter((source) => source.name.toLowerCase().includes("screen"))
              .map((source) => (
                <div
                  key={source.id}
                  onClick={() => setSelectedSource(source.id)}
                  className={clsx(
                    "cursor-pointer border p-2",
                    selectedSource === source.id
                      ? "border-blue-500"
                      : "border-gray-700"
                  )}
                >
                  <img
                    src={source.thumbnail}
                    alt={source.name}
                    className="w-24 h-16 object-cover"
                  />
                  <p>{source.name}</p>
                </div>
              ))}
          </div>

          <h4 className="text-md text-neutral-300 font-semibold mb-3">
            Windows
          </h4>
          <div className="flex flex-wrap gap-4 pb-4">
            {sources
              .filter((source) => !source.name.toLowerCase().includes("screen"))
              .map((source) => (
                <div
                  key={source.id}
                  onClick={() => setSelectedSource(source.id)}
                  className={clsx(
                    "cursor-pointer border p-2",
                    selectedSource === source.id
                      ? "border-blue-500"
                      : "border-gray-700"
                  )}
                >
                  <img
                    src={source.thumbnail}
                    alt={source.name}
                    className="w-24 h-16 object-cover"
                  />
                  <p className="max-w-24 truncate">{source.name}</p>
                </div>
              ))}
          </div>

          <button
            className="bg-blue-500 p-2 rounded-md absolute bottom-4 left-4"
            onClick={takeScreenshot}
          >
            Take Screenshot
          </button>
        </div>
      </div>
    </div>
  );
}

export default SourceSelection;
