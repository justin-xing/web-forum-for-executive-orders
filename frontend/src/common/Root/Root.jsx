import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./Root.module.css";

const Root = () => {
  return (
    <div class={styles.wrapper}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Root;
