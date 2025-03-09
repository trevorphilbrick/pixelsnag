import { useRef, useState } from "react";

function ColorSelector({
  setColor,
  value,
}: {
  setColor: (color: string) => void;
  value: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [bgColor, setBgColor] = useState("#000000");

  const handleSelectColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    setBgColor(e.target.value);
  };

  return (
    <div>
      <div
        className="w-full h-12 rounded-md cursor-pointer shadow-md"
        onClick={() => {
          inputRef.current?.click();
        }}
        style={{ backgroundColor: bgColor }}
      />
      <input
        ref={inputRef}
        type="color"
        onChange={(e) => handleSelectColor(e)}
        className="w-0 h-0"
        value={value}
      />
    </div>
  );
}

export default ColorSelector;
