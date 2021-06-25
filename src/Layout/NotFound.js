import React from "react";
import { useLocation, Link } from "react-router-dom";

function NotFound() {

  const { pathname } = useLocation();

  return (
    <div className="NotFound">
      <h1>Not Found</h1>
      <p>{pathname}</p>
      <Link to="/">
        <p>Return Home</p>
      </Link>
    </div>
  );
}

export default NotFound;
