export function useSpeech() {
  const SpeechRecognition =
    window.speechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
    window.speechGrammarList || window.webkitSpeechGrammarList;

  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();

  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  return recognition;
}

export function getLocalStream() {
  navigator.mediaDevices
    .getUserMedia({ video: false, audio: true })
    .then((stream) => {
      // console.log(stream);
      // window.localStream = stream; // A
      // window.localAudio.srcObject = stream; // B
      // window.localAudio.autoplay = true; // C
    })
    .catch((err) => {
      console.log("u got an error:" + err);
    });
}
