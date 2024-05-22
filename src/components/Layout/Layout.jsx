import styles from "./Layout.module.scss";
import { Header } from "../Header/Header.jsx";
import { Footer } from "../Footer/Footer";
import { ModalWindow } from "../ModalWindow/ModalWindow.jsx";
import { MyImg } from "../MyImg/MyImg.jsx";
import { Alert } from "../Alert/Alert.jsx";
import { SideBar } from "../SideBar/SideBar.jsx";
import { MobileNavList } from "../MobileNavList/MobileNavList.jsx";
import { useState } from "react";

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
  const [switchVisibleMobileList, setSwitchVisibleMobileList] = useState(false);
  return (
    <div className={styles.wrapper}>
      <Header
        headerPosition={styles.header}
        setSwitchVisibleMobileList={setSwitchVisibleMobileList}
        switchVisibleMobileList={switchVisibleMobileList}
      ></Header>
      <SideBar></SideBar>
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
      <MobileNavList
        switchVisible={switchVisibleMobileList}
        setSwitchVisibleMobileList={setSwitchVisibleMobileList}
      ></MobileNavList>
    </div>
  );
}
