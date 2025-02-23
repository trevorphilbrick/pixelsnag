import requests
from snipping_tool_macos import MacSnippingTool

def test_mac_snipping_tool():
    # Test the MacSnippingTool directly
    tool = MacSnippingTool()
    screenshot_path = tool.get_screenshot()
    if screenshot_path:
        print(f"Screenshot successfully saved to {screenshot_path}")
        tool.cleanup()
    else:
        print("Failed to capture screenshot")

def test_flask_server():
    # Test the Flask server endpoint
    try:
        response = requests.get('http://localhost:5000/capture')
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                print("Server successfully captured screenshot")
            else:
                print(f"Server failed to capture screenshot: {data.get('error')}")
        else:
            print(f"Server returned status code {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to server: {e}")

if __name__ == "__main__":
    print("Testing MacSnippingTool...")
    test_mac_snipping_tool()
    
    print("\nTesting Flask server...")
    test_flask_server() 