
document.addEventListener("DOMContentLoaded", () => {
    var but = document.getElementById("start");
    var video = document.getElementById("video");
    var cap = document.getElementById("capture");
    var mediaDevices = navigator.mediaDevices;
    video.muted = true;
    but.addEventListener("click", () => {

        // Accessing the user camera and video.
        mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            })
            .then((stream) => {

                // Changing the source of video to current stream.
                video.srcObject = stream;
                video.addEventListener("loadedmetadata", () => {
                    video.play();
                });
            })
            .catch(alert);
    });
});
