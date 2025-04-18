import clsx from "clsx";
import {
  meshGradient1,
  meshGradient2,
  meshGradient3,
  meshGradient4,
  meshGradient5,
  meshGradient6,
  meshGradient7,
  meshGradient8,
  meshGradient9,
  color1,
  color2,
  color3,
  color4,
  color5,
  color6,
  color7,
  color8,
  color9,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  crackedPaint1,
  crackedPaint2,
  crackedPaint3,
  concrete1,
  pattern1,
  pattern2,
  pattern3,
  wall1,
  stucko1,
  stucko2,
  paint1,
  desktop1,
  desktop2,
  desktop3,
  desktop4,
  desktop5,
  desktop6,
  desktop7,
  desktop8,
  desktop9,
  desktop10,
  desktop1Thumb,
  desktop2Thumb,
  desktop3Thumb,
  desktop4Thumb,
  desktop5Thumb,
  desktop6Thumb,
  desktop7Thumb,
  desktop8Thumb,
  desktop9Thumb,
  desktop10Thumb,
} from "../images";
import CustomImageFileSelector from "./CustomImageFileSelector";
import SectionHeader from "./SectionHeader";
import { useState } from "react";

const backgroundImages = [
  {
    name: "mesh gradients",
    backgrounds: [
      meshGradient1,
      meshGradient2,
      meshGradient3,
      meshGradient4,
      meshGradient5,
      meshGradient6,
      meshGradient7,
      meshGradient8,
      meshGradient9,
    ],
  },
  {
    name: "solid colors",
    backgrounds: [
      color1,
      color2,
      color3,
      color4,
      color5,
      color6,
      color7,
      color8,
      color9,
    ],
  },
  {
    name: "images",
    backgrounds: [img1, img2, img3, img4, img5, img6],
  },
  {
    name: "desktops",
    backgrounds: [
      desktop1,
      desktop2,
      desktop3,
      desktop4,
      desktop5,
      desktop6,
      desktop7,
      desktop8,
      desktop9,
      desktop10,
    ],
    thumbnails: [
      desktop1Thumb,
      desktop2Thumb,
      desktop3Thumb,
      desktop4Thumb,
      desktop5Thumb,
      desktop6Thumb,
      desktop7Thumb,
      desktop8Thumb,
      desktop9Thumb,
      desktop10Thumb,
    ],
  },
  {
    name: "creative",
    backgrounds: [
      crackedPaint1,
      crackedPaint2,
      crackedPaint3,
      concrete1,
      pattern1,
      pattern2,
      pattern3,
      wall1,
      stucko1,
      stucko2,
      paint1,
    ],
  },
];
const BackgroundImageCell = ({
  url,
  onClick,
  thumbnailUrl,
}: {
  url: string;
  onClick: () => void;
  thumbnailUrl?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-24 h-16 max-w-24 max-h-16">
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-600 animate-pulse rounded-md " />
      )}
      <img
        src={thumbnailUrl || url}
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

interface SidebarBackgroundImageSelectorProps {
  backgroundImageUrl: string;
  setBackgroundImageUrl: (url: string) => void;
}

function SidebarBackgroundImageSelector({
  backgroundImageUrl,
  setBackgroundImageUrl,
}: SidebarBackgroundImageSelectorProps) {
  const [selectedBackgroundCategory, setSelectedBackgroundCategory] =
    useState<string>(backgroundImages[0].name);

  return (
    <>
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
              ?.thumbnails?.map((thumbnailUrl, index) => {
                const fullImageUrl = backgroundImages.find(
                  ({ name }) => name === selectedBackgroundCategory
                )?.backgrounds[index];
                return (
                  <BackgroundImageCell
                    key={thumbnailUrl}
                    url={fullImageUrl}
                    thumbnailUrl={thumbnailUrl}
                    onClick={() => setBackgroundImageUrl(fullImageUrl)}
                  />
                );
              }) ??
              backgroundImages
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
    </>
  );
}

export default SidebarBackgroundImageSelector;
