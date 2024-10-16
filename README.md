# Age Detector Movie Application

## Overview
The Age Detector Movie Application is a web application that scans the user's face to determine if they are an adult. Users who pass the age verification can access the movie content. This application is built using the following technologies:
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Image Processing**: Python, OpenCV (Flask server)

## Prerequisites
- Node.js (v14 or later)
- npm (Node Package Manager)
- Python (v3.6 or later)
- Flask
- OpenCV
- MongoDB (local or cloud instance)
- A code editor (e.g., Visual Studio Code)

## Installation

### Clone the repository
 - git clone git@github.com:tusharOxacular09/Age-Detector-Movie-Application.git
 - cd Age-Detector-Movie-Application

### Setting up the Frontend (React.js)
 - Navigate to the frontend directory: cd client
 - Install the required packages: npm install

### Setting up the Backend (Node.js, Express.js)
 - Navigate back to the main directory: cd ..
 - Navigate to the backend directory: cd server
 - Install the required packages: npm install
   
### Setting up the Image Detector (Flask Server)
 - Navigate to the flask_server directory: cd flask_server
 - Install Flask and OpenCV: pip install Flask opencv-python

### Run all three servers
 - Frontend: npm start
 - Node.js Backend: npm start
 - Flask Backend: flask run --host=0.0.0.0

## Usage
 - Allow the application to access your camera.
 - The application will scan your face.
 - If you are identified as an adult, you will be granted access to watch the movie.
 - Contributing
 - Contributions are welcome! Please create a pull request or open an issue for discussion.

## License
 - This project is licensed under the MIT License.

## Acknowledgements
 - OpenCV for image processing
 - React.js for building the frontend
 - Node.js and Express.js for creating the backend server
 - MongoDB for data storage

### Feel free to explore, contribute, or provide feedback!

This version is structured for easy reading and provides a professional introduction along with detailed setup instructions.

