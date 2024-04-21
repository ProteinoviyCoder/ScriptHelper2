import styles from "./PageCrypto.module.scss";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { memo, useEffect, useState } from "react";
import { useMyContext } from "../../context/MyContext/MyContext";
import { Button } from "../../components/Button/Button";

function InitialPageCrypto() {
  const navigate = useNavigate();

  const [srcImg, setSrsImg] = useState("");
  const [showImgFull, setShowImgFull] = useState(false);
  const { showAlert, setShowAlert } = useMyContext();

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

  useEffect(() => {
    return () => {
      const copyShowAlert = {
        ...showAlert,
        text: "",
        isVisible: false,
      };
      setShowAlert(copyShowAlert);
    };
  }, []);

  const textsForCopy = {
    link: `{{link}}`,
    form: `{{form}}`,
    aio: `{{aio}}`,
  };

  return (
    <Layout
      srcImg={srcImg}
      showImgFull={showImgFull}
      setShowImgFull={setShowImgFull}
      showAlert={showAlert}
    >
      <main className="anim-open">
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
            <h1 className={styles["h1"]}>CRYPTO</h1>
          </div>
          <div className={styles["page-content"]}>
            <p className={styles["title__page-content"]}>Структура файлов</p>
            <div className={styles["core-text__page-content"]}>
              <p
                className={styles["part-text"]}
                style={{ marginBottom: "0px" }}
              >
                При работе с тасками по крипте очень важно сделать правильную
                структуру файлов. <br />
                <br />
                Структура должна выглядеть следующим образом:
                <br />
                <br />
                - Должен быть один файл "index.html" <br />
                - Должна быть одна папка "assets" <br />
                - В папке assets должны быть папки "img" или "images", "js",
                "css"
                <br />
                <br />
                Соответствующие файлы кидаем в соответствующие папки .css в
                assets/css, .js в assets/js, &nbsp; .png, .jpg, .gif... в
                assets/img
              </p>
            </div>
            <div className={styles["images"]}>
              <img
                onClick={(e) => {
                  setShowImgFull(true);
                  setSrsImg(e.target.src);
                }}
                className={styles["img"]}
                src="/ScriptHelper2/files1.png"
                alt="#"
              />
              <img
                onClick={(e) => {
                  setShowImgFull(true);
                  setSrsImg(e.target.src);
                }}
                className={styles["img"]}
                src="/ScriptHelper2/files2.png"
                alt="#"
              />
            </div>
          </div>
          <div className={styles["page-content"]}>
            <p className={styles["title__page-content"]}>index.html</p>
            <div className={styles["core-text__page-content"]}>
              <p className={styles["part-text"]}>
                При подключении любых файлоа из папки assets, важно прописывать
                путь через "./" например: <br />
                &lt;link rel="stylesheet"{" "}
                <span style={{ color: "orange" }}>
                  href="./assets/css/main.css"
                </span>
                &gt;&lt;/link&gt;
              </p>
              <p className={styles["part-text"]}>
                Всем ссылкам на странице в пути мы прописываем макрос{" "}
                {"{{link}}"}, пример: <br />
                &lt;a href="{"{{link}}"}"&gt; Order &lt;/a&gt;
              </p>
              <p className={styles["part-text"]}>
                Если на прокле должна быть форма, просто вставляем в место где
                должна быть форма макрос {"{{form}}"}
              </p>
              <p className={styles["part-text"]}>
                Перед закрывающим тегом &lt;/body&gt; важно вставить макрос{" "}
                {"{{aio}}"}
              </p>
              <p className={styles["part-text"]}>
                После этих действий на прокле могут торчать куски кода{" "}
                {"{{form}}, {{aio}}"} это не страшно. После загрузки проклы на
                crm макросы подтянутся и всё будет ок
              </p>
              <div className={styles["div-buttons"]}>
                <Button
                  onClick={(e) => {
                    copyText(textsForCopy.link, e.target.textContent);
                  }}
                >
                  Получить <br /> {"{{link}}"}
                </Button>
                <Button
                  onClick={(e) => {
                    copyText(textsForCopy.form, e.target.textContent);
                  }}
                >
                  Получить <br /> {"{{form}}"}
                </Button>
                <Button
                  onClick={(e) => {
                    copyText(textsForCopy.aio, e.target.textContent);
                  }}
                >
                  Получить <br /> {"{{aio}}"}
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
                src="/ScriptHelper2/macroses.png"
                alt="#"
              />
            </div>
          </div>
          <div className={styles["page-content"]}>
            <p className={styles["title__page-content"]}>Сдача в тест</p>
            <div className={styles["core-text__page-content"]}>
              <p className={styles["part-text"]}>
                В отличие от других прокл, здесь мы архивируем файл index.html и
                папку assets
              </p>
              <p className={styles["part-text"]}>
                <strong>ВАЖНО!!!</strong> <br />
                Архив должен быть в формате .zip
              </p>
            </div>
            <div className={styles["images"]}>
              <img
                onClick={(e) => {
                  setShowImgFull(true);
                  setSrsImg(e.target.src);
                }}
                className={styles["img"]}
                src="/ScriptHelper2/zip1.png"
                alt="#"
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const PageCrypto = memo(InitialPageCrypto);
