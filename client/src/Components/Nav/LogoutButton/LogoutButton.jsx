import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import './LogoutButton.css'

const LogoutButton = () => {
  
  const { logout } = useAuth0();

  const handleLogout = ()=>{
    logout({ returnTo: window.location.origin })
    window.localStorage.clear()
  }

  return (
    <button onClick={handleLogout} className='btn btn-primary btn-color'>
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
