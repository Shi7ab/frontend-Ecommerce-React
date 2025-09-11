import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";

function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const getUsers = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/v1/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      console.error("❌ Error fetching users:", err);
    }
  };

  const handleDeleteClick = (user: any) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/v1/admin/users/${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u._id !== selectedUser._id));
      setShowModal(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  const updateUserRole = async (id: string, role: string) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/v1/admin/users/${id}`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map((u) => (u._id === id ? res.data : u)));
    } catch (err) {
      console.error("❌ Update error:", err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="users-container">
      <h2>Manage Users</h2>
      <ul className="users-list">
        {users.map((user: any) => (
          <li key={user._id} className="user-item">
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <div className="actions">
              <select
                value={user.role}
                onChange={(e) => updateUserRole(user._id, e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button
                className="delete-btn"
                onClick={() => handleDeleteClick(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* ✅ Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>⚠️ Confirm Delete</h3>
            <p>
              Are you sure you want to delete <b>{selectedUser?.name}</b>?
            </p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
