import { memo, useState } from "react";
import styles from "./Header.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

function InitialHeader({ headerPosition }) {
  const [tabs, setTabs] = useState([
    {
      path: "scripts",
      name: () => {
        return "scripts";
      },
    },
    {
      path: "study",
      name: () => {
        return "study";
      },
    },
    {
      path: "setting",
      name: () => {
        return <img src="/setting.png" alt="#"></img>;
      },
    },
  ]);

  const navigate = useNavigate();
  const location = useLocation();

  function selectActiveTab(elem) {
    if (elem.path.toLowerCase() === "scripts") {
      navigate("/ScriptHelper2");
    } else {
      navigate(`/ScriptHelper2/${elem.path.toLowerCase()}`);
    }
  }

  function highlightTab(elem) {
    if (location.pathname === "/" && elem.path.toLowerCase() === "scripts") {
      return styles["nav-item-active"];
    } else if (location.pathname === `/${elem.path}`) {
      return styles["nav-item-active"];
    } else if (
      (location.pathname === "/cod" && elem.path.toLowerCase() === "study") ||
      (location.pathname === "/ss" && elem.path.toLowerCase() === "study") ||
      (location.pathname === "/crypto" &&
        elem.path.toLowerCase() === "study") ||
      (location.pathname === "/general" && elem.path.toLowerCase() === "study")
    ) {
      return styles["nav-item-active"];
    } else {
      return "";
    }
  }

  return (
    <header className={`${styles.header} ${headerPosition}`}>
      <div className="container">
        <nav className={styles.nav}>
          <ul className={styles["nav-list"]}>
            {tabs.map((elem) => {
              return (
                <li
                  onClick={() => selectActiveTab(elem)}
                  className={`${styles["nav-item"]} ${highlightTab(elem)}`}
                  key={elem.path}
                >
                  {elem.name()}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export const Header = memo(InitialHeader);
