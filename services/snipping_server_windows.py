from flask import Flask, send_file, jsonify
from snipping_tool import ScreenSnippingTool, capture_specific_monitor
import threading
import base64
from PIL import Image
import io
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:9229",
            "http://127.0.0.1:9229",
            "http://localhost:3000",
            "http://127.0.0.1:3000"
        ]
    }
})
screenshot_data = None

def convert_image_to_base64(image_path):
    try:
        with Image.open(image_path) as image:
            buffered = io.BytesIO()
            image.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue())
            # Clean up the temporary file after conversion
            if os.path.exists(image_path):
                os.remove(image_path)
            return img_str.decode()
    except Exception as e:
        print(f"Error converting image to base64: {e}")
        return None

@app.route('/capture', methods=['GET'])
def capture_screenshot():
    global screenshot_data
    
    def run_snipping_tool():
        global screenshot_data
        try:
            snipping_tool = ScreenSnippingTool()
            screenshot_path = snipping_tool.get_screenshot()
            if screenshot_path:
                screenshot_data = convert_image_to_base64(screenshot_path)
            else:
                screenshot_data = None
        except Exception as e:
            print(f"Error in snipping tool: {e}")
            screenshot_data = None

    # Run the snipping tool in a separate thread
    thread = threading.Thread(target=run_snipping_tool)
    thread.start()
    thread.join()

    if screenshot_data:
        return jsonify({
            'success': True,
            'image': screenshot_data
        })
    return jsonify({
        'success': False,
        'error': 'Screenshot cancelled or failed'
    })

@app.route('/capture-monitor/<int:monitor_number>', methods=['GET'])
def capture_monitor(monitor_number):
    global screenshot_data
    print(f"We are hitting the endpoint")
    
    def run_monitor_capture():
        global screenshot_data
        try:
            screenshot_path = capture_specific_monitor(monitor_number)
            if screenshot_path:
                screenshot_data = convert_image_to_base64(screenshot_path)
            else:
                screenshot_data = None
        except ValueError as e:
            print(f"Error in monitor capture: {e}")
            screenshot_data = None
        except Exception as e:
            print(f"Unexpected error in monitor capture: {e}")
            screenshot_data = None

    # Run the monitor capture in a separate thread
    thread = threading.Thread(target=run_monitor_capture)
    thread.start()
    thread.join()

    if screenshot_data:
        return jsonify({
            'success': True,
            'image': screenshot_data
        })
    return jsonify({
        'success': False,
        'error': 'Monitor capture failed'
    })

@app.route('/test', methods=['GET'])
def test_endpoint():
    return jsonify({
        'success': True,
        'message': 'Windows snipping server is running successfully'
    })

def run_server():
    app.run(port=5001, debug=True)

if __name__ == '__main__':
    run_server()
