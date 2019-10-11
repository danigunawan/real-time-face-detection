//gets the video element created at index.html
const video = document.getElementById("video")

//hooks up webcam to video element
function startVideo(){
    //gets the webcam, takes object as the first param, video is key, empty object as param
    navigator.getUserMedia(
        {video: {}},
        //whats coming from our webcam, setting it as source
        stream =>video.srcObject = stream,
        err => console.log(err))
}

startVideo();