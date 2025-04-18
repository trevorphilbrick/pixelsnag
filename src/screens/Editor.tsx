import { useState, useEffect } from "react";
import Canvas from "../components/Canvas";
import Sidebar from "../components/Sidebar";
import clsx from "clsx";
import { analytics } from "../firebasecConfig";
import { logEvent } from "firebase/analytics";

function Editor() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [isAiDescriptionOpen, setIsAiDescriptionOpen] = useState(true);

  useEffect(() => {
    logEvent(analytics, "screen_view", {
      firebase_screen: "Editor",
      firebase_screen_class: "Editor",
    });
  }, []);

  return (
    <div
      className={clsx(
        "flex h-screen w-screen overflow-x-hidden bg-neutral-800"
      )}
    >
      <Canvas
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isGeneratingDescription={isGeneratingDescription}
        setIsGeneratingDescription={setIsGeneratingDescription}
        aiDescription={aiDescription}
        setAiDescription={setAiDescription}
        isAiDescriptionOpen={isAiDescriptionOpen}
        setIsAiDescriptionOpen={setIsAiDescriptionOpen}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setAiDescription={setAiDescription}
        setIsAiDescriptionOpen={setIsAiDescriptionOpen}
      />
    </div>
  );
}

export default Editor;
