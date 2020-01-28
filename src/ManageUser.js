import React, { useState, useEffect } from "react";
import * as userApi from "./api/userApi";
import Input from "./Input";
import { useHistory, useRouteMatch } from "react-router-dom";

const emptyUser = {
  name: "",
  email: "",
  role: ""
};

function ManageUser() {
  const [user, setUser] = useState(emptyUser);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    async function getUser() {
      try {
        const _user = await userApi.getUser(match.params.id);
        setUser(_user);
      } catch (error) {
        console.error(error);
      }
    }
    if (match.params.id) getUser();
  }, [match.params.id]);

  function isValid() {
    const _errors = {};
    if (!user.name) _errors.name = "Name is required.";
    if (!user.email) _errors.email = "Email is required.";
    if (!user.role) _errors.role = "Role is required.";
    setErrors(_errors);
    // Is valid if errors object has no properties.
    return Object.keys(_errors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isValid()) return;
    try {
      await userApi.saveUser(user);
      history.push("/users");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Using computed property to reference a property via a variable
  function onChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  return (
    <>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          id="name"
          name="name"
          onChange={onChange}
          value={user.name}
          error={errors.name}
        />

        <Input
          label="Email"
          id="email"
          name="email"
          onChange={onChange}
          value={user.email}
          error={errors.email}
        />

        <Input
          label="Role"
          id="role"
          name="role"
          onChange={onChange}
          value={user.role}
          error={errors.role}
        />

        <input type="submit" value="Add User" />
      </form>
    </>
  );
}

export default ManageUser;
