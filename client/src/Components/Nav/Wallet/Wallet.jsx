import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Wallet.css";

export default function Wallet() {
  const walletStatus = useSelector((state) => state.userDates.wallet);
  const userName = useSelector((state) => state.userDates.userName);
  const [style, setStyle] = useState(true);

  function HandleStyle() {
    setStyle(!style);
  }

  return userName ? (
    <nav className="wallet">
      <div className="button-wallet" onClick={HandleStyle}>
        <p className="title-navbar-wallet">Billetera</p>
      </div>
      <div className={`${style ? "container-style" : ""}`}>
        <div className={`container-all-info`}>
          <div className="container-wallet-title">
            <p className="wallet-title">BILLETERA</p>
          </div>
          <nav className="wwalet">
            <span className="dates">Hola! {userName}</span>
            <span className="dates">Tu saldo actual es: $ {walletStatus}</span>
            <button className="button-cash"> RECARGAR BILLETERA </button>
          </nav>
        </div>
      </div>
    </nav>
  ) : null;
}
