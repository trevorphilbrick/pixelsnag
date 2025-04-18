function SectionHeader({
  title,
  leftText,
  leftFunction,
}: {
  title: string;
  leftText?: string;
  leftFunction?: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-2 bg-cover bg-center bg-gradient-to-r from-[#8338ec] to-[#ff006e] rounded">
      <h3 className="text-md text-neutral-300 font-semibold text-shadow-md">
        {title}
      </h3>
      <p
        className="text-sm text-neutral-300 font-medium cursor-pointer hover:text-neutral-400"
        onClick={() => leftFunction()}
      >
        {leftText}
      </p>
    </div>
  );
}

export default SectionHeader;
