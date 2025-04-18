import FileSelector from "./FileSelector";
import SectionHeader from "./SectionHeader";

function SidebarImageSelector({
  setScreenshotUrl,
}: {
  setScreenshotUrl: (url: string) => void;
}) {
  return (
    <>
      <SectionHeader title="Select An Image" />
      <FileSelector setScreenshotUrl={setScreenshotUrl} />
    </>
  );
}

export default SidebarImageSelector;
