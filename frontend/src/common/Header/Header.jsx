import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className="text-white flex justify-around items-center">
        <Link to="/">Executive Orders</Link>
        <div className="flex gap-4 hover:cursor-pointer">
          {user ? (
            <>
              <h1 className="hover:underline">{user.name}</h1>
              <h1 className="hover:underline" onClick={logout}>
                Log Out
              </h1>
            </>
          ) : (
            <>
              <Link className="hover:underline" to="/signup">
                Sign Up
              </Link>
              <Link className="hover:underline" to="/login">
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
