import RoundButton from "../components/RoundButton";
import { useNavigate } from "react-router-dom";
import { usePlatform } from "../hooks/usePlatform";
function Info() {
  const navigate = useNavigate();
  const platform = usePlatform();

  return (
    <div>
      <div className="flex items-center gap-4 border-b border-neutral-700 p-4 shadow-lg">
        <RoundButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-neutral-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          }
          onClick={() => navigate("/")}
          text="Back"
        />
        <h1 className="text-neutral-200 text-4xl font-bold">Info</h1>
      </div>
      <div className="p-4">
        <h3 className="text-neutral-200 text-2xl font-bold mb-4">
          Taking a screenshot with PixelSnag
        </h3>
        <h4 className="text-neutral-200 text-xl font-bold">
          With the snipping tool
        </h4>
        <p className="text-neutral-200 text-sm mb-4">
          The snipping tool is a simple tool that allows you to capture a
          section of your screen. You can access it by clicking the snipping
          tool icon (scissors ) in the top right corner of the app.
        </p>
        <h4 className="text-neutral-200 text-xl font-bold">
          With the keyboard shortcut
        </h4>
        <p className="text-neutral-200 text-sm mb-4">
          Taking a screenshot with a keyboard shortcut is as simple as pressing
          <span className="font-bold">
            {platform.isMac
              ? "Command + Alt + Shift + S"
              : " Ctrl + Alt + Shift + S"}
          </span>{" "}
          on your keyboard. This will bring up the snipping tool, and allow you
          to drag your mouse over a section of your screen to capture it. You
          will then be brought into the app where you can edit the captured
          image.
        </p>
        <h4 className="text-neutral-200 text-xl font-bold">
          With the screen/window capture tool
        </h4>
        <p className="text-neutral-200 text-sm mb-4">
          The screen/window capture tool allows you to capture the entire screen
          or a specific window. You can access it by clicking the screen capture
          tool icon (camera) in the top right corner of the app.
        </p>
        <h4 className="text-neutral-200 text-xl font-bold">
          With the upload tool
        </h4>
        <p className="text-neutral-200 text-sm mb-4">
          The upload tool allows you to upload an image from your computer. You
          can access it by clicking the blue "Select Image" button at the top of
          the Sidebar.
        </p>
        <h3 className="text-neutral-200 text-2xl font-bold mb-4">
          Customizing the screenshot
        </h3>
        <p className="text-neutral-200 text-sm mb-4">
          You can customize the screenshot in several ways including padding,
          border radius, shadow, and background.
        </p>
        <h3 className="text-neutral-200 text-2xl font-bold mb-4">
          Sharing the Screenshot
        </h3>
        <p className="text-neutral-200 text-sm mb-4">
          You can share the screenshot two ways. The first is by clicking the
          "clipboard" button, which will copy it to your clipboard for pasting
          (This will also minimize the app), and the other is the "Download"
          button, which will download the image to your computer.
        </p>
      </div>
    </div>
  );
}

export default Info;
