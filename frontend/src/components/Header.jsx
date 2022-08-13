import React from "react";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaInfoCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onClick = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="Link">
          <MdDashboard className="icon" />
          Dashboard
        </Link>
        <Link to="/profile" className="Link">
          <CgProfile />
          Profile
        </Link>
        <Link to="/about" className="Link">
          <FaInfoCircle />
          About
        </Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onClick}>
              <FaSignInAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignOutAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
