import { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Button, Stack } from "@mui/material";

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const res = await fetch("/api/user/users");
      const data = await res.json();
      setUsers(data.users);
    };
    fetchAllUsers();
  }, []);

  const deleteUser = async (uid) => {
    await fetch(`/api/user/delete/${uid}`, {
      method: "DELETE",
    });
    const updatedUsers = users.filter((user) => user.uid !== uid);
    setUsers(updatedUsers);
  };

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
