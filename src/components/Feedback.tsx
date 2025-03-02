import { useEffect } from "react";

function Feedback() {
  // The code below will load the embed
  useEffect(() => {
    const widgetScriptSrc = "https://tally.so/widgets/embed.js";

    const load = () => {
      console.log("Load function called"); // Debug log
      // Load Tally embeds
      if (typeof window.Tally !== "undefined") {
        console.log("Tally found, loading embeds"); // Debug log
        window.Tally.loadEmbeds();
        return;
      }

      console.log("Tally not found, using fallback"); // Debug log
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
      console.log("Loading Tally script"); // Debug log
      const script = document.createElement("script");
      script.src = widgetScriptSrc;
      script.async = true; // Add async loading
      script.onload = () => {
        console.log("Script loaded successfully"); // Debug log
        // Wait a brief moment for Tally to initialize
        setTimeout(load, 100);
      };
      script.onerror = (error) => {
        console.error("Error loading Tally script:", error); // Debug error
        load();
      };
      document.body.appendChild(script);
    } else {
      // If script is already present, try loading after a brief delay
      setTimeout(load, 100);
    }
  }, []);

  return (
    <div className="w-full h-full px-4 max-w-xl mx-auto">
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
