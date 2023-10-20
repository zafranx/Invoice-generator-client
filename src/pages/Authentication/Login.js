import PropTypes from "prop-types"
import React, { useContext, useState } from "react"
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"
// context
// import AdminContext from '../../context/adminContext';
import AdminContext from "context/adminContext"

import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import withRouter from "components/Common/withRouter"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

//Social Media Imports
import { GoogleLogin } from "react-google-login"
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/images/logo.svg"
import logodark from "../../assets/images/logo-dark.png"
// import logolight from "../../assets/images/logo-light.png";
//Import config
import { facebook, google } from "../../config"
import CarouselPage from "../AuthenticationInner/CarouselPage"

const Login = props => {
  // context
  const context = useContext(AdminContext)
  const { Login } = context
  let nevigate = useNavigate()

  const [show, setShow] = useState(false)
  //meta title
  document.title = "Login | Zaf - React Admin & Dashboard "

  // const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "khanzafran8349@gmail.com" || "",
      password: "123456" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async values => {
      // dispatch(loginUser(values, props.router.navigate));

      console.log("values", values)
      let response = await Login(values)
      console.log("response", response)
      // UserDetails()
      // res?alert('login'):alert('error')
      response && nevigate("/invoice")
    },
  })

  // const { error } = useSelector(state => ({
  //   error: state.Login.error,
  // }));

  const signIn = (res, type) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      }

      // dispatch(socialLogin(postData, props.router.navigate, type));
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      }
      // dispatch(socialLogin(postData, props.router.navigate, type));
    }
  }

  //handleGoogleLoginResponse
  const googleResponse = response => {
    signIn(response, "google")
  }

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  //handleFacebookLoginResponse
  const facebookResponse = response => {
    signIn(response, "facebook")
  }

  return (
    <React.Fragment>
      <div>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      {/* <div className="mb-4 ">
                      <Link to="/dashboard" className="d-block auth-logo mt-2">
                        <img
                          src={logodark}
                          alt=""
                          height="18"
                          className="logo-dark-element"
                        />
                      </Link>
                    </div> */}
                      <Col xs={7}>
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Welcome Back !</h5>
                          <p>Sign in to continue to .</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profile} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/" className="logo-light-element">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <Form
                        className="form-horizontal"
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                        }}
                      >
                        {/* {error ? <Alert color="danger">{error}</Alert> : null} */}

                        <div className="mb-3">
                          <Label className="form-label">Email</Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">Password</Label>
                          <div className="input-group auth-pass-inputgroup">
                            <Input
                              name="password"
                              value={validation.values.password || ""}
                              type={show ? "text" : "password"}
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            <button
                              onClick={() => setShow(!show)}
                              className="btn btn-light "
                              type="button"
                              id="password-addon"
                            >
                              <i className="mdi mdi-eye-outline"></i>
                            </button>
                          </div>
                          {validation.touched.password &&
                          validation.errors.password ? (
                            <FormFeedback type="invalid">
                              {validation.errors.password}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customControlInline"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customControlInline"
                          >
                            Remember me
                          </label>
                        </div>

                        <div className="mt-3 d-grid">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <h5 className="font-size-14 mb-3">Sign in with</h5>

                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <FacebookLogin
                                appId={facebook.APP_ID}
                                autoLoad={false}
                                callback={facebookResponse}
                                render={renderProps => (
                                  <Link
                                    to="#"
                                    className="social-list-item bg-primary text-white border-primary"
                                    onClick={renderProps.onClick}
                                  >
                                    <i className="mdi mdi-facebook" />
                                  </Link>
                                )}
                              />
                            </li>
                            {/*<li className="list-inline-item">*/}
                            {/*  <TwitterLogin*/}
                            {/*    loginUrl={*/}
                            {/*      "http://localhost:4000/api/v1/auth/twitter"*/}
                            {/*    }*/}
                            {/*    onSuccess={this.twitterResponse}*/}
                            {/*    onFailure={this.onFailure}*/}
                            {/*    requestTokenUrl={*/}
                            {/*      "http://localhost:4000/api/v1/auth/twitter/revers"*/}
                            {/*    }*/}
                            {/*    showIcon={false}*/}
                            {/*    tag={"div"}*/}
                            {/*  >*/}
                            {/*    <a*/}
                            {/*      href=""*/}
                            {/*      className="social-list-item bg-info text-white border-info"*/}
                            {/*    >*/}
                            {/*      <i className="mdi mdi-twitter"/>*/}
                            {/*    </a>*/}
                            {/*  </TwitterLogin>*/}
                            {/*</li>*/}
                            <li className="list-inline-item">
                              <GoogleLogin
                                clientId={google.CLIENT_ID}
                                render={renderProps => (
                                  <Link
                                    to="#"
                                    className="social-list-item bg-danger text-white border-danger"
                                    onClick={renderProps.onClick}
                                  >
                                    <i className="mdi mdi-google" />
                                  </Link>
                                )}
                                onSuccess={googleResponse}
                                onFailure={() => {}}
                              />
                            </li>
                          </ul>
                        </div>

                        <div className="mt-4 text-center">
                          <Link to="/forgot-password" className="text-muted">
                            <i className="mdi mdi-lock me-1" />
                            Forgot your password?
                          </Link>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Don&#39;t have an account ?{" "}
                    <Link to="/register" className="fw-medium text-primary">
                      {" "}
                      Signup now{" "}
                    </Link>{" "}
                  </p>
                  <p>
                    © {new Date().getFullYear()} Zaf.{" "}
                    <i className="mdi mdi-heart text-danger" /> by ....
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="">
          <CarouselPage />
        </div>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
