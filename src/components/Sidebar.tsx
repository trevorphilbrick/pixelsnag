import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  meshGradient1,
  meshGradient2,
  meshGradient3,
  meshGradient4,
  meshGradient5,
  color1,
  color2,
  color3,
  color4,
  color5,
  img1,
  img2,
  img3,
} from "../images";
import FileSelector from "./FileSelector";
import SectionHeader from "./SectionHeader";
import RangeSlider from "./RangeSlider";
const backgroundImages = [
  {
    name: "mesh gradients",
    backgrounds: [
      meshGradient1,
      meshGradient2,
      meshGradient3,
      meshGradient4,
      meshGradient5,
    ],
  },
  {
    name: "solid colors",
    backgrounds: [color1, color2, color3, color4, color5],
  },
  {
    name: "images",
    backgrounds: [img1, img2, img3],
  },
];

const BackgroundImageCell = ({
  url,
  onClick,
}: {
  url: string;
  onClick: () => void;
}) => {
  return (
    <img
      src={url}
      alt="background image"
      width={96}
      height={64}
      className="rounded-md"
      onClick={onClick}
    />
  );
};

function Sidebar({
  ctx,
  isSidebarOpen,
  screenshotUrl,
  setScreenshotUrl,
}: {
  ctx: CanvasRenderingContext2D | null;
  isSidebarOpen: boolean;
  screenshotUrl: string;
  setScreenshotUrl: (url: string) => void;
}) {
  const [backgroundImageUrl, setBackgroundImageUrl] =
    useState<string>(meshGradient1);
  const [selectedBackgroundCategory, setSelectedBackgroundCategory] =
    useState<string>(backgroundImages[0].name);

  const [canvasPadding, setCanvasPadding] = useState<number>(48);
  const [innerPadding, setInnerPadding] = useState<number>(16);
  const [borderRadius, setBorderRadius] = useState<number>(12);
  const [shadowColor, setShadowColor] = useState<string>("rgba(0, 0, 0, 0.4)");
  const [shadowBlur, setShadowBlur] = useState<number>(20);
  const [shadowOffsetY, setShadowOffsetY] = useState<number>(8);

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
      ctx.canvas.width = image.width + totalPadding;
      ctx.canvas.height = image.height + totalPadding;

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

      // Draw background
      ctx.drawImage(backgroundImage, 0, 0, ctx.canvas.width, ctx.canvas.height);

      const x = canvasPadding / 2;
      const y = canvasPadding / 2;
      const width = image.width + innerPadding * 2;
      const height = image.height + innerPadding * 2;

      // Add drop shadow
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = shadowBlur;
      ctx.shadowOffsetY = shadowOffsetY;

      // Draw background fill with padding using primary color
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

      // Fill with semi-transparent primary color
      ctx.fillStyle = `rgb(${primaryColor})`;
      ctx.fill();

      // Reset shadow settings before drawing the image
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Draw the image directly without clipping
      ctx.drawImage(
        image,
        canvasPadding / 2 + innerPadding, // add innerPadding to x position
        canvasPadding / 2 + innerPadding // add innerPadding to y position
      );
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
        <SectionHeader title="Select An Image" />
        <FileSelector setScreenshotUrl={setScreenshotUrl} />
        <SectionHeader title="Sizing" />
        <div className="flex flex-col gap-2 bg-neutral-800 p-4 rounded-md shadow-md">
          <label htmlFor="canvasPadding" className="text-sm text-neutral-300">
            background size
          </label>

          <RangeSlider
            min={0}
            max={248}
            defaultValue={canvasPadding}
            step={1}
            onChange={(value) => setCanvasPadding(value)}
          />
          <label htmlFor="padding" className="text-sm text-neutral-300">
            padding
          </label>

          <RangeSlider
            min={0}
            max={248}
            defaultValue={innerPadding}
            step={1}
            onChange={(value) => setInnerPadding(value)}
          />
          <label htmlFor="borderRadius" className="text-sm text-neutral-300">
            border radius
          </label>
          <RangeSlider
            min={0}
            max={64}
            defaultValue={borderRadius}
            step={1}
            onChange={(value) => setBorderRadius(value)}
          />
        </div>
        <SectionHeader title="Shadow" />
        <div className="flex flex-col gap-2 bg-neutral-800 p-4 rounded-md shadow-md">
          <label htmlFor="shadowColor" className="text-sm text-neutral-300">
            color
          </label>
          <input
            type="color"
            value={shadowColor}
            onChange={(e) => setShadowColor(e.target.value)}
            className="w-16 h-16  border-none bg-transparent shadow-md cursor-pointer"
          />
          <label htmlFor="shadowBlur" className="text-sm     text-neutral-300">
            blur
          </label>

          <RangeSlider
            min={0}
            max={64}
            defaultValue={shadowBlur}
            step={1}
            onChange={(value) => setShadowBlur(value)}
          />
          <label htmlFor="shadowOffsetY" className="text-sm text-neutral-300">
            offset
          </label>
          <RangeSlider
            min={0}
            max={64}
            defaultValue={shadowOffsetY}
            step={1}
            onChange={(value) => setShadowOffsetY(value)}
          />
        </div>
        <SectionHeader title="Background image" />
        <div className="flex flex-col gap-2 bg-neutral-800 p-4 rounded-md shadow-md  h-[306px]">
          <div className="">
            <div className="flex gap-2 overflow-x-scroll scrollbar-hidden mb-4">
              {backgroundImages.map(({ name }) => (
                <div key={name} className="flex flex-col gap-2 mb-4 shrink-0">
                  <h3
                    className={clsx(
                      "text-sm font-bold text-neutral-300 px-4 py-2 rounded-md",
                      selectedBackgroundCategory === name
                        ? "bg-blue-600 "
                        : "bg-neutral-800"
                    )}
                    onClick={() => setSelectedBackgroundCategory(name)}
                  >
                    {name}
                  </h3>
                </div>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {backgroundImages
                .find(({ name }) => name === selectedBackgroundCategory)
                ?.backgrounds.map((url) => (
                  <BackgroundImageCell
                    key={url}
                    url={url}
                    onClick={() => setBackgroundImageUrl(url)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
