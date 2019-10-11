//gets the video element created at index.html
const video = document.getElementById("video")

//loading models which is done asycnrounously (calling them in paralel thus faster to execute)
//passing in array of promises
//it takes .then
Promise.all([
    //face detector that runs real time
    faceapi.nets.tnyFaceDetector.loadFromUri('/models'),
    //registers difference part of the face.
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    //Allow API to recognize where my face is and the box around it
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    //Recognize Expressions (Happy, sad, smile)
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

//hooks up webcam to video element
function startVideo(){
    //gets the webcam, takes object as the first param, video is key, empty object as param
    navigator.getUserMedia(
        {video: {}},
        //whats coming from our webcam, setting it as source
        stream =>video.srcObject = stream,
        err => console.log(err))
}


//add event listener for when the video starts playing
//when it starts playing, start recognizing the face
video.addEventListener("play", ()=>{
    console.log("testtt")
})