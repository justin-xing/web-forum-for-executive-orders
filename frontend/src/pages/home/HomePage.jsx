import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  // REPLACE: request query for unique presidents
  const PRESIDENTS = ["Trump", "Clinton", "Obama"];

  const presidentButtons = PRESIDENTS.map((pres, i) => (
    <Link key={i} to={`/president/${pres}`}>
      {pres}
    </Link>
  ));
  return (
    <main className={styles.homePage}>
      <div>{presidentButtons}</div>
      <div>
        <Link to="/delete">Delete</Link>
      </div>
    </main>
  );
};

export default HomePage;
