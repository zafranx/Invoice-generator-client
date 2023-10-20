import React,{useState,useContext,useEffect} from "react";
import AdminContext from 'context/adminContext';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Label,
  Input,
  Row,
} from "reactstrap"

// import images
import logodark from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"

const TwostepVerification = () => {

  //meta title
  document.title = "Two Step Verification | Skote - React Admin & Dashboard Template";
  let nevigate = useNavigate();
  const context = useContext(AdminContext)
  const {Verification,UserDetails} =context;

// user details :email
const [email,setEmail]= useState(localStorage.getItem('email'))
// useEffect(() => {
//  setEmail(localStorage.getItem('email')) 
// }, [])

const [digit ,setDigit] = useState({
  digit1:'',
   digit2:'',
    digit3:'',
     digit4:'',
})
  const {digit1,digit2,digit3,digit4} = digit

const handleChange =(e) =>{
setDigit ({...digit,[e.target.name]:(e.target.value)})
console.log("digit",digit)
}

const otp = digit1 + digit2 + digit3 + digit4
console.log(otp,"otp")
const onSubmitOtp = async (e) => {
e.preventDefault();
let response = await  Verification({otp,email});
  response && nevigate('/login')
}
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5 text-muted">
                <Link to="dashboard" className="d-block auth-logo">
                  <img
                    src={logodark}
                    alt=""
                    height="20"
                    className="auth-logo-dark mx-auto"
                  />
                  <img
                    src={logolight}
                    alt=""
                    height="20"
                    className="auth-logo-light mx-auto"
                  />
                </Link>
                <p className="mt-3">React Admin & Dashboard Template</p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody>
                  <div className="p-2">
                    <div className="text-center">
                      <div className="avatar-md mx-auto">
                        <div className="avatar-title rounded-circle bg-light">
                          <i className="bx bxs-envelope h1 mb-0 text-primary"></i>
                        </div>
                      </div>
                      <div className="p-2 mt-4">
                        <h4>Verify your email</h4>
                        <p className="mb-5">
                          Please enter the 4 digit code sent to{" "}
                          <span className="fw-semibold">
                            {/* && example@abc.com */}
                            {localStorage.getItem('email') }
                          </span>
                        </p>

                        <Form>
                          <Row>
                            <Col className="col-3">
                              <div className="mb-3">
                                <Label htmlFor="digit1-input" className="visually-hidden">Dight 1</Label>
                                <Input type="text"
                                  className="form-control form-control-lg text-center two-step"
                                  maxLength="1"
                                  data-value="1"
                                  id="digit1-input"
                                  name ="digit1"
                                  value ={digit1}
                                 onChange ={(e) => handleChange (e)}
                                   />
                                
                              </div>
                            </Col>

                            <Col>
                              <div className="mb-3">
                                <Label htmlFor="digit2-input" className="visually-hidden">Dight 2</Label>
                                <Input type="text"
                                  className="form-control form-control-lg text-center two-step"
                                  maxLength="1"
                                  data-value="2"
                                  id="digit2-input"
                                   name ="digit2"
                                  value ={digit2}
                              onChange ={(e) => handleChange (e)}
                                  />
                              </div>
                            </Col>

                            <Col>
                              <div className="mb-3">
                                <Label htmlFor="digit3-input" className="visually-hidden">Dight 3</Label>
                                <Input type="text"
                                  className="form-control form-control-lg text-center two-step"
                                  maxLength="1"
                                  data-value="3"
                                  id="digit3-input"
                                   name ="digit3"
                                  value ={digit3}
                                  onChange ={(e) => handleChange (e)}
                                  />
                              </div>
                            </Col>

                            <Col>
                              <div className="mb-3">
                                <Label htmlFor="digit4-input" className="visually-hidden">Dight 4</Label>
                                <Input type="text"
                                  className="form-control form-control-lg text-center two-step"
                                  maxLength="1"
                                  data-value="4"
                                  id="digit4-input"
                                   name ="digit4"
                                  value ={digit4}
                                  onChange ={(e) => handleChange (e)}
                                  />
                              </div>
                            </Col>
                          </Row>
                        </Form>

                        <div className="mt-4">
                          <Link
                            // to="/dashboard"
                            className="btn btn-success w-md"
                            onClick={(e)=> onSubmitOtp(e)}
                          >
                            Confirm
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Did&apos;t receive a code ?{" "}
                  <a href="#" className="fw-medium text-primary">
                    {" "}
                    Resend{" "}
                  </a>{" "}
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
  )
}
export default TwostepVerification;
