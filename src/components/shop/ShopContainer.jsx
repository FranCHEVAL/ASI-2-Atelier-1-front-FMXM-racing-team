import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ShopContainer = () => {
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user") !== null;
    console.log(loggedInUser);
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);

  if (!authenticated) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div>
        <p>Welcome to your Dashboard</p>
      </div>
    );
  }
};

export default ShopContainer;