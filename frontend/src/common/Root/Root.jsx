import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./Root.module.css";
import AuthProvider from "../../context/AuthContext";

const Root = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Root;
