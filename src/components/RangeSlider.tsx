import React, { useState } from "react";

const CustomRangeSlider = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  onChange,
}: {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  onChange: (value: number) => void;
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value));
    if (onChange) {
      onChange(parseInt(e.target.value));
    }
  };

  return (
    <div className="flex flex-col items-center w-full my-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full max-w-md appearance-none bg-transparent focus:outline-none"
      />
      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          background: rgb(19, 19, 19);
          border-radius: 5px;
          outline: none;
          transition: background 0.15s ease-in-out;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.2s;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.2s;
        }

        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default CustomRangeSlider;
