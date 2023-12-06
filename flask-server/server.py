from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from deepface import DeepFace
import cv2
import numpy as np
from io import BytesIO

# Helper Files For Detecting the age
faceProto = "helper/opencv_face_detector.pbtxt"
faceModel = "helper/opencv_face_detector_uint8.pb"
ageProto = "helper/age_deploy.prototxt"
ageModel = "helper/age_net.caffemodel"

faceNet=cv2.dnn.readNet(faceModel, faceProto)
ageNet=cv2.dnn.readNet(ageModel,ageProto)

MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
ageList = ['2', '5', '10', '17', '22', '30', '40', '50', '80']

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/detect-age', methods=['POST'])
def upload():
    try:
        file = request.files['file']
        image = process_image(file)
        result = detect_age2(image)
        return jsonify({'age': result}),200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}),500

def process_image(file):
    # Read the image file and convert it to a format suitable for DeepFace
    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), 1)
    return image

def detect_age(image):
    # Analyze the age using DeepFace
    result = DeepFace.analyze(img_path=image, actions=['age'])
    print(result[0]["age"])
    return result[0]["age"]

def detect_age2(image):
    frame, bboxs = faceBox(faceNet,image)
    for bbox in bboxs:
        face = frame[max(0,bbox[1]-20):min(bbox[3]+20,frame.shape[0]-1),max(0,bbox[0]-20):min(bbox[2]+20, frame.shape[1]-1)]
        blob=cv2.dnn.blobFromImage(face, 1.0,(227,227), MODEL_MEAN_VALUES,swapRB=False )  

        ageNet.setInput(blob)
        agePred=ageNet.forward()
        age=ageList[agePred[0].argmax()]
        return age

def faceBox(faceNet,frame):
    # print(frame)
    frameWidth = frame.shape[1]
    frameHeight = frame.shape[0]
    blob = cv2.dnn.blobFromImage(frame, 1.0,(227,227), [104,117,123], swapRB=False)
    faceNet.setInput(blob)
    detection=faceNet.forward()
    bboxs=[]
    
    # print(detection.shape)
    
    for i in range(detection.shape[2]):
        confidence=detection[0,0,i,2]
        if confidence>0.7:
            x1=int(detection[0,0,i,3]*frameWidth)
            y1=int(detection[0,0,i,4]*frameHeight)
            x2=int(detection[0,0,i,5]*frameWidth)
            y2=int(detection[0,0,i,6]*frameHeight)
            bboxs.append([x1,y1,x2,y2])
            cv2.rectangle(frame, (x1,y1),(x2,y2),(0,255,0),1)
    return frame, bboxs

if __name__ == '__main__':
    app.run(debug=True)
