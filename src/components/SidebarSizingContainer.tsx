import ColorSelector from "./ColorSelector";
import RangeSlider from "./RangeSlider";
import SectionHeader from "./SectionHeader";
import clsx from "clsx";

interface AspectRatio {
  name: string;
  width: number;
  height: number;
}

interface SidebarSizingContainerProps {
  canvasPadding: number;
  setCanvasPadding: (value: number) => void;
  innerPadding: number;
  setInnerPadding: (value: number) => void;
  paddingColor: string | null;
  setPaddingColor: (value: string | null) => void;
  borderRadius: number;
  setBorderRadius: (value: number) => void;
  selectedAspectRatio: AspectRatio | null;
  setSelectedAspectRatio: (value: AspectRatio) => void;
}

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

function SidebarSizingContainer({
  canvasPadding,
  setCanvasPadding,
  innerPadding,
  setInnerPadding,
  paddingColor,
  setPaddingColor,
  borderRadius,
  setBorderRadius,
  selectedAspectRatio,
  setSelectedAspectRatio,
}: SidebarSizingContainerProps) {
  return (
    <>
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
        <label htmlFor="borderRadius" className="text-sm text-neutral-300 mb-2">
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
                onClick={() => setSelectedAspectRatio({ name, height, width })}
              >
                {name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SidebarSizingContainer;
