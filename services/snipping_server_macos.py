from flask import Flask, jsonify
from snipping_tool_macos import MacSnippingTool
import base64
import io
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

def run_server():
    app.run(port=5000, debug=True)

if __name__ == '__main__':
    run_server() 