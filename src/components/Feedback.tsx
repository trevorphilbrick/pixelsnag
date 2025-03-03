import { useEffect } from "react";

// Declare the Tally types
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

function Feedback() {
  // The code below will load the embed
  useEffect(() => {
    const widgetScriptSrc = "https://tally.so/widgets/embed.js";

    const load = () => {
      // Load Tally embeds
      if (typeof window.Tally !== "undefined") {
        window.Tally.loadEmbeds();
        return;
      }

      // Fallback if window.Tally is not available
      document
        .querySelectorAll<HTMLIFrameElement>(
          "iframe[data-tally-src]:not([src])"
        )
        .forEach((iframeEl) => {
          if (iframeEl.dataset.tallySrc) {
            iframeEl.src = iframeEl.dataset.tallySrc;
          }
        });
    };

    // If the Tally widget script is not loaded yet, load it
    if (document.querySelector(`script[src="${widgetScriptSrc}"]`) === null) {
      const script = document.createElement("script");
      script.src = widgetScriptSrc;
      script.async = true; // Add async loading
      script.onload = () => {
        // Wait a brief moment for Tally to initialize
        setTimeout(load, 100);
      };
      script.onerror = (error) => {
        load();
      };
      document.body.appendChild(script);
    } else {
      setTimeout(load, 100);
    }
  }, []);

  return (
    <div className="w-full h-full px-4 max-w-xl mx-auto overflow-y-scroll">
      <h1 className="text-2xl font-bold my-4 text-neutral-200">Feedback</h1>
      <div className=" flex items-center justify-center ">
        <iframe
          data-tally-src="https://tally.so/embed/npkaJP?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="840"
          title="PixelSnag Beta Feedback"
          style={{ border: "none" }}
        ></iframe>
      </div>
    </div>
  );
}

export default Feedback;
