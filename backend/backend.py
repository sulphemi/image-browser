#!/usr/bin/python3

from flask import Flask, jsonify, send_from_directory;
import os;
from opts import *;

app = Flask(__name__);

@app.route("/api/files/")
def list_images():
    files = [];
    for file in os.listdir(IMAGE_DIRECTORY):
        if (file.lower().endswith(EXTENSIONS)):
            files.append(file);
    return jsonify(files);

@app.route("/api/files/<path:file>")
def serve_image(file):
    return send_from_directory(IMAGE_DIRECTORY, file);

if (__name__ == "__main__"):
    app.run(debug=True);
