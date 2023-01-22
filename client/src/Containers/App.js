import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { updateRedux } from "../redux/actions/POST/index.js";
import Swal from 'sweetalert2';

// Componentes
import Landing from "../Components/Landing/Landing.jsx";
import Home from "../Components/Home/Home.jsx";
import Promotions from "../Components/Promotions/Promotions.jsx";
import About from "../Components/About/About.jsx";
import Login from "../Components/Login/Login.jsx";
import Signin from "../Components/Signin/Signin.jsx";
import Inprocess from "../Components/Inprocess/Inprocess.jsx";
import Stripe from "../Components/Stripe/Stripe";
import MatchDetails from "../Components/MatchDetails/MatchDetails.jsx";
import Cart from "../Components/Cart/Cart.jsx";
import UserActivity from "../Components/userActivity/userActivity.jsx";
import MyAccount from "../Components/MyAccount/MyAccount.jsx";
import WithdrawTable from "../Components/WithdrawaTable/WithdrawaTable.jsx";
import BetsDepositUser from "../Components/userActivity/BetsDepositUsers.jsx";

// Dashboard
import Dashboard from "../Components/Dashboard/Dashboard";
import UsersDashboard from "../Components/Dashboard/UsersDashboard/UsersDashboard.jsx";
import BetsDashboard from "../Components/Dashboard/BetsDashboard/BetsDashboard.jsx";
import MatchesDashboard from "../Components/Dashboard/MatchesDashboard/MatchesDashboard.jsx";
import DepositsDashboard from "../Components/Dashboard/DepositsDashboard/DepositsDashboard.jsx";
import ReviewsDashboard from "../Components/Dashboard/ReviewsDashboard/ReviewsDashboard.jsx";

import "./App.css";

function App() {
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch()

  useEffect(()=>{
    const loged = JSON.parse(window.localStorage.getItem('user'))
    if(loged){dispatch(updateRedux(loged)) }
  })  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* CLIENT PAGE */}
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/withdraw" element={<WithdrawTable />} />
          <Route path="/details/:id" element={<MatchDetails />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/tutorial" element={<Inprocess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/admin" element={<Inprocess />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/payment" element={<Stripe />} />
          <Route path="/useractivities" element={<BetsDepositUser />} />

          {/* DASHBOARD */}
          <Route path="/dashboard" element={ <Dashboard/> }/>
          <Route path="/dashboard/users" element={ <UsersDashboard/> }/>
          <Route path="/dashboard/bets" element={ <BetsDashboard/> }/>
          <Route path="/dashboard/matches" element={ <MatchesDashboard/> }/>
          <Route path="/dashboard/deposits" element={ <DepositsDashboard/> }/>
          <Route path="/dashboard/config" element={ <DepositsDashboard/> }/>
          <Route path="/dashboard/reseñas" element={ <ReviewsDashboard/> }/>
        </Routes>
      </BrowserRouter>
      {error.length === 0
        ? null
        : Swal.fire({
            title: "Error!",
            text: "Inténtalo nuevamente",
            icon: "error",
            confirmButtonText: "OK",
          }).then(function () {
            window.location = "/home";
          })}
    </div>
  );
}

export default App;