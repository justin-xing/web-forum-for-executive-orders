import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
      form.reset();
      return;
    }
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "/";
  };

  const signup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const username = form.username.value;
    const location = form.location.value;
    const role = form.role.value;
    const password = form.password.value;
    const email = form.email.value;
    const gender = form.gender.value;
    const dateOfBirth = form.dateOfBirth.value;

    let res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        location,
        role,
        password,
        email,
        gender,
        dateOfBirth,
      }),
    });
    let data = await res.json();
    if (data.error) {
      alert(data.error);
      form.reset();
      return;
    }

    res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    data = await res.json();
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "/";
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
