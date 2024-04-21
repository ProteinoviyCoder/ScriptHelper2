import styles from "./PageSetting.module.scss";
import { memo, useEffect, useRef, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { useMyContext } from "../../context/MyContext/MyContext";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

function InitialPageSetting() {
  const [isNotificationAllowed, setIsNotificationAllowed] = useState(false);
  const [isFirstRender, setIsFirsrRender] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [errorWindow, setErrorWindow] = useState(false);

  const btnAllowed = () => {
    if (isNotificationAllowed) {
      return (
        <button
          onClick={() => setIsNotificationAllowed(false)}
          className={styles["btn-false"]}
        >
          OFF
        </button>
      );
    } else if (!isNotificationAllowed) {
      return (
        <button
          onClick={() => {
            setIsNotificationAllowed(true);
          }}
          className={styles["btn-true"]}
        >
          ON
        </button>
      );
    }
  };

  useEffect(() => {
    if (isFirstRender) {
      setIsFirsrRender(false);
      return;
    }

    localStorage.setItem("notif", JSON.stringify(isNotificationAllowed));
  }, [isNotificationAllowed]);

  useEffect(() => {
    const notif = JSON.parse(localStorage.getItem("notif"));
    if (notif !== null) {
      setIsNotificationAllowed(notif);
    }
  }, []);

  const { timeNotif, setTimeNotif, setIsFirstRenderContext } = useMyContext();

  const navigate = useNavigate();

  const deleteTime = (data) => {
    const copyTimeNotif = [...timeNotif];
    copyTimeNotif.splice(copyTimeNotif.indexOf(data), 1);

    setTimeNotif(copyTimeNotif);
    localStorage.setItem("timeNotif", JSON.stringify(copyTimeNotif));
    navigate("/ScriptHelper2");
    window.location.reload();
  };

  const openModalWindow = () => {
    setShowModal(true);
  };

  const addTime = () => {
    const copyTimeNotif = [...timeNotif];

    const time =
      refSelectHours.current.value.trim() +
      ":" +
      refSelectMinutes.current.value.trim();

    if (copyTimeNotif.includes(time)) {
      setErrorWindow(true);
      return;
    }

    copyTimeNotif.push(time);
    localStorage.setItem("timeNotif", JSON.stringify(copyTimeNotif));
    setTimeNotif(copyTimeNotif);
    setShowModal(false);
    navigate("/ScriptHelper2");
    window.location.reload();
  };

  const refSelectHours = useRef(null);
  const refSelectMinutes = useRef(null);

  const contentMidleModlaWindow = (
    <div className={styles["content-modal-window"]}>
      <h2 className={styles["h2"]}>Добавить время</h2>
      <div className={styles["selects"]}>
        <select
          ref={refSelectHours}
          className={styles["select"]}
          name="sda"
          id="as"
        >
          <option value="00">00</option>
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
        </select>
        <select
          ref={refSelectMinutes}
          className={styles["select"]}
          name="sda"
          id="as"
        >
          <option value="00">00</option>
          <option value="05">05</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
          <option value="35">35</option>
          <option value="40">40</option>
          <option value="45">45</option>
          <option value="50">50</option>
          <option value="55">55</option>
          <option value="59">59</option>
        </select>
      </div>
      <p
        className={`${styles["error-text"]} ${
          errorWindow ? "" : styles["none"]
        }`}
      >
        На это время уведомление ужен настроено
      </p>
      <div className={styles["buttons"]}>
        <Button
          onClick={() => {
            addTime();
          }}
        >
          Добавить
        </Button>
      </div>
    </div>
  );

  return (
    <Layout
      showModal={showModal}
      setShowModal={setShowModal}
      contentMidleModlaWindow={contentMidleModlaWindow}
    >
      <main className="anim-open">
        <div className="container">
          <div className={styles["container-setting"]}>
            <h1 className={styles["h1"]}>Настройки</h1>
            <div className={styles["setting"]}>
              <div className={styles["div-name"]}>
                <p>Уведомления</p>
                <input
                  className={styles["checkbox"]}
                  type="checkbox"
                  checked={isNotificationAllowed ? true : false}
                  onChange={() =>
                    setIsNotificationAllowed(!isNotificationAllowed)
                  }
                />
              </div>
              {btnAllowed()}
            </div>
            <div className={styles["div-times"]}>
              {timeNotif === null
                ? ""
                : timeNotif.map((elem) => {
                    return (
                      <div className={styles["div__div-times"]} key={elem}>
                        {elem}
                        <button
                          onClick={() => {
                            deleteTime(elem);
                          }}
                          className={styles["btn__div-times"]}
                        >
                          x
                        </button>
                      </div>
                    );
                  })}
            </div>
            <div
              className={`${styles["div-buttons"]} ${
                isNotificationAllowed ? "" : styles["none"]
              }`}
            >
              <Button
                onClick={() => {
                  openModalWindow();
                }}
              >
                Добавить
              </Button>
            </div>
          </div>
        </div>
      </main>
      <div className={`${styles["back-img"]} anim-open`}>
        <img src="/ScriptHelper2/setting.gif" alt="#" />
      </div>
    </Layout>
  );
}

export const PageSetting = memo(InitialPageSetting);
