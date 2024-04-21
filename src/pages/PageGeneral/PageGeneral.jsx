import styles from "./PageGeneral.module.scss";
import { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../context/MyContext/MyContext";
import { Layout } from "../../components/Layout/Layout";
import { Button } from "../../components/Button/Button";

function InitialPageGeneral() {
  const navigate = useNavigate();

  const [srcImg, setSrsImg] = useState("");
  const [showImgFull, setShowImgFull] = useState(false);
  const [missionComplete, setMissionComplete] = useState(false);
  const { showAlert, setShowAlert } = useMyContext();
  const [audio, setAudio] = useState(new Audio("/ScriptHelper2/gta.mp3"));

  const copyText = (text, name, e) => {
    if (showAlert.isVisible) {
      return;
    }

    const arrName = name.split(" ");
    const finalyName = arrName.splice(arrName.indexOf("Получить") - 1, 1);
    const copyShowAlert = {
      ...showAlert,
      text: finalyName,
      isVisible: true,
    };
    setShowAlert(copyShowAlert);
    navigator.clipboard.writeText(text);

    setTimeout(() => {
      const copyShowAlert = {
        ...showAlert,
        text: "",
        isVisible: false,
      };
      setShowAlert(copyShowAlert);
    }, 1000);
  };

  const playAudio = () => {
    audio.play();
    setMissionComplete(true);

    audio.onended = () => {
      setMissionComplete(false);
    };
  };

  const textsForCopy = {
    offer: `<?=$offerUrl?>`,
    class: `exclude-integration`,
  };

  useEffect(() => {
    return () => {
      const copyShowAlert = {
        ...showAlert,
        text: "",
        isVisible: false,
      };
      setShowAlert(copyShowAlert);

      audio.pause();
    };
  }, []);

  return (
    <Layout
      srcImg={srcImg}
      showImgFull={showImgFull}
      setShowImgFull={setShowImgFull}
      showAlert={showAlert}
    >
      <main className="anim-open main">
        <div className="container">
          <div className={styles["page-name"]}>
            <button
              onClick={() => {
                navigate("/ScriptHelper2/study");
              }}
              className={styles["btn"]}
            >
              ⭠
            </button>
            <h1 className={styles["h1"]}>GENERAL</h1>
          </div>
          <div className={styles["page-content"]}>
            <p className={styles["title__page-content"]}>Общая информация</p>
            <div className={styles["core-text__page-content"]}>
              <p className={styles["part-text"]}>
                Всегда нужно проверять: <br />
                <br />
                - название офера по всей прокле <br />
                - фото офера <br />
                - новую/старую цену и валюту <br />
                - страну и код страны в форме (если есть) <br />
                - убирать base в head (бывает он мешает правильно редактировать
                файл) <br />
                - проверить ссылку на политику конфеденциальности (никуда не
                должна вести) <br />
                - Все файлы css, img, js скачиваем и храним локально! (иногда
                максимум можно cdn подключать) <br />
              </p>
              <p className={styles["part-text"]}>
                Перед сдачей проклы в тест проверять: <br />
                <br />
                - название офера (лучше по поиску в браузере, в коде можно
                пропустить) <br />
                - фото офера <br />
                - стоит проверять, чтобы в прокле у врача было одно имя (бывают
                косяки) <br />
                - адаптив на мобилках/планшетах <br />
              </p>
              <div className={styles["div-buttons"]}>
                <Button
                  onClick={(e) => {
                    playAudio();
                  }}
                >
                  Понял
                </Button>
              </div>
            </div>
            <div className={styles["images"]}>
              <img
                onClick={(e) => {
                  setShowImgFull(true);
                  setSrsImg(e.target.src);
                }}
                className={styles["img"]}
                src="/ScriptHelper2/costs.png"
                alt="#"
              />
              <img
                onClick={(e) => {
                  setShowImgFull(true);
                  setSrsImg(e.target.src);
                }}
                className={styles["img"]}
                src="/ScriptHelper2/searchOfer.png"
                alt="#"
              />
              <img
                onClick={(e) => {
                  setShowImgFull(true);
                  setSrsImg(e.target.src);
                }}
                className={styles["img"]}
                src="/ScriptHelper2/oferImg.png"
                alt="#"
              />
            </div>
          </div>
        </div>
      </main>
      <div
        className={`${styles["mission-complete"]} ${
          missionComplete ? "" : styles["none"]
        }`}
      >
        <img src="/ScriptHelper2/missionComplete.png" alt="#" />
      </div>
    </Layout>
  );
}

export const PageGeneral = memo(InitialPageGeneral);
