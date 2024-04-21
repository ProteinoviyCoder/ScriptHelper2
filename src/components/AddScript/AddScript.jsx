import styles from "./AddScript.module.scss";
import { Button } from "../Button/Button";
import { memo, useRef, useState } from "react";

function InitialAddScript({ setShowModal, setScripts }) {
  const [textError, setTextError] = useState("");

  const addPersonalScript = () => {
    if (
      refInputName.current.value.trim() === "" ||
      refInputScript.current.value.trim() === ""
    ) {
      setTextError("*** - эти поля должны быть заполнены");
      return;
    }

    let personalScripts;

    if (localStorage.getItem("personalScripts") !== null) {
      const scriptsFromLoacal = JSON.parse(
        localStorage.getItem("personalScripts")
      );
      personalScripts = [...scriptsFromLoacal];

      let flagCanAddScript = true;
      personalScripts.forEach((elem) => {
        if (
          refInputName.current.value.toString().trim().toLowerCase() ===
          elem.name.toString().trim().toLowerCase()
        ) {
          flagCanAddScript = false;
        }
      });

      if (!flagCanAddScript) {
        setTextError("Script с таким именем уже есть");
        reeturn;
      }
    } else {
      personalScripts = [];
    }

    const newScript = {
      name: refInputName.current.value,
      versions: [
        {
          v: 1,
          description: refInputDescription.current.value,
          buttons: [
            {
              buttonText: "Получить Script",
              script: refInputScript.current.value,
            },
          ],
        },
      ],
      favorite: false,
    };

    personalScripts.push(newScript);

    localStorage.setItem("personalScripts", JSON.stringify(personalScripts));
    setScripts(personalScripts);

    refInputName.current.value = "";
    refInputDescription.current.value = "";
    refInputScript.current.value = "";
    setTextError("");
    setShowModal(false);
  };

  const refInputName = useRef(null);
  const refInputDescription = useRef(null);
  const refInputScript = useRef(null);

  return (
    <div className={styles["content_add-script"]}>
      <p className={styles["title"]}>Добавить свой скрипт</p>
      <p className={styles["hint"]}>*** - обязательные поля</p>

      <div className={styles["inputs__add-script"]}>
        <input
          ref={refInputName}
          className={styles["input"]}
          type="text"
          placeholder="***Название скрипта"
        />
        <input
          ref={refInputDescription}
          className={styles["input"]}
          type="text"
          placeholder="Описание скрипта"
        />
        <input
          ref={refInputScript}
          className={styles["input"]}
          type="text"
          placeholder="***Скрипт"
        />
        <p className={styles["text-error"]}>{textError}</p>
      </div>
      <div className={styles["buttons-add-script"]}>
        <Button onClick={() => addPersonalScript()}>Добавить</Button>
      </div>
    </div>
  );
}

export const AddScript = memo(InitialAddScript);
