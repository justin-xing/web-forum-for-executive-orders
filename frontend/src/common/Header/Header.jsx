import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="text-white flex justify-around items-center">
        <Link to="/">Executive Orders</Link>
        <div>Created by: Alex, Eugene, Justin, and Louis</div>
      </div>
    </header>
  );
};

export default Header;
