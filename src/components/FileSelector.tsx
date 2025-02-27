import React, { useState } from "react";

function FileSelector({
  setScreenshotUrl,
}: {
  setScreenshotUrl: (url: string) => void;
}) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        setScreenshotUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex gap-4 items-center">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-input"
      />

      {/* Custom File Button */}
      <label
        htmlFor="file-input"
        className="cursor-pointer bg-blue-600 text-neutral-300 rounded-lg shadow-md hover:bg-blue-700 transition text-sm font-bold px-4 py-2 rounded-md shrink-0"
      >
        Select Image
      </label>

      {/* Display Selected File Name */}
      {fileName ? (
        <span className="text-sm text-gray-400 truncate">{fileName}</span>
      ) : (
        <span className="text-sm text-gray-500">No file selected</span>
      )}
    </div>
  );
}

export default FileSelector;
