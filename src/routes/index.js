import React from "react"
import { Navigate } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
// import EmailVerification from "../pages/AuthenticationInner/auth-email-verification"
import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import Blog from "../pages/Dashboard/blog"
import Crypto from "../pages/Dashboard/crypto"
import Invoice from "../pages/Dashboard/invoice"
import InvoiceDetail from "../pages/Invoices/invoices-detail"
import InvoiceList from "../pages/Invoices/invoices-list"
import CryptoIcoLanding from "pages/Crypto/CryptoIcoLanding/index"
import FormWizard from "pages/Dashboard/FormWizard"
import PaymentSuccess from "pages/Invoices/PaymentSuccess"

const authProtectedRoutes = [
  // { path: "/dashboard", component: <Dashboard /> },
  // { path: "/blog", component: <Blog /> },
  // { path: "/crypto", component: <Crypto /> },
  { path: "/invoice", component: <Invoice /> },
  { path: "/formWizard", component: <FormWizard /> },
  { path: "/paymentsuccess", component: <PaymentSuccess /> },

  { path: "/invoices-detail/:id", component: <InvoiceDetail /> },
  { path: "/invoices-list", component: <InvoiceList /> },
  // //profile
  { path: "/profile", component: <UserProfile /> },

  // write
  //Crypto
  // { path: "/crypto-ico", component: <CryptoIcoLanding /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/invoice" />,
  },
]

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  //  { path: "/auth-email-verification", component: <EmailVerification /> },
  { path: "/auth-two-step-verification", component: <TwostepVerification /> },
  { path: "/Recoverpw", component: <Recoverpw /> },
  { path: "/crypto-ico", component: <CryptoIcoLanding /> },
]

export { authProtectedRoutes, publicRoutes }
