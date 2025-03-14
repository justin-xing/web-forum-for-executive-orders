import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  // REPLACE: request query for unique presidents
  const PRESIDENTS = ["Trump", "Clinton", "Obama"];

  const presidentButtons = PRESIDENTS.map((pres) => (
    <Link to={`/president/${pres}`}>{pres}</Link>
  ));
  return <main class={styles.homePage}>{presidentButtons}</main>;
};

export default HomePage;
