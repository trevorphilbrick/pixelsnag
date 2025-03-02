import React from "react";

function CustomImageFileSelector({
  setImageUrl,
}: {
  setImageUrl: (url: string) => void;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col w-full mt-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="custom-file-input"
      />
      <label
        htmlFor="custom-file-input"
        className="cursor-pointer bg-blue-600 text-neutral-300 rounded-lg shadow-md hover:bg-blue-700 transition text-sm font-bold px-4 py-2 w-full text-center"
      >
        Select Custom Image
      </label>
    </div>
  );
}

export default CustomImageFileSelector;
