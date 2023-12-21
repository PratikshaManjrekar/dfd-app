from flask import Flask, request, jsonify
import json
from flask_cors import CORS
from PIL import Image
from app import predict

app = Flask(__name__)
CORS(app)

@app.route("/",methods=["GET","POST"])
def get_prediction():
    if request.method == "POST":
        img = request.files.get("img")
        if img is None:
            return json.dumps({"error":"No Image Found"})
        try:
            img = Image.open(img)
            confidences, prediction, face_with_mask = predict(img)
            response  = {
                "confidences": confidences,
                "prediction":prediction,
                "mask": face_with_mask
            }
            return json.dumps(response)
        except Exception as e:
            return json.dumps({"error":str(e)})
    return "App Running"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)