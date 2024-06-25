import styles from "./ExampleForms.module.scss";
import { Timer } from "../../components/Timer/Timer";

export const ExampleForms = {
  form1() {
    return (
      <>
        <form
          id="form-wrap1"
          action=""
          method="POST"
          className={styles["my-form-731"]}
        >
          <img
            className={styles["my-product-img-731"]}
            src="/ScriptHelper2/product.png"
            alt="#"
          />

          <p className={styles["my-title-form-731"]}>Un descuento -50%</p>
          <p className={styles["my-min-text-form-731"]}>tiempo restante</p>
          <div className={styles["my-timer-now"]}>
            <Timer></Timer>
          </div>
          <p className={styles["my-min-text-form-731"]}>
            reloj minutos segundos
          </p>
          <p className={styles["my-costs-731"]}>
            <span style={{ color: "rgb(32, 94, 229)" }}>39 EUR </span>
            <span
              style={{
                color: "rgb(118, 118, 118)",
                textDecoration: "line-through",
              }}
            >
              78 EUR
            </span>
          </p>
          <input
            className={styles["ss my-input-731"]}
            type="text"
            name="name"
            placeholder="Nombre"
            required
          />
          <input
            className={styles["pp my-input-731"]}
            type="tel"
            name="phone"
            placeholder="Teléfono"
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            type="submit"
            className={styles["my-btn-submit-form-731"]}
          >
            PEDIR
          </button>
          <div className={styles["my-info-form-731"]}>
            <div>
              <img
                src="data:image/png;base64,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"
                alt="#"
                className={styles["my-img-icon-form-731"]}
              />
            </div>
            <p className={styles["my-text-info-form-731"]}>
              No se preocupe, los correos cambian regularmente las máscaras y
              guantes. Entrega y pago sin contacto.
            </p>
          </div>
        </form>
      </>
    );
  },
  form2() {
    return (
      <>
        <form className={styles["my-form-732"]} action="" method="POST">
          <input
            name="first_name"
            type="text"
            placeholder="first_name"
            required=""
            className={styles["my-input-form-732"]}
          />
          <input
            name="last_name"
            type="text"
            placeholder="last_name"
            required=""
            className={styles["my-input-form-732"]}
          />
          <input
            name="phone"
            type="tel"
            placeholder="phone"
            required=""
            className={styles["my-input-form-732"]}
          />
          <input
            name="email"
            type="email"
            placeholder="email"
            required=""
            className={styles["my-input-form-732"]}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className={styles["my-button-form-732"]}
          >
            ORDER
          </button>
        </form>
      </>
    );
  },
  form3() {
    return (
      <>
        <form className={styles["my-form-733"]} action="" method="POST">
          <input
            name="first_name"
            type="text"
            placeholder="first_name"
            required=""
            className={styles["my-input-form-733"]}
          />
          <input
            name="last_name"
            type="text"
            placeholder="last_name"
            required=""
            className={styles["my-input-form-733"]}
          />
          <input
            name="phone"
            type="tel"
            placeholder="phone"
            required=""
            className={styles["my-input-form-733"]}
          />
          <input
            name="email"
            type="email"
            placeholder="email"
            required=""
            className={styles["my-input-form-733"]}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className={styles["my-button-form-733"]}
          >
            ORDER
          </button>
        </form>
      </>
    );
  },
  form4() {
    return (
      <>
        <form
          className={styles["my-form-1122"]}
          action="../~@replacingTheContentsThis_successful"
          method="POST"
        >
          <p className={styles["my-title-form-1122"]}>
            CHANGE YOUR LIFE TODAY!
          </p>
          <input
            name="first_name"
            type="text"
            placeholder="First_name"
            required=""
            className={styles["my-input-form-1122"]}
          />
          <input
            name="last_name"
            type="text"
            placeholder="Last_name"
            required=""
            className={styles["my-input-form-1122"]}
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            required=""
            className={styles["my-input-form-1122"]}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required=""
            className={styles["my-input-form-1122"]}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            type="submit"
            className={styles["my-button-form-1122"]}
          >
            ORDER
          </button>
        </form>
      </>
    );
  },
};
