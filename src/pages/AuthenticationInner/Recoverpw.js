import React,{useState} from "react";
import { Link } from "react-router-dom";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";

// import images
import profile from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";
import lightlogo from "../../assets/images/logo-light.svg";

const Recoverpw = () => {

  //meta title
  document.title="Recover Password | Skote - React Admin & Dashboard Template";
 const [show, setShow] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      password:'',
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      // let response = await Login(values)
    //  console.log("response",response)
    }
  });

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary"> Reset Password</h5>
                        <p>Reset Password with Skote.</p>
                      </div>
                    </Col>
                    <Col xs={5} className="align-self-end">
                      <img
                        src={profile}
                        alt=""
                        className="img-fluid"
                      />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                  <div className="auth-logo">
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={lightlogo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                    <Link to="/" className="auth-logo-dark">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  </div>
                  <div className="p-2">
                    <div
                      className="alert alert-success text-center mb-4"
                      role="alert"
                    > Enter your Email and instructions will be sent to you! </div>

                    <Form className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >                   
                        <div className="mb-3">
                        <Label className="form-label">New Password</Label>
                        <div className="input-group auth-pass-inputgroup">
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type={show ? "text" : "password"}
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                          <button onClick={() => setShow(!show)} className="btn btn-light " type="button" id="password-addon">
                            <i className="mdi mdi-eye-outline"></i></button>
                        </div>
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="text-end">
                        <button
                          className="btn btn-primary w-md "
                          type="submit"
                        >
                          Reset
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Remember It ?{" "}
                  <Link
                    to="pages-login"
                    className="fw-medium text-primary"
                  >
                    {" "}
                    Sign In here
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Skote. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Recoverpw;
