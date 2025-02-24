import PyInstaller.__main__
import os
import sys

def build_executable(platform):
    # Get the directory containing this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    # Determine the server script based on the platform
    if platform == 'windows':
        server_script = os.path.join(project_root, "services", "snipping_server_windows.py")
    elif platform == 'macos':
        server_script = os.path.join(project_root, "services", "snipping_server_macos.py")
    else:
        raise ValueError("Unsupported platform. Use 'windows' or 'macos'.")
    
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
    if len(sys.argv) != 2:
        print("Usage: python build_snipping_server.py <platform>")
        print("Platform options: 'windows', 'macos'")
        sys.exit(1)
    
    platform = sys.argv[1].lower()
    build_executable(platform) 