import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../images/som.png";

function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark py-3"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <div className="container-fluid d-flex justify-content-between mx-3 align-items-center">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand me-4 d-flex align-items-center" to="/">
            <span style={{ fontWeight: "600", fontSize: "1.2rem" }}>
              Anytime
            </span>
            <img
              className="mx-2"
              src={logo}
              alt="Logo"
              style={{ width: 25, height: 25 }}
            />
            <span style={{ fontWeight: "600", fontSize: "1.2rem" }}>Blog</span>
          </Link>

          <ul className="navbar-nav flex-row align-items-center gap-3 mx-4 mb-0">
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  Add Post
                </Link>
              </li>
            )}

            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {isLoggedIn && (
          <div className="d-flex align-items-center gap-2">
            <span className="text-light small">
              Logged as <strong>{user.username}</strong>
            </span>
            <button
              className="btn btn-outline-danger btn-sm px-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
