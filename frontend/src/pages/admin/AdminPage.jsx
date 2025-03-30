import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { Edit, Delete, Save, HighlightOff } from "@mui/icons-material";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedRole, setEditedRole] = useState(null);

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

  const startEditing = (user) => {
    setEditingUser(user.uid);
    setEditedRole(user.role);
  };

  const handleRoleChange = (value) => {
    setEditedRole(value);
  };

  const saveEdit = async () => {
    try {
      await fetch(`/api/user/update/${editingUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: editedRole }),
      });

      const updatedUsers = users.map((user) =>
        user.uid === editingUser ? { ...user, role: editedRole } : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
      setEditedRole(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setEditedRole(null);
  };

  return (
    <TableContainer
      component={Paper}
      className="max-w-6xl mx-auto mt-8 bg-blue-50 shadow-lg rounded-lg"
    >
      <Table className="table-fixed">
        <TableHead>
          <TableRow className="bg-blue-300">
            <TableCell>UID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Creation</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.uid}
              className="hover:bg-blue-100 transition-colors"
            >
              <TableCell>{user.uid}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.location}</TableCell>
              <TableCell>
                {editingUser === user.uid ? (
                  <Select
                    value={editedRole}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    size="small"
                  >
                    <MenuItem value="regular">regular</MenuItem>
                    <MenuItem value="admin">admin</MenuItem>
                  </Select>
                ) : (
                  user.role
                )}
              </TableCell>
              <TableCell>{user.account_creation_date}</TableCell>
              <TableCell>
                {editingUser === user.uid ? (
                  <>
                    <IconButton onClick={saveEdit}>
                      <Save className="text-blue-500" />
                    </IconButton>
                    <IconButton onClick={cancelEdit}>
                      <HighlightOff className="text-red-500" />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <IconButton onClick={() => startEditing(user)}>
                      <Edit className="text-blue-500" />
                    </IconButton>
                    <IconButton onClick={() => deleteUser(user.uid)}>
                      <Delete className="text-red-500" />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminPage;
