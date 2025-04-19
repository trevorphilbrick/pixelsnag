import { useState } from "react";
import { useSettingsState } from "../zustand/useSettingsState";
import { toast, ToastContainer } from "react-toastify";

function AISettings() {
  const { openAIKey, setOpenAIKey } = useSettingsState();
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-4 p-4 text-neutral-300 w-full">
      <h1 className="text-2xl font-bold text-neutral-200">AI Settings</h1>
      <div className="flex justify-between align-center">
        <label htmlFor="email" className="text-neutral-300">
          OpenAI API Key
        </label>
        <button
          onClick={() => {
            setOpenAIKey(null);
            toast("API Key Cleared!", {
              position: "bottom-right",
              theme: "dark",
              progressClassName: "bg-blue-500",
              className: "bg-neutral-900",
            });
          }}
          className="text-sm text-neutral-300 font-medium cursor-pointer hover:text-neutral-400 active:text-neutral-500"
        >
          Delete Key
        </button>
      </div>
      <input
        className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none shadow-inset"
        type="password"
        value={openAIKey ?? value}
        onChange={(e) => setValue(e.target.value)}
        readOnly={!!openAIKey}
      />

      <button
        onClick={() => {
          if (value) {
            setOpenAIKey(value);
            toast("🦄 API Key Set!", {
              position: "bottom-right",
              theme: "dark",
              progressClassName: "bg-blue-500",
              className: "bg-neutral-900",
            });
          }
        }}
        className="cursor-pointer bg-blue-600 text-neutral-300 rounded-md shadow-md hover:bg-blue-700 transition text-sm font-bold px-4 py-2 w-full text-center disabled:bg-neutral-600"
        disabled={!value || !!openAIKey}
      >
        Set OpenAI API Key
      </button>
      <ToastContainer />
    </div>
  );
}

export default AISettings;
