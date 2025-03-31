import { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button, Stack } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAllUsers = async () => {
      const res = await fetch("/api/user/users");
      const data = await res.json();
      setUsers(data.users);
    };
    fetchAllUsers();
  }, []);

  const deleteUser = async (uid) => {
    await fetch(`/api/user/users/${uid}`, {
      method: "DELETE",
    });
    const updatedUsers = users.filter((user) => user.uid !== uid);
    setUsers(updatedUsers);
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        <div className="text-center">
          <div>Access Denied</div>
          <div className="text-xl italic text-gray-500">
            User is not an admin
          </div>
        </div>
      </div>
    );
  }

  return (
    <Stack
      spacing={2}
      sx={{ justifyContent: "center", alignItems: "center" }}
      className="pt-8"
    >
      {users.map((user, i) => (
        <Button
          variant="outlined"
          sx={{ border: 1, display: "flex", gap: 10 }}
          key={i}
        >
          <div>{user.uid}</div>
          <div>{user.name}</div>
          <div>{user.username}</div>
          <div>{user.location}</div>
          <div>{user.role}</div>
          <div>{user.account_creation_date}</div>
          <button
            className="hover:cursor-pointer"
            onClick={() => deleteUser(user.uid)}
          >
            <HighlightOffIcon />
          </button>
        </Button>
      ))}
    </Stack>
  );
};

export default AdminPage;
