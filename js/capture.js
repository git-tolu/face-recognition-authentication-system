
// document.addEventListener("DOMContentLoaded", () => {
//     var but = document.getElementById("start");
//     var video = document.getElementById("video");
//     var cap = document.getElementById("capture");
//     var mediaDevices = navigator.mediaDevices;
//     video.muted = true;
//     but.addEventListener("click", () => {

//         // Accessing the user camera and video.
//         mediaDevices
//             .getUserMedia({
//                 video: true,
//                 audio: true,
//             })
//             .then((stream) => {

//                 // Changing the source of video to current stream.
//                 video.srcObject = stream;
//                 video.addEventListener("loadedmetadata", () => {
//                     video.play();
//                 });
//             })
//             .catch(alert);
//     });
// });

// Configure a few settings and attach camera
function configure() {
    Webcam.set({
        width: 320,
        height: 240,
        image_format: 'jpeg',
        jpeg_quality: 90
    });
    Webcam.attach('#my_camera');
}
// A button for taking snaps
// preload shutter audio clip
var shutter = new Audio();
shutter.autoplay = false;
shutter.src = navigator.userAgent.match(/Firefox/) ? 'shutter.ogg' : 'shutter.mp3';

function take_snapshot() {
    // play sound effect
    shutter.play();

    // take snapshot and get image data
    Webcam.snap(function (data_uri) {
        $(".image-tag").val(data_uri);
        // display results in page
        document.getElementById('results').innerHTML =
            '<img id="imageprev" src="' + data_uri + '"/>';
    });

    Webcam.reset();
}

function saveSnap() {
    // Get base64 value from <img id='imageprev'> source
    var base64image = document.getElementById("imageprev").src;
    Webcam.upload(base64image, '../php/upload.php', function (code, text) {
        console.log('Save successfully');
        console.log(text);
    });

    var database = $(".image-tag").val();
    $.ajax({
        type: "post",
        url: "../php/insertImg.php",
        data: { database: database },
        success: function (response) {
            console.log(response)
        }
    });
}