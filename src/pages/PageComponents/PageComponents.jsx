import styles from "./PageComponents.module.scss";
import { Layout } from "../../components/Layout/Layout";
import { Button } from "../../components/Button/Button";
import { memo, useEffect, useState } from "react";
import { componentsForCopy } from "../../data/ObjectComponent";
import { useMyContext } from "../../context/MyContext/MyContext";
import { ExampleForms } from "../../data/ExampleForms/ExampleForms";
import { Slider1 } from "../../components/Slider1/Slider1";

function InitialPageComponents() {
  const [count, setCount] = useState(0);
  const animText = (element) => {
    element.target.style.display = "flex";
    element.target.style.pointerEvents = "none";
    const text = element.target.textContent.split("");

    element.target.textContent = "";

    let countIndex = 1;

    const pizda = setInterval(() => {
      if (countIndex < text.length + 1) {
        const data = text[text.length - 1 - text.length + countIndex];

        let p;

        if (data === " ") {
          p = `<p class="anim-open2">&nbsp;</p>`;
        } else {
          p = `<p class="anim-open2">${data}</p>`;
        }

        countIndex = countIndex + 1;

        element.target.insertAdjacentHTML("beforeend", p);
      } else {
        clearInterval(pizda);
        const nodes = element.target.childNodes;

        let word = "";

        for (let i of nodes) {
          if (i.textContent === "&nbsp;") {
            word = word + " ";
          } else {
            word = word + i.textContent;
          }
        }

        element.target.innerHTML = "";

        element.target.style.display = "";
        element.target.style.pointerEvents = "";
        element.target.textContent = word;
      }
    }, 50);
  };

  const { showAlert, setShowAlert } = useMyContext();
  const [namesComponents, setNamesComponents] = useState([
    {
      name: "forms",
      status: true,
    },
    {
      name: "sliders",
      status: false,
    },
  ]);

  const changeActiveComponent = (e) => {
    const copyNamesComponents = [...namesComponents];

    copyNamesComponents.forEach((item) => {
      item.status = false;

      if (item.name.toLowerCase() === e.target.textContent.toLowerCase()) {
        item.status = true;
      }
    });

    setNamesComponents(copyNamesComponents);
  };

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

  const HTMLcomponents = () => {
    return namesComponents.map((elem) => {
      if (elem.name === "forms" && elem.status) {
        return (
          <div key={elem.name} className={styles["div-components-forms"]}>
            <div className={styles["div-components-forms-item"]}>
              {ExampleForms.form3()}
              <Button
                onClick={(e) => {
                  copyText(componentsForCopy.forms.form3, e.target.textContent);
                }}
              >
                Получить Form
              </Button>
            </div>

            <div className={styles["div-components-forms-item"]}>
              {ExampleForms.form1()}
              <Button
                onClick={(e) => {
                  copyText(componentsForCopy.forms.form1, e.target.textContent);
                }}
              >
                Получить Form
              </Button>
            </div>

            <div className={styles["div-components-forms-item"]}>
              {ExampleForms.form2()}
              <Button
                onClick={(e) => {
                  copyText(componentsForCopy.forms.form2, e.target.textContent);
                }}
              >
                Получить Form
              </Button>
            </div>
          </div>
        );
      } else if (elem.name === "sliders" && elem.status) {
        return (
          <div key={elem.name} className={styles["div-components-sliders"]}>
            <div className={styles["div-components-sliders-item"]}>
              <Slider1></Slider1>
              <Button
                onClick={(e) => {
                  copyText(
                    componentsForCopy.forms.slider1,
                    e.target.textContent
                  );
                }}
              >
                Получить Slider
              </Button>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <Layout>
      <main className="anim-open2">
        <div className="container">
          <div className={styles["container-components"]}>
            <div className={styles["names-components"]}>
              {namesComponents.map((elem) => {
                return (
                  <div
                    key={elem.name}
                    onClick={(e) => {
                      changeActiveComponent(e);
                    }}
                    className={`${styles["name-component"]} ${
                      elem.status ? styles["name-component-active"] : ""
                    }`}
                  >
                    {elem.name}
                  </div>
                );
              })}
            </div>
            <div className={styles["content-components"]}>
              {HTMLcomponents()}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const PageComponents = memo(InitialPageComponents);
