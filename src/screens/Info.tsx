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
          With the keyboard shortcut
        </h4>
        <p className="text-neutral-200 text-sm">
          Taking a screenshot with a keyboard shortcut is as simple as pressing
          <span className="font-bold">
            {platform.isMac
              ? "Command + Alt + Shift + S"
              : " Ctrl + Alt + Shift + S"}
          </span>{" "}
          on your keyboard.
        </p>
        <h4 className="text-neutral-200 text-xl font-bold">
          With the snipping tool
        </h4>
        <h4 className="text-neutral-200 text-xl font-bold">
          With the screen/window capture tool
        </h4>
        <h4 className="text-neutral-200 text-xl font-bold">
          With the upload tool
        </h4>
      </div>
    </div>
  );
}

export default Info;
