function Info({
  isInfoOpen,
  setIsInfoOpen,
}: {
  isInfoOpen: boolean;
  setIsInfoOpen: (isInfoOpen: boolean) => void;
}) {
  if (!isInfoOpen) return null;
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-neutral-800">
      <div className="flex items-center justify-center">
        <p className="text-neutral-200 text-sm">Info</p>
      </div>
    </div>
  );
}

export default Info;
