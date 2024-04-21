import styles from "./PageSs.module.scss";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { memo, useEffect, useState } from "react";
import { useMyContext } from "../../context/MyContext/MyContext";
import { Button } from "../../components/Button/Button";

function InitialPageSs() {
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
    offer: `<?=$offerUrl?>`,
    class: `exclude-integration`,
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
                navigate("/study");
              }}
              className={styles["btn"]}
            >
              ⭠
            </button>
            <h1 className={styles["h1"]}>SS</h1>
          </div>
          <div className={styles["page-content"]}>
            <p className={styles["title__page-content"]}>Ссылки</p>
            <div className={styles["core-text__page-content"]}>
              <p className={styles["part-text"]}>
                Во всех &lt;a&gt; нужно прописать атрибут
                href="&lt;?=$offerUrl?&gt;" <br />
                Если есть скрол - убираем
              </p>
              <p className={styles["part-text"]}>
                Если надо, чтобы ссылка вставленная в атрибут href переходила
                куда надо, а не на оффер, то добавляем тегу &lt;a&gt; этот
                класс: <br />
                class="exclude-integration"
              </p>
              <p className={styles["part-text"]}>
                Если у тега &lt;a&gt; уже есть класс, добавляем к классу так:{" "}
                <br />
                class="other exclude-integration"
              </p>
              <div className={styles["div-buttons"]}>
                <Button
                  onClick={(e) => {
                    copyText(textsForCopy.offer, e.target.textContent);
                  }}
                >
                  Получить <br /> &lt;?=$offerUrl?&gt;
                </Button>
                <Button
                  onClick={(e) => {
                    copyText(textsForCopy.class, e.target.textContent);
                  }}
                >
                  Получить <br /> exclude-integration
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
                src="../../../public/ss-links1.png"
                alt="#"
              />
              <img
                onClick={(e) => {
                  setShowImgFull(true);
                  setSrsImg(e.target.src);
                }}
                className={styles["img"]}
                src="../../../public/ss-links2.png"
                alt="#"
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const PageSs = memo(InitialPageSs);
