import ColorSelector from "./ColorSelector";
import RangeSlider from "./RangeSlider";
import SectionHeader from "./SectionHeader";
import { useCanvasStyleStore } from "../zustand/useCanvasStyleStore";

function SidebarShadowSelector() {
  const {
    shadowColor,
    shadowBlur,
    shadowOffsetY,
    setShadowColor,
    setShadowBlur,
    setShadowOffsetY,
  } = useCanvasStyleStore();

  return (
    <>
      <SectionHeader title="Shadow" />
      <div className="flex flex-col gap-2 bg-neutral-800 p-4 rounded-md shadow-md">
        <label htmlFor="shadowColor" className="text-sm text-neutral-300">
          color
        </label>

        <ColorSelector setColor={setShadowColor} value={shadowColor} />
        <label htmlFor="shadowBlur" className="text-sm text-neutral-300">
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
    </>
  );
}

export default SidebarShadowSelector;
