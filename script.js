const videoElement = document.getElementById("video");
const buttonStart = document.getElementById("button-start");
const buttonPictureMode = document.getElementById("button-picture-mode");

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };

    buttonPictureMode.hidden = false;
    buttonStart.hidden = true;

    videoElement.srcObject.getVideoTracks()[0].onended = () => {
      buttonPictureMode.hidden = true;
      buttonStart.hidden = false;
    };
  } catch (error) {
    // Catch Error Here
    console.log(error);
  }
}

buttonPictureMode.addEventListener("click", async () => {
  // Disable Button
  buttonPictureMode.disabled = true;
  // Start Picture in Picture
  await videoElement.requestPictureInPicture();
  // Reset Button
  buttonPictureMode.disabled = false;
});

buttonStart.addEventListener("click", selectMediaStream);
