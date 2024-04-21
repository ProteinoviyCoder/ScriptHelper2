import styles from "./PageCod.module.scss";
import { Layout } from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { useMyContext } from "../../context/MyContext/MyContext";

function InitialPageCod() {
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
    form: `action="../~@replacingTheContentsThis_successful" method="POST"`,
    href: `href="#form-wrap"`,
    jquery: `<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js'></script>`,
    id: `id="form-wrap"`,
    scriptValid: `<script>$('.ss').on('input', function(e){this.value = this.value.replace(/[^a-zA-ZáéíñóúüÁÉÍÑÓÚÜ\\s.]/g, '');});$('.pp').on('input', function(e){this.value = '+' + this.value.replace(/[^0-9\\.]/g, '');});</script>`,
    scriptScroll: `<script>$('a').on('click', function(e) {e.preventDefault();$('html, body').animate({scrollTop: $('#form-wrap').offset().top}, 'slow');})</script>`,
    name: `required="required" name="name"`,
    phone: `required="required" name="phone"`,
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
            <h1 className={styles["h1"]}>COD</h1>
          </div>
          <div className={styles["page-content"]}>
            <p className={styles["title__page-content"]}>Форма</p>
            <div className={styles["core-text__page-content"]}>
              <p className={styles["part-text"]}>
                В теге form проверяем action и method
              </p>
              <p className={styles["part-text"]}>
                action="../~@replacingTheContentsThis_successful" <br />{" "}
                method="POST"
              </p>
              <p className={styles["part-text"]}>
                Кнопка в формах должна быть только тегом &lt;button&gt; и ничем
                другим! <br />В теге &lt;button&gt; проверяем атрибут
                type="submit"
              </p>
              <div className={styles["div-buttons"]}>
                <Button
                  onClick={(e) => {
                    copyText(textsForCopy.form, e.target.textContent);
                  }}
                >
                  Получить action/method
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
                src="../../../public/form.png"
                alt="#"
              />
              <img
                onClick={(e) => {
                  setShowImgFull(true);
                  setSrsImg(e.target.src);
                }}
                className={styles["img"]}
                src="../../../public/form2.png"
                alt="#"
              />
            </div>
          </div>
          <div className={styles["page-content"]}>
            <p className={styles["title__page-content"]}>Инпуты</p>
            <div className={styles["core-text__page-content"]}>
              <p className={styles["part-text"]}>
                Должно быть 2 тега &lt;input&gt; для имени и телефона:
                <br />
                <br />
                1. &lt;input&gt; для имени должен содержать атрибуты
                required="required" и name="name"
                <br />
                <br />
                2. &lt;input&gt; для телефона должен содержать атрбуты
                required="required" и name="phone"
              </p>

              <p className={styles["part-text"]}>
                Также должна быть базовая валидация:
                <br /> <br />
                - в &lt;input name="name"&gt; должны вводиться только пробелы, а
                также буквы английского и языка гео
                <br /> <br />- в &lt;input name="phone"&gt; должны вводиться
                только цифры и символ +
              </p>

              <p className={styles["part-text"]}>
                Подключаем script для валидации:
                <br /> <br />- в теге &lt;head&gt; подключаем jQuery cdn:{" "}
                {`(можно получить по кнопке)`}
                <br />- к &lt;input name=name&gt; добавляем класс class="ss"{" "}
                <br />- к &lt;input name=phone&gt; добавляем класс class="pp"
                <br />
                <br />- перед коцом тега &lt;body&gt; вставляем script{" "}
                {`(можно получить по кнопке)`}
              </p>

              <p>
                В скрипте есть регулярные выражения, которое мы меняем в
                зависимости от гео. <br /> <br />
                Например на Испанию: <br />
                {`[^a-zA-ZáéíñóúüÁÉÍÑÓÚÜ\\s.]`} <br /> <br />
                Выражения можно запросить например у ChatGPT, часть можно найти
                по ссылке: <br />
                <a
                  className={styles["link-text"]}
                  href="https://ru.stackoverflow.com/questions/440125/%D0%9A%D0%B0%D0%BA-%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C-%D0%B2%D1%81%D0%B5-%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D1%8B-%D0%BD%D0%B5%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BE%D0%B3%D0%BE-%D1%8F%D0%B7%D1%8B%D0%BA%D0%B0-%D0%B2-%D1%80%D0%B5%D0%B3%D1%83%D0%BB%D1%8F%D1%80%D0%BD%D0%BE%D0%BC-%D0%B2%D1%8B%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B8-%D0%95%D1%81%D1%82%D1%8C-%D0%BB%D0%B8-%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%D1%8B%D0%B5"
                >
                  stackoverflow
                </a>
              </p>
              <div className={styles["div-buttons"]}>
                <Button
                  onClick={(e) => {
                    copyText(textsForCopy.jquery, e.target.textContent);
                  }}
                >
                  Получить jQuery
                </Button>
                <Button
                  onClick={(e) => {
                    copyText(textsForCopy.name, e.target.textContent);
                  }}
                >
                  Получить Name
                </Button>
                <Button
                  onClick={(e) => {
                    copyText(textsForCopy.phone, e.target.textContent);
                  }}
                >
                  Получить Phone
                </Button>
                <Button
                  onClick={(e) => {
                    copyText(textsForCopy.scriptValid, e.target.textContent);
                  }}
                >
                  Получить Script
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
                src="../../../public/inputs.png"
                alt="#"
              />
            </div>
          </div>
          <div className={styles["page-content"]}>
            <p className={styles["title__page-content"]}>Ссылки</p>
            <div className={styles["core-text__page-content"]}>
              <p className={styles["part-text"]}>
                Тег &lt;a&gt; не должен содержать никаких ссылок! <br />
                Тег &lt;a&gt; не должен содержать атрибут target="_blank",
                таргеты убираем
              </p>
              <p className={styles["part-text"]}>
                При работе с проклами на COD, все ссылки и кнопки должны вести к
                самой последней форме на прокле.
              </p>
              <p className={styles["part-text"]}>
                Если такой скрол уже настроен - супер! Если нет, обычно
                вставляем script перед концом тега &lt;body&gt;:
                <br />
                <br />
                <br />
                - Последнему тегу &lt;form&gt; присваиваем id="form-wrap" (если
                у формы уже есть id, можно перед формой создать тег span с
                атрибутом id="form-wrap")
                <br />
                <br />- в теге &lt;head&gt; подключаем jQuery cdn: (можно
                получить по кнопке)
                <br />
                <br />- всем тегам &lt;a&gt; прописываем атрибут
                href="#form-wrap"
                <br />
                <br />- перед концом тега &lt;body&gt; вставляем script: (можно
                получить по кнопке)
              </p>
              <p className={styles["part-text"]}>
                Где #form-wrap это место куда будет скролить страница.
                Соответсвтенно изменяя это значение в скрипте, мы можем
                подстроиться под уже существующий id у тега &lt;form&gt; или
                придумать свой (в тегах &lt;a&gt;, атрибут href нужно будет
                изменить на соответствующее значение)
              </p>
              <div className={styles["div-buttons"]}>
                <Button
                  onClick={(e) => {
                    copyText(textsForCopy.jquery, e.target.textContent);
                  }}
                >
                  Получить jQuery
                </Button>
                <Button
                  onClick={(e) => {
                    copyText(textsForCopy.href, e.target.textContent);
                  }}
                >
                  Получить href
                </Button>
                <Button
                  onClick={(e) => {
                    copyText(textsForCopy.id, e.target.textContent);
                  }}
                >
                  Получить id
                </Button>
                <Button
                  onClick={(e) => {
                    copyText(textsForCopy.scriptScroll, e.target.textContent);
                  }}
                >
                  Получить Script
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
                src="../../../public/links1.png"
                alt="#"
              />
              <img
                onClick={(e) => {
                  setShowImgFull(true);
                  setSrsImg(e.target.src);
                }}
                className={styles["img"]}
                src="../../../public/links2.png"
                alt="#"
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export const PageCod = memo(InitialPageCod);
