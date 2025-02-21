import tkinter as tk
from PIL import ImageGrab
import tempfile
import os

class ScreenSnippingTool:
    def __init__(self):
        self.root = tk.Tk()
        self.root.attributes('-alpha', 0.1)  # Make window transparent
        self.root.attributes('-fullscreen', True)
        self.root.attributes('-topmost', True)  # Keep window on top
        
        self.canvas = tk.Canvas(self.root)
        self.canvas.pack(fill='both', expand=True)
        
        # Bind mouse events
        self.canvas.bind('<Button-1>', self.start_selection)
        self.canvas.bind('<B1-Motion>', self.update_selection)
        self.canvas.bind('<ButtonRelease-1>', self.end_selection)
        self.canvas.bind('<Escape>', self.cancel_selection)
        
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
            self.start_x, self.start_y, event.x, event.y, outline='red')

    def end_selection(self, event):
        if self.start_x is None or self.start_y is None:
            self.root.quit()
            return

        x1 = min(self.start_x, event.x)
        y1 = min(self.start_y, event.y)
        x2 = max(self.start_x, event.x)
        y2 = max(self.start_y, event.y)
        
        # Create temporary file for screenshot
        temp_dir = tempfile.gettempdir()
        self.screenshot_path = os.path.join(temp_dir, 'temp_screenshot.png')
        
        # Capture the selected region
        screenshot = ImageGrab.grab(bbox=(x1, y1, x2, y2))
        screenshot.save(self.screenshot_path)
        
        self.root.quit()

    def cancel_selection(self, event):
        self.screenshot_path = None
        self.root.quit()

    def get_screenshot(self):
        """Start the snipping tool and return the path to the screenshot"""
        self.root.mainloop()
        return self.screenshot_path