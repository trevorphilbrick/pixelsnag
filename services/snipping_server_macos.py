from flask import Flask, jsonify
from snipping_tool_macos import MacSnippingTool
import base64
import io
from PIL import Image
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def convert_image_to_base64(image_path):
    with Image.open(image_path) as image:
        buffered = io.BytesIO()
        image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
        return img_str

@app.route('/capture', methods=['GET'])
def capture_route():
    try:
        snipping_tool = MacSnippingTool()
        screenshot_path = snipping_tool.get_screenshot()
        if screenshot_path:
            image_data = convert_image_to_base64(screenshot_path)
            snipping_tool.cleanup()
            return jsonify({
                'success': True,
                'image': image_data
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Screenshot cancelled or failed'
            })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })

@app.route('/capture-monitor', methods=['GET'])
@app.route('/capture-monitor/<int:monitor_number>', methods=['GET'])
def capture_monitor(monitor_number=1):
    try:
        snipping_tool = MacSnippingTool()
        screenshot_path = snipping_tool.capture_specific_monitor(monitor_number)
        if screenshot_path:
            image_data = convert_image_to_base64(screenshot_path)
            # Clean up the temporary file
            if os.path.exists(screenshot_path):
                os.remove(screenshot_path)
            return jsonify({
                'success': True,
                'image': image_data
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Monitor capture failed'
            })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })

@app.route('/test', methods=['GET'])
def test_endpoint():
    return jsonify({
        'success': True,
        'message': 'MacOS snipping server is running successfully'
    })

def run_server():
    app.run(port=5001, debug=False, use_reloader=False)

if __name__ == '__main__':
    run_server() 