let cameraBtn = document.getElementById("camera-btn");
let camera = document.getElementById("acuant-camera");
let desc = document.getElementById("desc");
let result = document.getElementById("result-id");

let resultFace = document.getElementById("result-face");

let resultId = document.getElementById("result-id-img");
let resultError = document.getElementById("result-error");

let sharpnessInput = document.getElementById("sharpness");
let glareInput = document.getElementById("glare");
let dpiInput = document.getElementById("dpi");

let loader = document.getElementById("acuant-loader");

var liveCaptureFailed = false
var currentResult = {};

function showCameraButton() {
    cameraBtn.style.display = "block";
}

function closeCamera() {
  camera.style.display = "none";
  result.style.display = "block";
  cameraBtn.style.display = "block";
  desc.style.display = "block";
}

function openCamera() {

  desc.style.display = "none"
  result.style.display = "none";
  resultFace.style.display = "none";

  startCamera();
}

const options = {
  text: {
    NONE: "ALIGN",
    SMALL_DOCUMENT: "MOVE CLOSER",
    GOOD_DOCUMENT: null,//null countdown
    CAPTURING: "CAPTURING",
    TAP_TO_CAPTURE: "TAP TO CAPTURE"
  }
}

var cameraCallback = {
  onCaptured: onCaptured,
  onCropped: onCropped,
  onFrameAvailable: function (response) {
    //get each frame if needed
    //console.log(response)
  }
}

function startCamera() {
  currentResult = {};
  if (AcuantCamera.isCameraSupported && !AcuantCamera.isIOSWebview && !liveCaptureFailed) {
    cameraBtn.style.display = "none";
    camera.style.display = "block";

    AcuantCameraUI.start(cameraCallback, onError, options);
  }
  else {
    startManualCapture()
  }
}

function onError(error, code) {
  camera.style.display = "none";
  console.error(error, code);
  liveCaptureFailed = true;

  if (code === AcuantJavascriptWebSdk.REPEAT_FAIL_CODE) { //live capture was started after previous failure leading to manual capture, show any elements you may have hidden as the user can cancel the prompt and could otherwise end up on a blank page.
    cameraBtn.style.display = "block";
  } else {
    modal.style.display = "block";
    switch(code) {
      case AcuantJavascriptWebSdk.SEQUENCE_BREAK_CODE: //camera froze/crashed; usually happens due to an ios 15 bug
        modalText.innerHTML = "Live Camera failed. Start manual capture.";
        break;
      case AcuantJavascriptWebSdk.START_FAIL_CODE: //camera not supported or permission not granted
        modalText.innerHTML = "Live Camera failed to open. Start manual capture.";
        break;
      default: //unknown error (shouldn't happen)
        modalText.innerHTML = "Unknown camera failure. Start manual capture.";
        break;
    }
  }
}

function onCaptured(response) {
  cameraBtn.style.display = "none";
  modal.style.display = "none";
  loader.style.display = "block";
}

function onCropped(response) {
  resultId.style.display = "block";
  resultError.style.display = "none";
  if (response && response.image) {
    drawImageOnResult(response);
  } else {
    resultId.style.display = "none";
    resultError.style.display = "block";
  }
  closeCamera();
  loader.style.display = "none";
}

function startManualCapture() {
  AcuantCamera.startManualCapture(cameraCallback);
}

function end() {
  AcuantJavascriptWebSdk.endWorkers();
}

function drawImageOnResult(result) {
  currentResult = result.image.data;

  resultId.width = result.image.width;
  resultId.height = result.image.height;

  const imgContext = resultId.getContext('2d');
  const imgBuffer = imgContext.createImageData(result.image.width, result.image.height);
  imgBuffer.data.set(result.image.bytes, 0);

  imgContext.putImageData(imgBuffer, 0, 0);

  sharpnessInput.value = result.sharpness;
  glareInput.value = result.glare;
  dpiInput.value = result.dpi;
}

function saveImage() {
  var link = document.createElement("a");

  document.body.appendChild(link); // for Firefox

  link.setAttribute("href", currentResult);
  link.setAttribute("download", "testJavascript.jpg");
  link.click();
}

//this is an example of how to detect an older ios device.
//depending on your enviroment you might be able to get more specific.
function isOldiOS() {
  let ua = navigator.userAgent;
  let keyPhrase = "iPhone OS";
  const keyPhrase2 = "iPad; CPU OS";
  let index = ua.indexOf(keyPhrase);
  if (index < 0) {
    keyPhrase = keyPhrase2;
    index = ua.indexOf(keyPhrase);
  }
  if (index >= 0) {
    let version = ua.substring(index + keyPhrase.length + 1, index + keyPhrase.length + 3);
    try {
      let versionNum = parseInt(version);
      if (versionNum && versionNum < 13) {
        return true;
      } else {
        return false;
      }
    } catch (_) {
      return false;
    }
  } else {
    return false;
  }
}

function unexpectedError(errorMsg) {
  //handle an unexpected or unknown error
  console.error("Got an unexpected error callback:", errorMsg);
}

//**************** Passive Liveness==========================

function setUIValues(id, value) {
  let el = document.getElementById(id);
  el.value = value;
}

function openFrontCamera() {
  AcuantPassiveLiveness.startSelfieCapture((image) => {
    cameraBtn.style.display = "none";
    loader.style.display = "block";
    AcuantPassiveLiveness.postLiveness({
      endpoint: Credential.liveness_endpoint,
      token: btoa(Credential.passive_username + ':' + Credential.passive_password),
      image: image,
      subscriptionId: Credential.passive_subscriptionId
    }, function (result) {
      cameraBtn.style.display = "block";
      if (result) {
        if (result.LivenessResult) {
          setUIValues("face-score", result.LivenessResult.Score);
          setUIValues("face-result", result.LivenessResult.LivenessAssessment);
        }
        else {
          setUIValues("face-score", "");
          setUIValues("face-result", "");
        }
        setUIValues("face-transaction", result.TransactionId);
        setUIValues("face-error-code", result.ErrorCode);
        setUIValues("face-error-description", result.Error);
      }
      resultFace.style.display = "block";
      loader.style.display = "none";
    })
  });
}

//**************** Passive Liveness==========================