import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Header } from "./components/layouts/Header";
import UserContext from "./context/userContext";
import Axios from "axios";
import React, {useState, useEffect} from "react";

import './App.css';

function App(){

  const[userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async() =>{
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token","");
        token="";
      }
      const tokenRes = await Axios.post("http://localhost:5000/user/tokenIsValid",null, { headers: {"x-auth-token": token}}
      );
      if(tokenRes.data){
        const userRes = await Axios.get("http://localhost:5000/user/", {headers:{"x-auth-token":token}});
        setUserData({
          token,
          user: userRes.data
        })
      }
    };

    checkLoggedIn();
  }, [])

  return (
    <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
        <Header />
        <div className="container">
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
        </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );

}

export default App;