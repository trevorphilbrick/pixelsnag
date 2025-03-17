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
  crackedPaint1,
  crackedPaint2,
  crackedPaint3,
  concrete1,
  pattern1,
  wall1,
  stucko1,
  stucko2,
} from "../images";
import FileSelector from "./FileSelector";
import SectionHeader from "./SectionHeader";
import RangeSlider from "./RangeSlider";
import CustomImageFileSelector from "./CustomImageFileSelector";
import ColorSelector from "./ColorSelector";

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
  {
    name: "creative",
    backgrounds: [
      crackedPaint1,
      crackedPaint2,
      crackedPaint3,
      concrete1,
      pattern1,
      wall1,
      stucko1,
      stucko2,
    ],
  },
];

const aspectRatios = [
  {
    name: "Default",
    width: 0,
    height: 0,
  },
  {
    name: "Instagram Post (Square)",
    width: 1,
    height: 1,
  },
  {
    name: "Instagram Post (Portrait)",
    width: 4,
    height: 5,
  },
  {
    name: "Instagram Post (Landscape)",
    width: 1.91,
    height: 1,
  },
  {
    name: "Instagram Story & Reels",
    width: 9,
    height: 16,
  },
  {
    name: "Instagram Profile Picture",
    width: 1,
    height: 1,
  },
  {
    name: "Facebook Post (Square)",
    width: 1,
    height: 1,
  },
  {
    name: "Facebook Post (Landscape)",
    width: 1.91,
    height: 1,
  },
  {
    name: "Facebook Story",
    width: 9,
    height: 16,
  },
  {
    name: "Facebook Cover Photo",
    width: 16,
    height: 9,
  },
  {
    name: "Facebook Event Cover Photo",
    width: 16,
    height: 9,
  },
  {
    name: "Facebook Profile Picture",
    width: 1,
    height: 1,
  },
  {
    name: "Twitter (X) Post (Single Image)",
    width: 16,
    height: 9,
  },
  {
    name: "Twitter (X) Header Image",
    width: 3,
    height: 1,
  },
  {
    name: "Twitter (X) Profile Picture",
    width: 1,
    height: 1,
  },
  {
    name: "LinkedIn Post Image",
    width: 1.91,
    height: 1,
  },
  {
    name: "LinkedIn Profile Picture",
    width: 1,
    height: 1,
  },
  {
    name: "LinkedIn Background Banner",
    width: 4,
    height: 1,
  },
  {
    name: "LinkedIn Company Page Cover",
    width: 1.91,
    height: 1,
  },
  {
    name: "YouTube Thumbnail",
    width: 16,
    height: 9,
  },
  {
    name: "YouTube Channel Banner",
    width: 16,
    height: 9,
  },
  {
    name: "TikTok Post (Video & Images)",
    width: 9,
    height: 16,
  },
  {
    name: "TikTok Profile Picture",
    width: 1,
    height: 1,
  },
];

const BackgroundImageCell = ({
  url,
  onClick,
}: {
  url: string;
  onClick: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-24 h-16 max-w-24 max-h-16">
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-600 animate-pulse rounded-md " />
      )}
      <img
        src={url}
        alt="background image"
        width={96}
        height={64}
        loading="lazy"
        fetchPriority="high"
        onLoad={() => setIsLoading(false)}
        className={`rounded-md cursor-pointer w-full h-full object-cover hover:scale-105 transition-all duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onClick={onClick}
      />
    </div>
  );
};

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
  const [selectedBackgroundCategory, setSelectedBackgroundCategory] =
    useState<string>(backgroundImages[0].name);
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

      // Draw the background image with cover fill type
      ctx.drawImage(backgroundImage, offsetX, offsetY, drawWidth, drawHeight);

      // Calculate centered position for the image with padding
      const x = (ctx.canvas.width - (image.width + innerPadding * 2)) / 2;
      const y = (ctx.canvas.height - (image.height + innerPadding * 2)) / 2;
      const width = image.width + innerPadding * 2;
      const height = image.height + innerPadding * 2;

      // Add drop shadow
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = shadowBlur;
      ctx.shadowOffsetY = shadowOffsetY;

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
          <label htmlFor="paddingColor" className="text-sm text-neutral-300">
            padding color
          </label>
          <div className="flex flex-col gap-2 mb-4 shrink-0">
            <h3
              className={clsx(
                "text-sm font-bold text-neutral-300 px-4 py-2 rounded-md cursor-pointer",
                paddingColor === null ? "bg-blue-600 " : "bg-neutral-800"
              )}
              onClick={() => setPaddingColor(null)}
            >
              none
            </h3>
          </div>
          <ColorSelector setColor={setPaddingColor} value={paddingColor} />
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
          <label
            htmlFor="borderRadius"
            className="text-sm text-neutral-300 mb-2"
          >
            aspect ratio
          </label>
          <div className="flex gap-2  shrink-0 overflow-x-scroll scrollbar-hidden">
            {aspectRatios.map(({ name, width, height }) => (
              <div key={name} className="flex flex-col gap-2 mb-4 shrink-0">
                <h3
                  className={clsx(
                    "text-sm font-bold text-neutral-300 px-4 py-2 rounded-md cursor-pointer",
                    selectedAspectRatio?.name === name
                      ? "bg-blue-600 "
                      : "bg-neutral-800"
                  )}
                  onClick={() =>
                    setSelectedAspectRatio({ name, height, width })
                  }
                >
                  {name}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <SectionHeader title="Shadow" />
        <div className="flex flex-col gap-2 bg-neutral-800 p-4 rounded-md shadow-md">
          <label htmlFor="shadowColor" className="text-sm text-neutral-300">
            color
          </label>

          <ColorSelector setColor={setShadowColor} value={shadowColor} />
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
        <div className="flex flex-col gap-2 bg-neutral-800 p-4 rounded-md shadow-md  ">
          <div className="">
            <div className="flex gap-2 overflow-x-scroll scrollbar-hidden mb-4">
              {backgroundImages.map(({ name }) => (
                <div key={name} className="flex flex-col gap-2 mb-4 shrink-0">
                  <h3
                    className={clsx(
                      "text-sm font-bold text-neutral-300 px-4 py-2 rounded-md cursor-pointer",
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
              <div className="flex flex-col gap-2 mb-4 shrink-0">
                <h3
                  className={clsx(
                    "text-sm font-bold text-neutral-300 px-4 py-2 rounded-md cursor-pointer",
                    selectedBackgroundCategory === "custom"
                      ? "bg-blue-600 "
                      : "bg-neutral-800"
                  )}
                  onClick={() => setSelectedBackgroundCategory("custom")}
                >
                  custom
                </h3>
              </div>
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
              {selectedBackgroundCategory === "custom" && (
                <CustomImageFileSelector setImageUrl={setBackgroundImageUrl} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
