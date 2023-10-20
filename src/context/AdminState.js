import React, { useState } from "react"
import AdminContext from "./adminContext"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const AdminState = props => {
  // port
  const host = process.env.REACT_APP_HOST || "http://localhost:8000"
  // error
  const [error, setError] = useState(null)

  // register / Signup  Api
  const Rigester = async data => {
    setError(null)
    // API Call
    console.log(data.email, "email")
    localStorage.setItem("email", data.email)
    let response = await axios
      .post(`${host}/api/auth/register`, data)
      .then(response => {
        console.log("Response", response)
        if (response.data.success) {
          //  localStorage.setItem("token", response.data.authtoken);
          localStorage.setItem("email", data.email)
          toast("Rigestered successfully Please Login!", {
            type: "success",
          })
        }
        return true
      })
      .catch(err => {
        if (err && err.response) setError(err.response.data.error)
        // console.log("response",response)
        console.log("error", err)
        toast(err.response.data.error, {
          type: "error",
        })
        return false
      })
    return response
  }

  //  Login  Api
  const Login = async data => {
    setError(null)
    // API Call
    let response = await axios
      .post(`${host}/api/auth/login`, data)
      .then(response => {
        //  console.log(".then",response);
        if (response.data.success) {
          // Save the auth token and redirect
          localStorage.setItem("token", response.data.authtoken)
          // to show email in navbar
          // localStorage.setItem("email", response.data.email);
          toast("Login Successfully", {
            type: "success",
            autoClose: 1000,
            theme: "light",
          })
          // end if
        }
        return true
      })
      .catch(err => {
        // if (err && err.response) setError(err.response.data.message);
        if (err && err.response) setError(err.response.data.error)
        // alert(err.response.data.error)
        toast(err.response.data.error, {
          type: "error",
          autoClose: 3000,
          theme: "light",
        })
        console.log("error", err)
        return false
      })
    return response
  }
  // verify-otp

  const Verification = async (otp, email) => {
    let response = await axios
      .post(`${host}/api/auth/verify-email`, otp, email)
      .then(response => {
        if (response.data.success) {
          toast("Email Verified Successfully ,Now You Can Login", {
            type: "success",
            autoClose: 3000,
            theme: "light",
          })
        }
        return true
      })
      .catch(err => {
        if (err && err.response) setError(err.response.data.Error)
        toast(err.response.data.Error && err.response.data, {
          type: "error",
          autoClose: 3000,
          theme: "light",
        })
        console.log("error", err)
        return false
      })
    return response
  }

  // state
  const [user, setUser] = useState("")
  // User Details Api
  const UserDetails = async () => {
    const response = await axios
      .post(
        `${host}/api/auth/userdetails`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(response => {
        console.log("response", response)
        // if (response.data.success){
        //   const UserDetails = response.data.user
        //   setUser(response.data.user)
        //   setUser(response.data.user.username)
        //   console.log("userdetails",response.data.user)
        //     // localStorage.setItem("email", response.data.user.email);
        //  }
        if (response.status === 200) {
          console.log("user", response.data.user)
          setUser(response.data.user)
        }
        return true
      })
      .catch(err => {
        if (err && err.response) setError(err.response.data.error)
        console.log("error", err)
        toast(err.response.data.error, {
          type: "error",
        })
        return false
      })
    return response
  }

  //all  invoice form api
  const [data, setdata] = useState([])
  // console.log(data,"dfer");
  const invoices_Data = async () => {
    let res = await axios.get(`${host}/api/invoice/getData`)
    console.log("res", res.data)
    setdata(res.data)
  }

  // data by id
  const [dataById, setDataById] = useState([])
  const invoice_DataByID = async id => {
    const res = await axios.get(`${host}/api/invoice/getDataById/${id}`)
    console.log("res", res.data)
    setDataById(res.data)
    // console.log(dataById)
  }
  const deleteInvoice = async id => {
    const res = await axios.delete(`${host}/api/invoice/deleteInvoice/${id}`)
    console.log("res", res.data)
  }

  // const updateInvoice = async (id, form) => {
  //   console.log("idx", id)
  //   console.log("form", form)
  //   const res = await axios.put(`${host}/api/invoice/updateInvoice/${id}`, form)
  //   console.log("res", res.data)
  // }

  const editInvoice = async (
    id,
    invoiceNumber,
    invoiceDate,
    dueDate,
    addField,
    selectedOption,
    businessName,
    email,
    pan,
    clientAddress,
    clientCity,
    clientState,
    clientZip,
    selectedOption2,
    ItemField,
    discount,
    termCondition
    // logo, signature
  ) => {
    // API Call
    const response = await fetch(`${host}/api/invoice/updateInvoice/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'multipart/form-data',
        // "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        invoiceNumber,
        invoiceDate,
        dueDate,
        addField,
        selectedOption,
        businessName,
        email,
        pan,
        selectedOption2,
        clientAddress,
        clientCity,
        clientState,
        clientZip,
        ItemField,
        discount,
        termCondition,
      }),
    })
    const json = await response.json()
    console.log(json)
    let newInvoice = JSON.parse(JSON.stringify(data))
    // Logic to edit in client
    for (let index = 0; index < newInvoice.length; index++) {
      const element = newInvoice[index]
      if (element._id === id) {
        newInvoice[index].invoiceNumber = invoiceNumber
        newInvoice[index].invoiceDate = invoiceDate
        newInvoice[index].dueDate = dueDate
        newInvoice[index].addField = addField
        newInvoice[index].selectedOption = selectedOption
        newInvoice[index].businessName = businessName
        newInvoice[index].email = email
        newInvoice[index].pan = pan
        newInvoice[index].clientAddress = clientAddress
        newInvoice[index].clientCity = clientCity
        newInvoice[index].clientState = clientState
        newInvoice[index].clientZip = clientZip
        newInvoice[index].selectedOption2 = selectedOption2
        newInvoice[index].ItemField = ItemField
        newInvoice[index].discount = discount
        newInvoice[index].termCondition = termCondition
        newInvoice[index].logo = logo
        newInvoice[index].signature = signature
        break
      }
    }
    setdata(newInvoice)
  }

  return (
    <AdminContext.Provider
      value={{
        Rigester,
        Login,
        UserDetails,
        user,
        Verification,
        invoices_Data,
        data,
        invoice_DataByID,
        dataById,
        deleteInvoice,
        editInvoice,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminState
