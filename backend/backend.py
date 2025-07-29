#!/usr/bin/python3

from flask import Flask, jsonify, send_from_directory;
import os;
from PIL import Image;
from PIL import PngImagePlugin;

from opts import *;

app = Flask(__name__);

@app.route("/api/files/")
def list_images():
    """
    Provides a list of files in the root directory

    Output:
    Array[String]
    """
    files = [];
    for file in os.listdir(IMAGE_DIRECTORY):
        if (file.lower().endswith(EXTENSIONS)):
            files.append(file);
    return jsonify(files);

@app.route("/api/files/<path:file>")
def serve_image(file):
    return send_from_directory(IMAGE_DIRECTORY, file);


def parse_sd_params(data):
    """
    Parses the stable diffusion metadata of an image

    Input:
        data: The metadata of the image as a flat string

    Output:
    The metadata as a dict
    """
    raw = data.get("parameters", "");
    newline_index = raw.rfind("\n");
    lines = [ raw[:newline_index], raw[newline_index + 1:] ];
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
    """
    Gets the stable diffusion metadata of an image

    Output:
    {
        String : String
    }
    """
    image = Image.open(IMAGE_DIRECTORY + file);
    png_info = image.info;
    return jsonify(parse_sd_params(png_info));


def create_thumbnail(file, thumb_size):
    """
    Creates a square thumbnail of the given image
    """
    image = Image.open(IMAGE_DIRECTORY + file);

    min_side = min(image.width, image.height);
    left = (image.width - min_side) // 2;
    top = (image.height - min_side) // 2;
    right = left + min_side;
    bottom = top + min_side;
    image = image.crop(( left, top, right, bottom ));
    image = image.resize(( thumb_size, thumb_size ), Image.LANCZOS);
    image.save(THUMB_DIRECTORY + file);

@app.route("/api/files/<path:file>/thumb")
def serve_thumb(file):
    """
    Serves a thumbnail for the given file
    """
    if (not os.path.isfile(THUMB_DIRECTORY + file)):
        create_thumbnail(file, THUMB_SIZE);
    return send_from_directory(THUMB_DIRECTORY, file);


if (__name__ == "__main__"):
    app.run(debug=True);
