import os
from snipping_tool import ScreenSnippingTool, capture_all_monitors, capture_specific_monitor

def test_screen_snipping_tool():
    # Initialize the snipping tool
    tool = ScreenSnippingTool()
    
    # Simulate a user selection (this part is tricky to automate without a GUI testing tool)
    # For now, we will just start the tool and manually select a region
    print("Please manually select a region on the screen...")
    screenshot_path = tool.get_screenshot()
    
    # Check if the screenshot was saved
    if screenshot_path and os.path.exists(screenshot_path):
        print(f"Screenshot saved at {screenshot_path}")
    else:
        print("Failed to capture screenshot.")

def test_capture_all_monitors():
    # Capture all monitors
    print("Testing capture of all monitors...")
    capture_all_monitors()
    # Check if files are created (this assumes you know the number of monitors)
    # You might need to manually verify the files in the current directory

def test_capture_specific_monitor(monitor_number):
    # Capture a specific monitor
    print(f"Testing capture of monitor {monitor_number}...")
    try:
        capture_specific_monitor(monitor_number)
    except ValueError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Run tests
    test_screen_snipping_tool()
    test_capture_all_monitors()
    test_capture_specific_monitor(1)  # Adjust the monitor number as needed
