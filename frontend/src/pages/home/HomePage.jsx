import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HomePage = () => {
  // REPLACE: request query for unique presidents

  const [presidents, setPresidents] = useState([]);

  useEffect(() => {
    const fetchPresidents = async () => {
      const res = await fetch(`/api/president`);
      const data = await res.json();
      setPresidents(data.presidents);
    };
    fetchPresidents();
  }, []);

  const presidentButtons = presidents.map((pres, i) => (
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
