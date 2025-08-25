import React, { useContext } from "react";
import { UserContext } from "./UserProvider ";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default Profile;
