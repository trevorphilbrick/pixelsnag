import React from "react";
import CustomRangeSlider from "./RangeSlider";
import SectionHeader from "./SectionHeader";
import { useCanvasStyleStore } from "../zustand/useCanvasStyleStore";

function SidebarImageEditingSelector() {
  const {
    brightness,
    blur,
    contrast,
    opacity,
    setBrightness,
    setBlur,
    setContrast,
    setOpacity,
    resetImageAdjustmentState,
  } = useCanvasStyleStore();
  return (
    <>
      <SectionHeader
        title="Image Adjustment"
        leftText="reset"
        leftFunction={resetImageAdjustmentState}
      />
      <div className="flex flex-col gap-2 bg-neutral-800 p-4 rounded-md shadow-md">
        <label htmlFor="brightness" className="text-sm text-neutral-300">
          brightness
        </label>
        <CustomRangeSlider
          min={0}
          max={200}
          step={1}
          defaultValue={brightness}
          onChange={setBrightness}
        />
        <label htmlFor="contrast" className="text-sm text-neutral-300">
          contrast
        </label>
        <CustomRangeSlider
          min={0}
          max={200}
          step={1}
          defaultValue={contrast}
          onChange={setContrast}
        />
        <label htmlFor="opacity" className="text-sm text-neutral-300">
          opacity
        </label>
        <CustomRangeSlider
          min={0}
          max={100}
          step={1}
          defaultValue={opacity}
          onChange={setOpacity}
        />
        <label htmlFor="blur" className="text-sm text-neutral-300">
          background blur
        </label>
        <CustomRangeSlider
          min={0}
          max={200}
          step={1}
          defaultValue={blur}
          onChange={setBlur}
        />
      </div>
    </>
  );
}

export default SidebarImageEditingSelector;
