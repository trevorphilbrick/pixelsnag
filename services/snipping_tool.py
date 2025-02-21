import tkinter as tk
from PIL import ImageGrab
import tempfile
import os
from mss import mss
import mss.tools
from datetime import datetime

class ScreenSnippingTool:
    def __init__(self):
        self.root = tk.Tk()
        # Get the combined width and height of all monitors
        with mss.mss() as sct:
            # Get the virtual screen (all monitors combined)
            virtual_screen = sct.monitors[0]
            self.screen_width = virtual_screen["width"]
            self.screen_height = virtual_screen["height"]
            
        # Make window borderless but slightly visible
        self.root.attributes('-alpha', 0.2)  # Slightly more visible
        self.root.attributes('-topmost', True)
        self.root.overrideredirect(True)  # Keep this to remove window decorations
        
        # Position window to cover all monitors
        self.root.geometry(f"{self.screen_width}x{self.screen_height}+0+0")
        
        # Remove all window decorations and padding
        self.root.config(highlightthickness=0, borderwidth=0, padx=0, pady=0)
        
        self.canvas = tk.Canvas(
            self.root,
            width=self.screen_width,
            height=self.screen_height,
            highlightthickness=0,
            borderwidth=0,
            bg='gray',  # Changed to gray for better visibility while selecting
        )
        self.canvas.pack(fill='both', expand=True, padx=0, pady=0)
        
        # Remove any internal padding in the root window
        self.root.update_idletasks()
        self.root.pack_propagate(False)
        
        # Bind mouse events
        self.canvas.bind('<Button-1>', self.start_selection)
        self.canvas.bind('<B1-Motion>', self.update_selection)
        self.canvas.bind('<ButtonRelease-1>', self.end_selection)
        self.canvas.bind('<Escape>', self.cancel_selection)
        
        # Force the window to cover all screens
        self.root.lift()
        self.root.update()
        
        self.start_x = None
        self.start_y = None
        self.rect = None
        self.screenshot_path = None

    def start_selection(self, event):
        self.start_x = event.x
        self.start_y = event.y

    def update_selection(self, event):
        if self.rect:
            self.canvas.delete(self.rect)
        self.rect = self.canvas.create_rectangle(
            self.start_x, self.start_y, event.x, event.y,
            outline='red',    # Make selection border red
            width=2          # Make selection border thicker
        )

    def end_selection(self, event):
        if self.start_x is None or self.start_y is None:
            self.root.quit()
            return

        # Calculate the region coordinates with 2 pixel inset
        x1 = min(self.start_x, event.x) + 2
        y1 = min(self.start_y, event.y) + 2
        x2 = max(self.start_x, event.x) - 2
        y2 = max(self.start_y, event.y) - 2
        
        # Create temporary file for screenshot
        temp_dir = tempfile.gettempdir()
        self.screenshot_path = os.path.join(temp_dir, 'temp_screenshot.png')
        
        # Use mss for capturing across monitors
        with mss.mss() as sct:
            # Calculate width and height
            width = x2 - x1
            height = y2 - y1
            
            if width > 0 and height > 0:
                # Capture the selected region
                monitor = {
                    "left": int(x1),
                    "top": int(y1),
                    "width": int(width),
                    "height": int(height)
                }
                screenshot = sct.grab(monitor)
                mss.tools.to_png(screenshot.rgb, screenshot.size, output=self.screenshot_path)
        
        self.root.quit()

    def cancel_selection(self, event):
        self.screenshot_path = None
        self.root.quit()

    def get_screenshot(self):
        """Start the snipping tool and return the path to the screenshot"""
        self.root.mainloop()
        return self.screenshot_path

def capture_all_monitors():
    with mss.mss() as sct:
        # Get all monitors
        for i, monitor in enumerate(sct.monitors[1:], 1):  # Skip the first monitor (composite)
            # Capture the monitor
            screenshot = sct.grab(monitor)
            
            # Generate filename with timestamp
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"monitor_{i}_{timestamp}.png"
            
            # Save the screenshot
            mss.tools.to_png(screenshot.rgb, screenshot.size, output=filename)
            print(f"Saved screenshot of monitor {i} to {filename}")

def capture_specific_monitor(monitor_number):
    with mss.mss() as sct:
        # Ensure monitor number is valid
        if monitor_number < 1 or monitor_number > len(sct.monitors) - 1:
            raise ValueError(f"Invalid monitor number. Available monitors: 1-{len(sct.monitors)-1}")
        
        # Capture the specified monitor
        monitor = sct.monitors[monitor_number]
        screenshot = sct.grab(monitor)
        
        # Save the screenshot
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"monitor_{monitor_number}_{timestamp}.png"
        mss.tools.to_png(screenshot.rgb, screenshot.size, output=filename)
        print(f"Saved screenshot of monitor {monitor_number} to {filename}")

if __name__ == "__main__":
    # Example usage
    try:
        # Capture all monitors
        print("Capturing all monitors...")
        capture_all_monitors()
        
        # Capture specific monitor (e.g., monitor 1)
        print("\nCapturing specific monitor...")
        capture_specific_monitor(1)
        
    except Exception as e:
        print(f"Error: {e}")