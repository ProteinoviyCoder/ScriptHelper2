import styles from "./ChangeScript.module.scss";
import { Button } from "../Button/Button";
import { memo, useEffect, useRef, useState } from "react";

function InitialChangeScript({
  setShowModal,
  setPersonalScripts,
  dataOfScript,
  versionDataOfScript,
  whatIsScriptGroup,
  setGeneralScripts,
}) {
  const [textError, setTextError] = useState("");
  const [scriptOne, setScriptOne] = useState(dataOfScript);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const addPersonalScript = () => {
    if (
      refInputName.current.value.trim() === "" ||
      refInputScript.current.value.trim() === ""
    ) {
      setTextError("*** - эти поля должны быть заполнены");
      return;
    }

    if (whatIsScriptGroup === "personal") {
      let personalScripts;

      if (localStorage.getItem("personalScripts") !== null) {
        const scriptsFromLoacal = JSON.parse(
          localStorage.getItem("personalScripts")
        );
        personalScripts = [...scriptsFromLoacal];
      } else {
        personalScripts = [];
      }

      // write code here, change inputs in script
      let foundIndexScript = personalScripts.find(
        (obj) => obj.name === dataOfScript.name
      );
      personalScripts[personalScripts.indexOf(foundIndexScript)].name =
        refInputName.current.value.trim();
      personalScripts[personalScripts.indexOf(foundIndexScript)].versions[
        versionDataOfScript - 1
      ].description = refInputDescription.current.value.trim();
      personalScripts[personalScripts.indexOf(foundIndexScript)].versions[
        versionDataOfScript - 1
      ].buttons[0].script = refInputScript.current.value.trim();

      localStorage.setItem("personalScripts", JSON.stringify(personalScripts));
      setPersonalScripts(personalScripts);

      refInputName.current.value = "";
      refInputDescription.current.value = "";
      refInputScript.current.value = "";
      setTextError("");
      setShowModal(false);
    } else if (whatIsScriptGroup === "general") {
      let generalScripts;

      if (localStorage.getItem("scripts") !== null) {
        const scriptsFromLoacal = JSON.parse(localStorage.getItem("scripts"));
        generalScripts = [...scriptsFromLoacal];
      } else {
        generalScripts = [];
      }

      // write code here, change inputs in script
      let foundIndexScript = generalScripts.find(
        (obj) => obj.name === dataOfScript.name
      );
      generalScripts[generalScripts.indexOf(foundIndexScript)].name =
        refInputName.current.value.trim();
      generalScripts[generalScripts.indexOf(foundIndexScript)].versions[
        versionDataOfScript - 1
      ].description = refInputDescription.current.value.trim();
      generalScripts[generalScripts.indexOf(foundIndexScript)].versions[
        versionDataOfScript - 1
      ].buttons[0].script = refInputScript.current.value.trim();

      localStorage.setItem("scripts", JSON.stringify(generalScripts));
      setGeneralScripts(generalScripts);

      refInputName.current.value = "";
      refInputDescription.current.value = "";
      refInputScript.current.value = "";
      setTextError("");
      setShowModal(false);
    }
  };

  const refInputName = useRef(null);
  const refInputDescription = useRef(null);
  const refInputScript = useRef(null);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    setScriptOne(dataOfScript);
  }, [dataOfScript]);

  return (
    <div className={styles["content_add-script"]}>
      <p className={styles["title"]}>Изменить скрипт</p>
      <p className={styles["hint"]}>*** - обязательные поля</p>
      <p className={styles["hint"]} style={{ marginTop: 5, marginBottom: 10 }}>
        :;: - можно прописать в тексте для переноса на след. строку(только
        описание)
      </p>

      <div className={styles["inputs__add-script"]}>
        <textarea
          ref={refInputName}
          className={styles["input"]}
          type="text"
          placeholder="***Название скрипта"
          value={scriptOne.name}
          onChange={(e) => {
            let copyScriptOne = { ...scriptOne, name: e.target.value };
            setScriptOne(copyScriptOne);
          }}
        ></textarea>

        <textarea
          ref={refInputDescription}
          className={styles["input"]}
          type="text"
          placeholder="Описание скрипта"
          value={scriptOne.versions[versionDataOfScript - 1].description}
          onChange={(e) => {
            let copyScriptOne = { ...scriptOne };
            copyScriptOne.versions[versionDataOfScript - 1].description =
              e.target.value;
            setScriptOne(copyScriptOne);
          }}
        ></textarea>
        <textarea
          ref={refInputScript}
          className={styles["input"]}
          type="text"
          placeholder="***Скрипт"
          value={scriptOne.versions[versionDataOfScript - 1].buttons[0].script}
          onChange={(e) => {
            let copyScriptOne = { ...scriptOne };
            scriptOne.versions[versionDataOfScript - 1].buttons[0].script =
              e.target.value;
            setScriptOne(copyScriptOne);
          }}
        ></textarea>
        <p className={styles["text-error"]}>{textError}</p>
      </div>
      <div className={styles["buttons-add-script"]}>
        <Button onClick={() => addPersonalScript()}>Изменить</Button>
      </div>
    </div>
  );
}

export const ChangeScript = memo(InitialChangeScript);
