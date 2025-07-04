#!/usr/bin/python3

from flask import Flask, jsonify, send_from_directory;
import os;
from PIL import Image;
from PIL import PngImagePlugin;

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


def parse_sd_params(data):
    raw = data.get("parameters", "");
    lines = raw.split("\n");
    result = dict();
    if (lines):
        result["tags"] = [tag.strip() for tag in lines[0].split(",")];
    if (len(lines) > 1):
        for item in lines[1].split(","):
            if (":" in item):
                key, value = item.split(":", 1);
                result[key.strip().lower().replace(" ", "_")] = value.strip();
    return result;


@app.route("/api/files/<path:file>/metadata")
def serve_metadata(file):
    image = Image.open(IMAGE_DIRECTORY + file);
    png_info = image.info;
    return jsonify(parse_sd_params(png_info));


if (__name__ == "__main__"):
    app.run(debug=True);
