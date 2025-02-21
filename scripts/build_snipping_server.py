import PyInstaller.__main__
import os
import sys

def build_executable():
    # Get the directory containing this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    # Path to your server script
    server_script = os.path.join(project_root, "services", "snipping_server.py")
    
    # Path to output directory
    output_dir = os.path.join(project_root, "resources", "python")
    
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Build the executable without an icon for now
    args = [
        server_script,
        '--noconfirm',
        '--onefile',
        '--name=server',
        f'--distpath={output_dir}',
        '--noconsole'  # Optional: hide console window
    ]
    
    PyInstaller.__main__.run(args)

if __name__ == "__main__":
    build_executable() 