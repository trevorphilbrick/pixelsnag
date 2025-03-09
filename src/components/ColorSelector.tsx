import React, { useEffect, useRef } from "react";

function ColorSelector({ setColor }: { setColor: (color: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="color"
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
}

export default ColorSelector;
