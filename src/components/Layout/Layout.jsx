import styles from "./Layout.module.scss";
import { Header } from "../Header/Header.jsx";
import { Footer } from "../Footer/Footer";
import { ModalWindow } from "../ModalWindow/ModalWindow.jsx";
import { MyImg } from "../MyImg/MyImg.jsx";
import { Alert } from "../Alert/Alert.jsx";

export function Layout({
  children,
  footerSetings,
  showModal,
  setShowModal,
  contentMidleModlaWindow,
  srcImg,
  showImgFull,
  setShowImgFull,
}) {
  return (
    <div className={styles.wrapper}>
      <Header headerPosition={styles.header}></Header>
      {children}
      <Alert></Alert>
      <Footer
        footerStyle={styles.footer}
        footerSetings={footerSetings}
      ></Footer>
      <ModalWindow
        showModal={showModal}
        setShowModal={setShowModal}
        contentMidleModlaWindow={contentMidleModlaWindow}
      ></ModalWindow>
      <MyImg
        srcImg={srcImg}
        showImgFull={showImgFull}
        setShowImgFull={setShowImgFull}
      ></MyImg>
    </div>
  );
}
