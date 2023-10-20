import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";

import { useNavigate } from "react-router-dom";

const Logout = () => {

  // let nevigate = useNavigate();
  const history = useNavigate();

    const handleLogout = () => {
    console.log("Clicked on Logout");
    localStorage.removeItem("token");
    // nevigate("/login");
    history ('/login')
                   toast("Logout Sucessfully", {
                    type: "success",
                    autoClose: 1000,
                    position: "top-right",
                   draggable: true,
                    });
  };
 useEffect(() =>{
   handleLogout()
 })

  return <>

  </>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);