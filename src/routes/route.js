import React from "react"
import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const Authmiddleware = props => {
  if (!localStorage.getItem("token")) {
    toast("Please Login First ", {
      type: "error",
    })

    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    )
  }
  ;
  <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
  return <React.Fragment>{props.children}</React.Fragment>
}

export default Authmiddleware
