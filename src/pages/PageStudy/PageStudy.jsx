import styles from "./PageStudy.module.scss";
import { Layout } from "../../components/Layout/Layout";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";

function InitialPageStudy() {
  const [lessons, setLessons] = useState([
    { name: "GENERAL" },
    { name: "COD" },
    { name: "SS" },
    { name: "CRYPTO" },
  ]);

  const navigate = useNavigate();

  const goNavigate = (name) => {
    navigate(`/ScriptHelper2/${name.toLowerCase()}`);
  };

  return (
    <Layout>
      <main className="anim-open">
        <div className="container">
          <div className={styles["container-study"]}>
            <ul className={styles["study-list"]}>
              {lessons.map((elem) => {
                return (
                  <li
                    onClick={() => {
                      goNavigate(elem.name);
                    }}
                    key={elem.name}
                    className={styles["study-item"]}
                  >
                    <i className={styles["elem-anim"]}></i>
                    <p className={styles["name-study-item"]}>{elem.name}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const PageStudy = memo(InitialPageStudy);
