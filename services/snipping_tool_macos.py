import subprocess
import tempfile
import os
from datetime import datetime

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

    def capture_specific_monitor(self, monitor_number):
        # Create filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"monitor_{monitor_number}_{timestamp}.png"
        
        try:
            # List available displays
            display_info = subprocess.check_output(['system_profiler', 'SPDisplaysDataType']).decode()
            displays = [line for line in display_info.split('\n') if 'Display' in line]
            
            if monitor_number < 1 or monitor_number > len(displays):
                raise ValueError(f"Invalid monitor number. Available monitors: 1-{len(displays)}")
            
            # Capture the specific display
            subprocess.run(
                ['screencapture', '-D', str(monitor_number), filename],
                check=True
            )
            print(f"Screenshot of monitor {monitor_number} saved to {filename}")
            return filename
        except subprocess.CalledProcessError as e:
            print(f"Failed to capture monitor: {e}")
            return None
        except ValueError as e:
            print(f"Error: {e}")
            return None

if __name__ == "__main__":
    # Example usage
    tool = MacSnippingTool()
    screenshot_path = tool.get_screenshot()
    if screenshot_path:
        print(f"Screenshot saved to {screenshot_path}")
    else:
        print("Failed to capture screenshot") 