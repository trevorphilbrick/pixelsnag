import subprocess
import tempfile
import os

class MacSnippingTool:
    def __init__(self):
        self.screenshot_path = None

    def get_screenshot(self):
        # Create a temporary file for the screenshot
        temp_dir = tempfile.gettempdir()
        self.screenshot_path = os.path.join(temp_dir, 'temp_screenshot.png')

        # Use the native macOS screen capture tool with interactive selection
        try:
            subprocess.run(
                ['screencapture', '-i', self.screenshot_path],
                check=True
            )
            print(f"Screenshot saved to {self.screenshot_path}")
            return self.screenshot_path
        except subprocess.CalledProcessError as e:
            print(f"Failed to capture screenshot: {e}")
            return None

    def cleanup(self):
        # Remove the temporary screenshot file if it exists
        if self.screenshot_path and os.path.exists(self.screenshot_path):
            os.remove(self.screenshot_path)

if __name__ == "__main__":
    # Example usage
    tool = MacSnippingTool()
    screenshot_path = tool.get_screenshot()
    if screenshot_path:
        print(f"Screenshot saved to {screenshot_path}")
    else:
        print("Failed to capture screenshot") 