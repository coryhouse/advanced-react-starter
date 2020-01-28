// useState lets us declare state that changes over time
import React, { useState, useEffect } from "react";
import * as userApi from "./api/userApi";
import { Link, useHistory } from "react-router-dom";

function Users() {
  // Declare state because this info changes over time
  // and we want React to redraw the screen when this data changes.
  const [users, setUsers] = useState([]);
  const history = useHistory();

  // This runs code after render
  useEffect(() => {
    async function init() {
      try {
        const users = await userApi.getUsers();
        setUsers(users);
      } catch (error) {
        console.error(error);
        // TODO, in real app, show error page
      }
    }

    init();
    // Empty dependency array means this useEffect will only run once on initial load.
  }, []);

  async function deleteUser(userId) {
    try {
      await userApi.deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  function renderUser(user) {
    return (
      <tr key={user.id}>
        <td>
          {/* Wrapping deleteUser in arrow to avoid immediate execution */}
          <button
            aria-label={"Edit " + user.name}
            onClick={() => history.push("/manage-user/" + user.id)}
          >
            Edit
          </button>
          <button
            aria-label={"Delete " + user.name}
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </button>
        </td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
      </tr>
    );
  }

  return (
    <>
      {/* In JSX, you must comment using this style */}
      <h1>Users</h1>
      <Link to="/manage-user">Add User</Link>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        {/* using a point free style. JS automatically injects the user param */}
        <tbody>{users.map(renderUser)}</tbody>
      </table>
    </>
  );
}

export default Users;
