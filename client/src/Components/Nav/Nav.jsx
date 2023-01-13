import React from "react";
import { Link } from "react-router-dom";
//import logo from "../../images";
import "./Nav.css";
import "../Home/Home";
import "../Promotions/Promotions";
import "../Tutorial/Tutorial";
import "../About/About";
import Signin from "../Signin/Signin";
import Login from "../Login/Login";
import Logo from "../../Assets/Images/Logo.png";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton.jsx";
import LogoutButton from "../LogoutButton/LogoutButton.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postLoginUserAuth0 } from "../../redux/actions/POST/index.js";
import MyAccountButton from "../MyAccountButton/MyAccountButton";
import Wallet from "./Wallet/Wallet";

export default function Nav() {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const userDates = useSelector((state) => state.userDates);

  useEffect(() => {
    dispatch(postLoginUserAuth0({ email: user?.email, name: user?.name }));
  }, [user]);

  return (
    <div className="header">
      <div className="contlogo">
        <Link to="/">
          <img className="logo" src={Logo} alt="logo_Adilbet" />
        </Link>
      </div>
      <div className="menu">
        <Link to="/home" className="nav-menu-link">
          <span>Home</span>
        </Link>

        <Link to="/promotions" className="nav-menu-link">
          <span>Promociones</span>
        </Link>

        <Link to="/tutorial" className="nav-menu-link">
          <span>Tutorial</span>
        </Link>

        <Link to="/about" className="nav-menu-link">
          <span>Nosotros</span>
        </Link>
      </div>
      <div className="sesion">
        <Wallet />
        {Object.entries(userDates).length === 0 ? (
          <LoginButton />
        ) : (
          <LogoutButton />
        )}
        {Object.entries(userDates).length === 0 ? null : <MyAccountButton />}
        {/* <Link to="/login">
            <span className="link_about ">Login</span>
          </Link> */}

        {/* <Link to="/signin">
            <span className="link_about ">Signin</span>
          </Link> */}
        <Link to="/cart">
          {Object.entries(userDates).length === 0 ? null : (
            <button>Carrito</button>
          )}
        </Link>
      </div>
    </div>
  );
}
