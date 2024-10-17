import styles from "./Script.module.scss";
import { Button } from "../Button/Button";
import { memo, useEffect, useRef, useState } from "react";
import { useMyContext } from "../../context/MyContext/MyContext";

function InitialScript({
  scriptOne,
  setScripts,
  scripts,
  showModal,
  setShowModal,
  setBtnContentModalWindow,
  setDataOfScript,
  setVersionDataOfScript,
  scriptGroup,
  setWhatIsScriptGroup,
}) {
  const { showAlert, setShowAlert } = useMyContext();

  const [isOpenDescriptionOfScript, setIsOpenDescriptionOfScript] =
    useState(false);

  const [version, setVersion] = useState(1);
  const [flagAnim, setFlagAnim] = useState(false);

  const refText = useRef(null);

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

  const addFavoriteScript = (scriptThis) => {
    const copyScripts = [...scripts];

    if (scriptThis.favorite === false) {
      copyScripts[copyScripts.indexOf(scriptThis)].favorite = true;
    } else if (scriptThis.favorite === true) {
      copyScripts[copyScripts.indexOf(scriptThis)].favorite = false;
    }

    copyScripts.sort((a, b) => {
      if (a.favorite && !b.favorite) {
        return -1; // Первый элемент (a) идет перед вторым (b)
      } else if (!a.favorite && b.favorite) {
        return 1; // Второй элемент (b) идет перед первым (a)
      } else {
        return 0; // Оставить элементы на своих местах
      }
    });

    setScripts(copyScripts);
  };

  const closeAnim = (dataVersion) => {
    if (dataVersion === version || flagAnim) {
      return;
    }
    if (flagAnim === false) {
      setFlagAnim(true);
      if (refText.current) {
        refText.current.classList.add("anim-close");
        setTimeout(() => {
          refText.current.classList.remove("anim-close");
          refText.current.classList.add("anim-open");
          setVersion(dataVersion);
          setTimeout(() => {
            refText.current.classList.remove("anim-open");
            setFlagAnim(false);
          }, 500);
        }, 500);
      }
    } else {
      return;
    }
  };

  const splitString = (data) => {
    const arr = [];
    let count = 0;
    const dataArray = data.split(/\n|:;:/);

    dataArray.forEach((i) => {
      arr.push({ id: count, text: i });
      count++;
    });

    return arr;
  };

  const removeScript = () => {
    const copyScript = [...scripts];

    copyScript.splice(copyScript.indexOf(scriptOne), 1);

    setScripts(copyScript);
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

  return (
    <div className={styles["div-script"]}>
      <div className={styles["script"]}>
        <div className={styles["script-top"]}>
          <div className={styles["div__small-btn"]}>
            <button
              title="Двойный клик, чтобы удалить"
              onDoubleClick={() => {
                removeScript();
              }}
              className={styles["small-btn"]}
            >
              <img
                className={styles["img"]}
                src="/ScriptHelper2/del.png"
                alt="#"
              />
            </button>
            <button
              onClick={() => {
                setBtnContentModalWindow("change");
                setVersionDataOfScript(version);
                setWhatIsScriptGroup(scriptGroup);
                setDataOfScript(scriptOne);
                setShowModal(true);
              }}
              className={styles["small-btn-change"]}
            >
              <img
                className={styles["img"]}
                src="/ScriptHelper2/change.png"
                alt="#"
              />
            </button>
          </div>
          <p className={styles["script-name"]}>{scriptOne.name}</p>
          <div>
            <svg
              onClick={() => addFavoriteScript(scriptOne)}
              className={` ${styles.svg}  ${
                scriptOne.favorite ? styles["svg-active"] : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="30"
            >
              <path
                fill="none"
                stroke="white"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          </div>
        </div>
        <div className={styles["version-script"]}>
          {scriptOne.versions.map((versionScript) => {
            return (
              <div
                key={versionScript.v}
                onClick={() => {
                  closeAnim(versionScript.v);
                }}
                className={
                  version === versionScript.v
                    ? styles["active-version-script"]
                    : ""
                }
              >
                v{versionScript.v}
              </div>
            );
          })}
        </div>
        <hr />
        <div
          ref={refText}
          className={`${styles["script-text"]} ${
            !isOpenDescriptionOfScript &&
            splitString(scriptOne.versions[version - 1].description).length > 1
              ? styles["script-text-max-height"]
              : ""
          }`}
        >
          {splitString(scriptOne.versions[version - 1].description).map(
            (partText) => {
              return <p key={partText.id}>{partText.text}</p>;
            }
          )}
          {splitString(scriptOne.versions[version - 1].description).length >
            1 && (
            <button
              onClick={() =>
                setIsOpenDescriptionOfScript(!isOpenDescriptionOfScript)
              }
              className={
                isOpenDescriptionOfScript
                  ? styles["btn-gradient-open"]
                  : styles["btn-gradient-close"]
              }
            >
              a
            </button>
          )}
        </div>
        <hr />
        <div className={styles["buutons_script"]}>
          {scriptOne.versions[version - 1].buttons.map((btn) => {
            return (
              <div key={btn.buttonText}>
                <Button
                  onClick={(e) =>
                    copyText(btn.script, btn.buttonText, e.target)
                  }
                >
                  {btn.buttonText}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const Script = memo(InitialScript);
