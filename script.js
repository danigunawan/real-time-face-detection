//gets the video element created at index.html
const video = document.getElementById("video")

//loading models which is done asycnrounously (calling them in paralel thus faster to execute)
//passing in array of promises
//it takes .then
Promise.all([
    //face detector that runs real time
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
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
    //canvas has to be positioned directly above the video element
    const canvas = faceapi.createCanvasFromMedia(video)
    //add that canvas to the screen
    document.body.append(canvas)
    //get the display size of our current video, so that canvas can be sized over the video
    const displaySize = {width: video.width, height: video.height}
    faceapi.matchDimensions(canvas,displaySize)
    //Has to be async function since its async library
    setInterval(async() => {
        //gets all the faces inside the webcam image everytime its called (100 ms)
        //passed in video element and the libraries to use
        const detections = await faceapi.detectAllFaces(video,
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks
        ().withFaceExpressions()
        console.log(detections)
        //boxes that show up around the face are resized for the video and canvas element
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext("2d").clearRect(0,0,canvas.width, canvas.height)
        //drawing onto canvas
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 100)
})