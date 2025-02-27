import React from "react";

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="p-2 bg-cover bg-center">
      <h3 className="text-md text-neutral-300 font-semibold">{title}</h3>
    </div>
  );
}

export default SectionHeader;
