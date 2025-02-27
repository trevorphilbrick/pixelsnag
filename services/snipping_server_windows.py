from flask import Flask, send_file, jsonify
from snipping_tool import ScreenSnippingTool
import threading
import base64
from PIL import Image
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
screenshot_data = None

def convert_image_to_base64(image_path):
    with Image.open(image_path) as image:
        buffered = io.BytesIO()
        image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue())
        return img_str.decode()

@app.route('/capture', methods=['GET'])
def capture_screenshot():
    global screenshot_data
    
    def run_snipping_tool():
        global screenshot_data
        snipping_tool = ScreenSnippingTool()
        screenshot_path = snipping_tool.get_screenshot()
        if screenshot_path:
            screenshot_data = convert_image_to_base64(screenshot_path)
            snipping_tool.cleanup()
        else:
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

def run_server():
    app.run(port=5001)

if __name__ == '__main__':
    run_server()
