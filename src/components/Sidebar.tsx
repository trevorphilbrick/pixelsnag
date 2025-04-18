import { useEffect, useState } from "react";
import clsx from "clsx";
import { meshGradient1 } from "../images";

import SidebarImageSelector from "./SidebarImageSelector";
import SidebarSizingContainer from "./SidebarSizingContainer";
import SidebarShadowSelector from "./SidebarShadowSelector";
import SidebarBackgroundImageSelector from "./SidebarBackgroundImageSelector";
import SectionHeader from "./SectionHeader";
import CustomRangeSlider from "./RangeSlider";

function Sidebar({
  ctx,
  isSidebarOpen,
  screenshotUrl,
  setScreenshotUrl,
  setAiDescription,
  setIsAiDescriptionOpen,
}: {
  ctx: CanvasRenderingContext2D | null;
  isSidebarOpen: boolean;
  screenshotUrl: string;
  setScreenshotUrl: (url: string) => void;
  setAiDescription: (description: string) => void;
  setIsAiDescriptionOpen: (open: boolean) => void;
}) {
  const [backgroundImageUrl, setBackgroundImageUrl] =
    useState<string>(meshGradient1);

  const [selectedAspectRatio, setSelectedAspectRatio] = useState<{
    height: number;
    width: number;
    name: string;
  } | null>({ name: "Default", height: 0, width: 0 });
  const [canvasPadding, setCanvasPadding] = useState<number>(48);
  const [innerPadding, setInnerPadding] = useState<number>(16);
  const [borderRadius, setBorderRadius] = useState<number>(12);
  const [paddingColor, setPaddingColor] = useState<string | null>(null);
  const [shadowColor, setShadowColor] = useState<string>("rgba(0, 0, 0, 0.4)");
  const [shadowBlur, setShadowBlur] = useState<number>(20);
  const [shadowOffsetY, setShadowOffsetY] = useState<number>(8);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [opacity, setOpacity] = useState(100);
  const [blur, setBlur] = useState(0);

  // handle screenshot loading
  useEffect(() => {
    if (!ctx) return;
    const image = new Image();
    const backgroundImage = new Image();

    image.src = screenshotUrl;
    backgroundImage.src = backgroundImageUrl;

    Promise.all([
      new Promise((resolve) => (image.onload = resolve)),
      new Promise((resolve) => (backgroundImage.onload = resolve)),
    ]).then(() => {
      // Update canvas size to account for both padding values
      const totalPadding = canvasPadding + innerPadding * 2;
      let canvasWidth = image.width + totalPadding;
      let canvasHeight = image.height + totalPadding;

      // Adjust canvas size based on selected aspect ratio
      if (selectedAspectRatio && selectedAspectRatio.name !== "Default") {
        const { width: aspectWidth, height: aspectHeight } =
          selectedAspectRatio;
        const currentAspectRatio = image.width / image.height;
        const targetAspectRatio = aspectWidth / aspectHeight;

        if (currentAspectRatio > targetAspectRatio) {
          canvasHeight = canvasWidth / targetAspectRatio;
        } else {
          canvasWidth = canvasHeight * targetAspectRatio;
        }
      }

      ctx.canvas.width = canvasWidth;
      ctx.canvas.height = canvasHeight;

      // Create a temporary canvas to analyze the image
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      tempCanvas.width = image.width;
      tempCanvas.height = image.height;
      tempCtx.drawImage(image, 0, 0);

      // Get image data to analyze colors
      const imageData = tempCtx.getImageData(
        0,
        0,
        image.width,
        image.height
      ).data;
      const colorCounts: { [key: string]: number } = {};

      // Sample every 4th pixel for performance
      for (let i = 0; i < imageData.length; i += 16) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const a = imageData[i + 3];
        if (a === 0) continue; // Skip transparent pixels

        const key = `${r},${g},${b}`;
        colorCounts[key] = (colorCounts[key] || 0) + 1;
      }

      // Find the most common color
      let maxCount = 0;
      let primaryColor = "255,255,255";
      for (const [color, count] of Object.entries(colorCounts)) {
        if (count > maxCount) {
          maxCount = count;
          primaryColor = color;
        }
      }

      // Determine the padding color
      const effectivePaddingColor = paddingColor
        ? paddingColor
        : `rgb(${primaryColor})`;

      // Calculate aspect ratio
      const aspectRatio = backgroundImage.width / backgroundImage.height;
      let drawWidth = ctx.canvas.width;
      let drawHeight = ctx.canvas.height;

      // Adjust dimensions to cover the canvas
      if (drawWidth / drawHeight < aspectRatio) {
        drawWidth = drawHeight * aspectRatio;
      } else {
        drawHeight = drawWidth / aspectRatio;
      }

      // Center the image on the canvas
      const offsetX = (ctx.canvas.width - drawWidth) / 2;
      const offsetY = (ctx.canvas.height - drawHeight) / 2;

      // Apply blur only to the background image
      ctx.filter = `blur(${blur / 10}px)`;
      // Draw the background image with cover fill type
      ctx.drawImage(backgroundImage, offsetX, offsetY, drawWidth, drawHeight);

      // Reset filter before drawing inner content
      ctx.filter = "none";

      // Calculate centered position for the image with padding
      const x = (ctx.canvas.width - (image.width + innerPadding * 2)) / 2;
      const y = (ctx.canvas.height - (image.height + innerPadding * 2)) / 2;
      const width = image.width + innerPadding * 2;
      const height = image.height + innerPadding * 2;

      // Add drop shadow
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = shadowBlur;
      ctx.shadowOffsetY = shadowOffsetY;

      // Apply other filters to both padding and image
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) opacity(${opacity}%)`;

      // Draw background fill with padding using effective padding color
      ctx.beginPath();
      ctx.moveTo(x + borderRadius, y);
      ctx.lineTo(x + width - borderRadius, y);
      ctx.arcTo(x + width, y, x + width, y + borderRadius, borderRadius);
      ctx.lineTo(x + width, y + height - borderRadius);
      ctx.arcTo(
        x + width,
        y + height,
        x + width - borderRadius,
        y + height,
        borderRadius
      );
      ctx.lineTo(x + borderRadius, y + height);
      ctx.arcTo(x, y + height, x, y + height - borderRadius, borderRadius);
      ctx.lineTo(x, y + borderRadius);
      ctx.arcTo(x, y, x + borderRadius, y, borderRadius);
      ctx.closePath();

      ctx.fillStyle = effectivePaddingColor;
      ctx.fill();

      // Reset shadow settings before drawing the image
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Draw the image directly without clipping
      ctx.drawImage(
        image,
        x + innerPadding, // center the image with innerPadding
        y + innerPadding // center the image with innerPadding
      );

      // Reset the filter after drawing both padding and image
      ctx.filter = "none";

      setAiDescription(null);
      setIsAiDescriptionOpen(false);
    });
  }, [
    ctx,
    screenshotUrl,
    backgroundImageUrl,
    canvasPadding,
    innerPadding,
    borderRadius,
    shadowColor,
    shadowBlur,
    shadowOffsetY,
    selectedAspectRatio,
    paddingColor,
    brightness,
    contrast,
    opacity,
    blur,
  ]);

  return (
    <div
      className={clsx(
        "bg-neutral-900 border-l border-neutral-700 shadow-lg overflow-y-auto custom-scrollbar",
        "transition-transform duration-300 ease-in-out transition-all",
        isSidebarOpen ? "translate-x-0 w-96 min-w-96" : "translate-x-full w-0"
      )}
    >
      <div className="flex flex-col gap-4 p-4">
        <SidebarImageSelector setScreenshotUrl={setScreenshotUrl} />
        <SidebarSizingContainer
          canvasPadding={canvasPadding}
          setCanvasPadding={setCanvasPadding}
          innerPadding={innerPadding}
          setInnerPadding={setInnerPadding}
          paddingColor={paddingColor}
          setPaddingColor={setPaddingColor}
          borderRadius={borderRadius}
          setBorderRadius={setBorderRadius}
          selectedAspectRatio={selectedAspectRatio}
          setSelectedAspectRatio={setSelectedAspectRatio}
        />
        <SectionHeader title="Image Adjustment" />
        <div className="flex flex-col gap-2 bg-neutral-800 p-4 rounded-md shadow-md">
          <label htmlFor="brightness" className="text-sm text-neutral-300">
            brightness
          </label>
          <CustomRangeSlider
            min={0}
            max={200}
            step={1}
            defaultValue={100}
            onChange={setBrightness}
          />
          <label htmlFor="contrast" className="text-sm text-neutral-300">
            contrast
          </label>
          <CustomRangeSlider
            min={0}
            max={200}
            step={1}
            defaultValue={100}
            onChange={setContrast}
          />
          <label htmlFor="opacity" className="text-sm text-neutral-300">
            opacity
          </label>
          <CustomRangeSlider
            min={0}
            max={100}
            step={1}
            defaultValue={100}
            onChange={setOpacity}
          />
          <label htmlFor="blur" className="text-sm text-neutral-300">
            background blur
          </label>
          <CustomRangeSlider
            min={0}
            max={200}
            step={1}
            defaultValue={0}
            onChange={setBlur}
          />
        </div>
        <SidebarShadowSelector
          shadowColor={shadowColor}
          setShadowColor={setShadowColor}
          shadowBlur={shadowBlur}
          setShadowBlur={setShadowBlur}
          shadowOffsetY={shadowOffsetY}
          setShadowOffsetY={setShadowOffsetY}
        />
        <SidebarBackgroundImageSelector
          backgroundImageUrl={backgroundImageUrl}
          setBackgroundImageUrl={setBackgroundImageUrl}
        />
      </div>
    </div>
  );
}

export default Sidebar;
