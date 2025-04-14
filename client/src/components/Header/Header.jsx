import React, { useEffect, useState } from "react";
import "./Header.css";
import Spinner from "../Spinner/Spinner";

const Header = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const json = await response.json();
        setUser(json); // Set the user data
        console.log("Fetched user data:", json);
      } catch (err) {
        setError(err.message || "Something went wrong");
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  // Show a spinner or error message if necessary
  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  if (!user) {
    return <Spinner />; // Show a loading spinner while the user data is being fetched
  }

  // Extract the first letter of the email for the avatar
  const avatarLetter = user.email ? user.email.charAt(0).toUpperCase() : "?";

  return (
    <header className="header">
      {/* Title Section */}
      <div className="header-title">
        Welcome, <span>{user.name}</span>
      </div>

      {/* Avatar Section */}
      <div className="header-avatar" title={user.email}>{avatarLetter}</div>
    </header>
  );
};

export default Header;
