# PixelSnag

## Snipping Server

### Overview

The Snipping Server is a simple server that allows you to snip images from your screen and send them to a remote server.

### Starting the server in development mode

- Windows: `python services/snipping_server_windows.py`
- MacOS: `python services/snipping_server_macos.py`

### Building the server for distribution

- Windows: `python scripts/build_snipping_server.py windows`
- MacOS: `python scripts/build_snipping_server.py macos`

## PixelSnag Application

### Overview

The PixelSnag Application is a simple application that allows you to snip images from your screen and send them to a remote server.

### Starting the application in development mode

- `npm start`

## Building the application for distribution

- `npm run build`
- this will output the build to the `out` folder
