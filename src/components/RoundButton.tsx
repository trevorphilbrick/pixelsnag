import React, { useState } from "react";

function RoundButton({
  icon,
  onClick,
  disabled,
  text,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  text?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      className={`p-2 px-3 bg-neutral-900 rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-neutral-700 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        
      }`}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}

      <span className="text-neutral-200 text-sm whitespace-nowrap">{text}</span>
    </button>
  );
}

export default RoundButton;
