import "./App.scss";
import { useQuery, useRef } from "react-query";
import { translate } from "./fetchTranslate";
import React, { useState, useEffect } from "react";
import { useSpeech, getLocalStream } from "./useRecognition";
import { Topbar, Card, Drawer } from "./components";
function App() {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [isTalking, setisTalking] = useState(false);
  const [translations, setTranslations] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const queryForTranslation = useQuery({
    queryKey: ["translate", source],
    queryFn: () => translate("en", "tr", source),
    onSuccess: (data) => {
      setTarget(data.data.translations[0].translatedText);
      console.log(data.data);
      setTimeout(() => {
        if (
          data.data.translations[0].translatedText !== "" &&
          (translations.length == 0 ||
            !translations?.some(
              (translation) =>
                translation.target === data.data.translations[0].translatedText
            ))
        ) {
          setTranslations([
            ...translations,
            {
              id: Math.random() * 10,
              source: source,
              target: data.data.translations[0].translatedText,
            },
          ]);
        }
      }, 7000);
    },
  });

  const recognition = useSpeech();

  useEffect(() => {
    getLocalStream();
  }, []);

  const startTalking = () => {
    recognition.start();
    setSource("");
    setisTalking(true);
  };

  recognition.onresult = function (event) {
    setSource(event.results[0][0].transcript);
    setSource(event.results[0][0].transcript);
  };

  recognition.onspeechend = function () {
    setisTalking(false);
    recognition.stop();
  };

  const stopTalking = () => {
    setisTalking(false);
    recognition.stop();
  };

  return (
    <div className="App">
      <Drawer
        title={"History"}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
      >
        {translations.map((translation) => {
          return (
            <div>{`tr: ${translation.source} -> en: ${translation.target}`}</div>
          );
        })}
      </Drawer>
      <Topbar></Topbar>
      <div className="wrapper">
        <div class="textarea-container">
          <textarea
            placeholder="Type here..."
            onChange={(e) => {
              setSource(e.target.value);
            }}
            defaultValue={source}
            rows={8}
            style={{ width: 300, display: "block" }}
          ></textarea>
          <button onClick={!isTalking ? startTalking : stopTalking}>
            {!isTalking ? "🎤 " : "⏹️"}
          </button>
        </div>

        <Card>
          <div>{queryForTranslation.isLoading ? "loading" : target}</div>
          <div>{isTalking ? "talking" : ""}</div>
        </Card>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={() => setIsVisible(true)} className="button-circle">
            📜
          </button>
          History
        </div>
      </div>
    </div>
  );
}

export default App;
