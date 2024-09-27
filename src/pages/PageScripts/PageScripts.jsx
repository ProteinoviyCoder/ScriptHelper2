import styles from "./PageScripts.module.scss";
import { Layout } from "../../components/Layout/Layout";
import { Script } from "../../components/Script/Script";
import { Alert } from "../../components/Alert/Alert";
import { AddScript } from "../../components/AddScript/AddScript";
import { ChangeScript } from "../../components/ChangeScript/ChangeScript";
import { SideBar } from "../../components/SideBar/SideBar";
import { memo, useEffect, useRef, useState } from "react";

function InitialPageScripts() {
  const originalScripts = [
    {
      name: "Script на валидацию",
      versions: [
        {
          v: 1,
          description:
            "Скрипт на валидацию с JS (новый стандарт): \n . :;: \n Тегу <input> для имени, прописываем класс class='ss' \n :;: \n Тегу <input> для телефона, прописываем класс class='pp'",
          buttons: [
            {
              buttonText: "Получить Script",
              script:
                "<script>document.addEventListener('DOMContentLoaded', function () {const ssElements = document.querySelectorAll('.ss');const ppElements = document.querySelectorAll('.pp');/* Устанавливаем мин и макс длину номер, в рамках этого диапозона кнопка будет рабочей */ const minLengthNumber = 10;const maxlengthNumber = 12; /* код страны */ const countryCode = '+4047'; /* Валидация инпутов */ ssElements.forEach((el) => {el.addEventListener('input', () => {el.value = el.value.replace(/[^a-zA-ZáéíñóúüÁÉÍÑÓÚÜ\\s.]/g, '');});});ppElements.forEach((element) => {let isCodeAdded = false;let isFisrtInput = true;element.addEventListener('input', () => {let firstSymbol;if (isFisrtInput) {firstSymbol = element.value.replace(/[^0-9\\.]/g, '');}element.value = '+' + element.value.replace(/[^0-9\\.]/g, '');if (!isCodeAdded && element.value.length >= 1) {if (isFisrtInput) {element.value = countryCode + firstSymbol;isFisrtInput = false;} else {element.value = countryCode;}isCodeAdded = true; /* указываем длинну кода тсраны, надо чтобы было меньше длины кода, считая + */ } else if (element.value.length < countryCode.length) {element.value = '';isCodeAdded = false;isFisrtInput = true;}});}); /* Обрабатываем кнопки */ const submitButtons = document.querySelectorAll('button[type=`submit`]');submitButtons.forEach((btn) => {btn.style.opacity = '0.5';});submitButtons.forEach((button, index) => {const phoneInput = ppElements[index];button.disabled = true;phoneInput.addEventListener('input', () => {if (phoneInput.value.length >= minLengthNumber &&phoneInput.value.length <= maxlengthNumber) {button.disabled = false;button.style.opacity = '1';} else {button.disabled = true;button.style.opacity = '0.5';}});});});</script>",
            },
          ],
        },
        {
          v: 2,
          description:
            "Скрипт валидация на jQuery: \n . :;: \n Тегу <input> для имени, прописываем класс class='ss' \n :;: \n Тегу <input> для телефона, прописываем класс class='pp'",
          buttons: [
            {
              buttonText: "Получить Script",
              script:
                "<script>$('.ss').on('input', function(e){this.value = this.value.replace(/[^a-zA-ZáéíñóúüÁÉÍÑÓÚÜ\\s.]/g, '');});$('.pp').on('input', function(e){this.value = '+' + this.value.replace(/[^0-9\\.]/g, '');});</script>",
            },
            {
              buttonText: "Получить Jquery",
              script:
                "<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js'></script>",
            },
          ],
        },
        {
          v: 3,
          description:
            "Скрипт валидация на jQuery с авто-вводом кода телефона: \n . :;: \n Тегу <input> для имени, прописываем класс class='ss' \n :;: \n Тегу <input> для телефона, прописываем класс class='pp' \n . :;: \n Меняем в скрипте +90 на нужное значение",
          buttons: [
            {
              buttonText: "Получить Script",
              script:
                "<script>$('.ss').on('input', function (e) {this.value = this.value.replace(/[^a-zA-ZáéíñóúüÁÉÍÑÓÚÜ\\s.]/g, '');});$(function () {$('.pp').one('focus', function () {$(this).val('+90');});});$('.pp').on('input', function (e) {this.value = '+' + this.value.replace(/[^0-9\\.]/g, '');});</script>",
            },
            {
              buttonText: "Получить Jquery",
              script:
                "<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js'></script>",
            },
          ],
        },
      ],
      favorite: false,
    },

    {
      name: "Script на скрол",
      versions: [
        {
          v: 1,
          description: `Скрипт на скролл с JS (новый стандарт): \n . :;: \n 
          Константу myHref нужно поменять в соответствии с id у последнего тега <form>.\n . :;: \n 
          Для скролла необходимо обернуть нужный элемент в тег <a> или задать нужному элементу класс .my-scroll.\n . :;: \n \n . :;: \n 
          Всем элементам с классом .my-scroll присваивается стиль курсор-поинтер. Если нужно, уберите из скрипта строку - link.style.cursor = "pointer";\n . :;: \n 
          Всем тегам <a> присваивается значение href, указанное в константе myHref. Если это мешает, удалите из скрипта строку - link.href = \`#\${myHref}\`;\n . :;: \n 
          Если нужно отрегулировать высоту отступа от нижней границы формы до нижней границы видимого окна пользователя, вы можете поменять число в константе scrollToPosition (по умолчанию стоит число 60)`,
          buttons: [
            {
              buttonText: "Получить Script",
              script:
                "<script>document.addEventListener('DOMContentLoaded', function () {const myHref = 'form-wrap';const lastForm = document.querySelector(`#${myHref}`);const allLinks = document.querySelectorAll('a');const elemsForScroll = document.querySelectorAll('.my-scroll');const stylesForBehavior = `<style>html { scroll-behavior: smooth; }</style>`;document.body.insertAdjacentHTML('beforeend', stylesForBehavior);[...allLinks, ...elemsForScroll]?.forEach((link) => {if (link.tagName === 'A' || link.hasAttribute('href')) {link.href = `#${myHref}`;}if (link.tagName !== 'A') {link.style.cursor = 'pointer';}link.addEventListener('click', function (e) {e.preventDefault();const targetPosition =lastForm.getBoundingClientRect().top + window.scrollY;const windowHeight = window.innerHeight;const targetHeight = lastForm.offsetHeight;const scrollToPosition =targetPosition - windowHeight + targetHeight + 60;window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });});});});</script>",
            },
          ],
        },
        {
          v: 2,
          description:
            "Скрипт на скролл с jQuery: \n . :;: \n Последнему тегу <form> прописываем id='form-wrap' \n :;: \n Всем тегам <a> прописываем href='#form-wrap'",
          buttons: [
            {
              buttonText: "Получить Script",
              script:
                "<script>$('a').on('click', function(e) {e.preventDefault();$('html, body').animate({scrollTop: $('#form-wrap').offset().top}, 'slow');})</script>",
            },
            {
              buttonText: "Получить Jquery",
              script:
                "<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js'></script>",
            },
          ],
        },
        {
          v: 3,
          description: "Скрипт на скролл ванила JS:",
          buttons: [
            {
              buttonText: "Получить Script",
              script:
                "<script>document.querySelectorAll('a[href^=`#`]').forEach(function(link) {link.addEventListener('click', function(e) {e.preventDefault();var href = this.getAttribute('href');var target = document.querySelector(href);var offsetTop = target.offsetTop;console.log(offsetTop);window.scrollTo({top: offsetTop,behavior: 'smooth'});});});</script>",
            },
          ],
        },
        {
          v: 4,
          description: "Скрипт на скролл ванила JS v2.0:",
          buttons: [
            {
              buttonText: "Получить Script",
              script:
                "<script>document.addEventListener('DOMContentLoaded', function () {document.querySelectorAll('a').forEach((item) => {const href = item.getAttribute('href');if (href && href.startsWith('#') && !!href.replace('#', '')) {const elementId = href.replace('#', '');item.addEventListener('click', (event) => {event.preventDefault();document.querySelector(`#${elementId}`).scrollIntoView({behavior: 'smooth',});});}});});</script>",
            },
          ],
        },
      ],
      favorite: false,
    },
    {
      name: "Script на дату",
      versions: [
        {
          v: 1,
          description:
            "Скрипт ванила JS на текущую дату, в формате '24.03.2024': \n . :;: \n Внутрь всех элементов с классом 'date-now' будет вписана текущая дата в формате '24.03.2024'",
          buttons: [
            {
              buttonText: "Получить Script",
              script:
                "<script> function formatDate(date) { const day = date.getDate().toString().padStart(2, '0'); const month = (date.getMonth() + 1).toString().padStart(2, '0'); const year = date.getFullYear().toString();  return `${day}.${month}.${year}`;}  const currentDate = new Date();  const elements = document.querySelectorAll('.date-now'); elements.forEach((element) => { element.textContent = formatDate(currentDate); }); </script>",
            },
          ],
        },
        {
          v: 2,
          description:
            "Скрипт ванила JS на текущую дату, в формате 'January 22, 2024': \n . :;: \n Внутрь всех элементов с классом 'date-now' будет вписана текущая дата в формате 'January 22, 2024'",
          buttons: [
            {
              buttonText: "Получить Script",
              script:
                "<script> function formatDate(date) { const months = ['January','February','March', 'April','May','June','July','August','September','October','November','December',];const month = months[date.getMonth()];const day = date.getDate();const year = date.getFullYear();return `${month} ${day}, ${year}`;} const currentDate = new Date(); const dateElements = document.querySelectorAll('.date-now');dateElements.forEach(function (element) {element.textContent = formatDate(currentDate);});</script>",
            },
          ],
        },
        {
          v: 3,
          description:
            "Скрипт ванила JS на текущую и предыдущие даты, в формате '24.03.2024': \n . :;: \n Внутрь всех элементов с соответствующим классом будет вставлена соответствующая дата в формате '24.03.2024' \n . :;: \n 'date-0' - текущая дата \n :;: \n 'date-1' - вчерашняя дата \n :;: \n 'date-2' - позавчерашняя дата \n :;: \n 'date-3' - поза-позавчерашняя дата",
          buttons: [
            {
              buttonText: "Получить Script",
              script:
                "<script> function formatDate(date) { let day = date.getDate(); let month = date.getMonth() + 1; let year = date.getFullYear(); if (day < 10) { day = '0' + day;}if (month < 10) {month = '0' + month;}return day + '.' + month + '.' + year;}let today = new Date();let yesterday = new Date(today);yesterday.setDate(today.getDate() - 1);let dayBeforeYesterday = new Date(today);dayBeforeYesterday.setDate(today.getDate() - 2);let twoDaysBeforeYesterday = new Date(today);twoDaysBeforeYesterday.setDate(today.getDate() - 3);let formattedToday = formatDate(today);let formattedYesterday = formatDate(yesterday);let formattedDayBeforeYesterday = formatDate(dayBeforeYesterday);let formattedTwoDaysBeforeYesterday = formatDate(twoDaysBeforeYesterday);let date0Elements = document.getElementsByClassName('date-0');for (let i = 0; i < date0Elements.length; i++) {date0Elements[i].innerText = formattedToday;}let date1Elements = document.getElementsByClassName('date-1');for (let i = 0; i < date1Elements.length; i++) {date1Elements[i].innerText = formattedYesterday;}let date2Elements = document.getElementsByClassName('date-2');for (let i = 0; i < date2Elements.length; i++) {date2Elements[i].innerText = formattedDayBeforeYesterday;}let date3Elements = document.getElementsByClassName('date-3');for (let i = 0; i < date3Elements.length; i++) {date3Elements[i].innerText = formattedTwoDaysBeforeYesterday;}</script>",
            },
          ],
        },
      ],
      favorite: false,
    },
    {
      name: "Script на таймер",
      versions: [
        {
          v: 1,
          description:
            "Скрипт для таймера на 60 минут, всем тегам с классом 'my-timer-now'",
          buttons: [
            {
              buttonText: "Получить Script",
              script:
                "<script>function createTimer(element) {const startTime = Date.now();const endTime = startTime + 60 * 60 * 1000; function updateTimer() {const remainingTime = endTime - Date.now();const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);const seconds = Math.floor((remainingTime / 1000) % 60);const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;element.textContent = formattedTime;if (remainingTime <= 0) {clearInterval(timerInterval);element.textContent = '00:00';}}const timerInterval = setInterval(updateTimer, 1000);updateTimer();}const timerElements = document.querySelectorAll('.my-timer-now');timerElements.forEach((element) => {createTimer(element);});</script>",
            },
          ],
        },
      ],
      favorite: false,
    },
    {
      name: "Font-awesome CDN:",
      versions: [
        {
          v: 1,
          description:
            "Просто вставить ссылку для подключения font-awesome по CDN в конец тега <head>",
          buttons: [
            {
              buttonText: "Получить font-awesome",
              script:
                "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'>",
            },
          ],
        },
      ],
      favorite: false,
    },
    {
      name: "Macros",
      versions: [
        {
          v: 1,
          description: "Макросы для CRM",
          buttons: [
            {
              buttonText: "Получить {{@Offer.name}}",
              script: "{{@Offer.name}}",
            },
            {
              buttonText: "Получить {{@Offer.productImage}}",
              script: "{{@Offer.productImage}}",
            },
            {
              buttonText: "Получить {{@Currency}}",
              script: "{{@Currency}}",
            },
            {
              buttonText: "Получить {{@Price.new}}",
              script: "{{@Price.new}}",
            },
            {
              buttonText: "Получить {{@Price.old}}",
              script: "{{@Price.old}}",
            },
            {
              buttonText: "Получить <?=$offerUrl?>",
              script: "<?=$offerUrl?>",
            },
            {
              buttonText: "Получить action и method",
              script:
                "action='../~@replacingTheContentsThis_successful' method='POST'",
            },
          ],
        },
        {
          v: 2,
          description: "Макросы для AIO",
          buttons: [
            {
              buttonText: "Получить {{link}}",
              script: "{{link}}",
            },
            {
              buttonText: "Получить {{form}}",
              script: "{{form}}",
            },
            {
              buttonText: "Получить {{aio}}",
              script: "{{aio}}",
            },
          ],
        },
      ],
      favorite: false,
    },
    {
      name: "Script IMask",
      versions: [
        {
          v: 1,
          description:
            "По кнопке получаем сразу и ссылку cdn и скрипт с ограничителем длины",
          buttons: [
            {
              buttonText: "Получить IMask",
              script: `<script src="https://unpkg.com/imask"></script>

              <script>var elements = document.querySelectorAll('input[name="phone"]');      elements.forEach(function(element) {         var maskOptions = {           mask: '+{33}000000000000'         };         var mask = IMask(element, maskOptions);      });</script>`,
            },
          ],
        },
      ],
      favorite: false,
    },
    {
      name: "Тег <video>",
      versions: [
        {
          v: 1,
          description:
            "По кнопке получаем готовый тег <video> \n :;: \n . \n :;: \n Меняем src в <video> и <source> \n :;: \n . \n :;: \n Меняем type в <source> если используем другой тип видео \n :;: \n . \n :;: \n Меняем poster в <video>, если нужна картинка-заставка на видео",
          buttons: [
            {
              buttonText: "Получить <video>",
              script: `<video
                        playsinline
                        preload="none"
                        alt="#"
                        loading="lazy"
                        src="./media/video.mp4"
                        >
                                      <source
                                        src="./media/video.mp4"
                                        type="video/mp4; codecs=vp8,vorbis"
                                      />
                        </video>`,
            },
          ],
        },
      ],
      favorite: false,
    },
    {
      name: "Скрипт для комментов",
      versions: [
        {
          v: 1,
          description:
            "Скрипт для замены, на проклы где ключевые слова под комментами подтягиваются по @...",
          buttons: [
            {
              buttonText: "Получить Script",
              script: `<script>
          var $data_now = "Adesso",
            $like = "Mi piace",
            $answer = "Rispondi",
            $yet = "Altro",
            $answered = "ha risposto",
            $hours = "o.";

          document.addEventListener("DOMContentLoaded", function () {
            function updateTextContent(selector, text) {
              document.querySelectorAll(selector).forEach(function (element) {
                element.innerText = text;
              });
            }

            function updateComponentReposy() {
              updateTextContent(".component_reposy b", $data_now);
              updateTextContent(".component_reposy nav:nth-child(2)", $like);
              updateTextContent(".component_reposy nav:nth-child(3)", $answer);
              updateTextContent(".component_reposy nav:nth-child(4)", $yet);
            }

            function updateComments() {
              var comments = document.querySelectorAll(
                "#comments_component .item"
              );
              var lastNonUserRequestTime = 1;

              comments.forEach(function (comment, index) {
                if (index < 5) {
                  comment.querySelector(".component_reposy b").innerText =
                    $data_now;
                } else {
                  var parentDiv = comment.closest("div");

                  if (
                    parentDiv &&
                    parentDiv.classList.contains("user_request")
                  ) {
                    comment.querySelector(".component_reposy b").innerText =
                      lastNonUserRequestTime + " " + $hours;
                  } else {
                    lastNonUserRequestTime = index - 4;
                    comment.querySelector(".component_reposy b").innerText =
                      lastNonUserRequestTime + " " + $hours;
                  }
                }
              });
            }

            updateComponentReposy();
            updateComments();
          });

          const links = document.querySelectorAll(
            ".component_reposy, .component_name"
          );
          const form = document.querySelector("#form");

          links.forEach((elem) => {
            elem.addEventListener("click", function () {
              form.scrollIntoView({ behavior: "smooth" });
            });
          });
        </script>`,
            },
          ],
        },
      ],
      favorite: false,
    },
  ];

  const [whatIsScriptGroup, setWhatIsScriptGroup] = useState("");
  const [dataOfScript, setDataOfScript] = useState("");
  const [versionDataOfScript, setVersionDataOfScript] = useState("");
  const [btnContentModalWindow, setBtnContentModalWindow] = useState("add");
  const [scripts, setScripts] = useState(originalScripts);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [alertData, setAlertData] = useState({
    isVisible: false,
    preText: "Скопировано",
    text: "",
  });
  const [layoutScripts, setLayoutScripts] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [personalScripts, setPersonalScripts] = useState("");
  const [isOpenPersonalScripts, setIsOpenPersonalScripts] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("scripts") !== null) {
      const newScripts = JSON.parse(localStorage.getItem("scripts"));
      setScripts(newScripts);
    }

    if (localStorage.getItem("layoutScripts") !== null) {
      const layout = JSON.parse(localStorage.getItem("layoutScripts"));
      if (layout === false) {
        setLayoutScripts(false);
      } else if (layout === true) {
        setLayoutScripts(true);
      }
    }

    if (localStorage.getItem("personalScripts") !== null) {
      const localPersonalScripts = JSON.parse(
        localStorage.getItem("personalScripts")
      );
      setPersonalScripts(localPersonalScripts);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    localStorage.setItem("scripts", JSON.stringify(scripts));
  }, [scripts]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }

    localStorage.setItem("personalScripts", JSON.stringify(personalScripts));
  }, [personalScripts]);

  const removeLocaslScripts = () => {
    localStorage.removeItem("scripts");
    setScripts(originalScripts);

    if (refBtn !== null && !refBtn.current.classList.contains("animResetBtn")) {
      refBtn.current.classList.add("animResetBtn");
      setTimeout(() => {
        if (refBtn.current !== null) {
          refBtn.current.classList.remove("animResetBtn");
        }
      }, 1000);
    }
  };

  const changeLayoutScripts = () => {
    if (!layoutScripts) {
      setLayoutScripts(true);
      localStorage.setItem("layoutScripts", "true");
    } else {
      setLayoutScripts(false);
      localStorage.setItem("layoutScripts", "false");
    }
  };

  const refBtn = useRef(null);

  const btnReset = (
    <button
      ref={refBtn}
      title="Обновить/сбросить стандартные скрипты"
      className={`${styles["btn-layout"]}`}
      style={{ padding: "7px" }}
      onClick={() => removeLocaslScripts()}
    >
      {<img src="/ScriptHelper2/reload.png"></img>}
    </button>
  );

  const footerSetings = {
    leftContent: (
      <div className={styles["buttons-layout"]}>
        <button
          title="Изменить layout скриптов"
          className={`${styles["btn-layout"]} ${
            layoutScripts
              ? styles["btn-layout-column"]
              : styles["btn-layout-row"]
          }`}
          onClick={() => {
            changeLayoutScripts();
          }}
        >
          <div>
            <i></i>
            <i></i>
            <i></i>
          </div>
        </button>
        {btnReset}
      </div>
    ),
    rightContent: (
      <div>
        <button
          title="Добавить свой скрипт"
          onClick={() => {
            setBtnContentModalWindow("add");
            setShowModal(true);
          }}
          className={`${styles["btn-layout"]}`}
          style={{ padding: "7px 13px" }}
        >
          +
        </button>
      </div>
    ),
  };

  const doListPersonalScripts = () => {
    let listPersonalScripts = (
      <ul
        className={`${styles["list-sripts"]} ${
          layoutScripts
            ? styles["layout-scripts-row"]
            : styles["layout-scripts-column"]
        }`}
      >
        {personalScripts !== ""
          ? personalScripts.map((elem) => {
              return (
                <li key={elem.name}>
                  <Script
                    scriptOne={elem}
                    setAlertData={setAlertData}
                    alertData={alertData}
                    setScripts={setPersonalScripts}
                    scripts={personalScripts}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setBtnContentModalWindow={setBtnContentModalWindow}
                    setDataOfScript={setDataOfScript}
                    setVersionDataOfScript={setVersionDataOfScript}
                    scriptGroup={"personal"}
                    setWhatIsScriptGroup={setWhatIsScriptGroup}
                  ></Script>
                </li>
              );
            })
          : ""}
      </ul>
    );

    return listPersonalScripts;
  };

  const refDivPersonalScripts = useRef(null);

  const showPersonalScripts = (e) => {
    if (!isOpenPersonalScripts) {
      refDivPersonalScripts.current.style.height = "auto";
      setIsOpenPersonalScripts(true);
    } else {
      refDivPersonalScripts.current.style.height = "70px";
      setIsOpenPersonalScripts(false);
    }
  };

  return (
    <Layout
      footerSetings={footerSetings}
      showModal={showModal}
      setShowModal={setShowModal}
      contentMidleModlaWindow={
        btnContentModalWindow === "add" ? (
          <AddScript
            setScripts={setPersonalScripts}
            setShowModal={setShowModal}
          ></AddScript>
        ) : (
          <ChangeScript
            setPersonalScripts={setPersonalScripts}
            setGeneralScripts={setScripts}
            setShowModal={setShowModal}
            dataOfScript={dataOfScript}
            versionDataOfScript={versionDataOfScript}
            whatIsScriptGroup={whatIsScriptGroup}
          ></ChangeScript>
        )
      }
    >
      <main className={`${styles["main"]} anim-open`}>
        <div className="container">
          <div className={styles["scripts-container"]}>
            <div
              ref={refDivPersonalScripts}
              className={`${styles["div-personal-scripts"]} `}
            >
              <div
                onClick={(e) => showPersonalScripts(e)}
                className={styles["title-personal-scripts"]}
              >
                <p>Мои скрипты</p>

                <i
                  className={isOpenPersonalScripts ? styles["open-arr"] : ""}
                ></i>
              </div>
              <div className={`${styles["personal-scripts"]}`}>
                {doListPersonalScripts()}
              </div>
              <div className={styles["div-btn-up"]}>
                <button
                  style={{ padding: "10px 17px" }}
                  onClick={() => {
                    setBtnContentModalWindow("add");
                    setShowModal(true);
                  }}
                  className={styles["btn-up"]}
                >
                  +
                </button>
                <button
                  onClick={() => showPersonalScripts()}
                  className={styles["btn-up"]}
                >
                  {<i></i>}
                </button>
              </div>
            </div>
            <ul
              className={`${styles["list-sripts"]} ${
                layoutScripts
                  ? styles["layout-scripts-row"]
                  : styles["layout-scripts-column"]
              }`}
            >
              {scripts.map((scriptOne) => {
                return (
                  <li key={scriptOne.name}>
                    <Script
                      scriptOne={scriptOne}
                      setAlertData={setAlertData}
                      alertData={alertData}
                      setScripts={setScripts}
                      scripts={scripts}
                      showModal={showModal}
                      setShowModal={setShowModal}
                      setBtnContentModalWindow={setBtnContentModalWindow}
                      setDataOfScript={setDataOfScript}
                      setVersionDataOfScript={setVersionDataOfScript}
                      scriptGroup={"general"}
                      setWhatIsScriptGroup={setWhatIsScriptGroup}
                    ></Script>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
      {alertData.isVisible ? <Alert alertText={alertData}></Alert> : ""}
    </Layout>
  );
}

export const PageScripts = memo(InitialPageScripts);
