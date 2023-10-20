import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";
// context 
// import AdminContext from '../../context/adminContext';
import AdminContext from 'context/adminContext';

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
// import {useSelector,  useDispatch } from "react-redux";
import withRouter from "components/Common/withRouter";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
// import { editProfile, resetProfileFlag } from "../../store/actions";

const UserProfile = () => {
  // context 
  const context = useContext(AdminContext);
  const { user } = context;
  // console.log("userdetails",userdetails.username)
  //meta title
  document.title = "Profile | Skote - React Admin & Dashboard Template";

  // const dispatch = useDispatch();

  const [email, setemail] = useState('');
  const [name, setname] = useState("");
  const [profile, setProfile] = useState(null);
  // const [id, setid] = useState('');
  const handleImagechange = (e) => {
    setProfile(e.target.files[0]);
  }


  // const { error, success } = useSelector(state => ({
  //   error: state.Profile.error,
  //   success: state.Profile.success,
  // }));

  // useEffect(() => {
  //   if (localStorage.getItem("authUser")) {
  //     const obj = JSON.parse(localStorage.getItem("authUser"));
  //     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //       setname(obj.displayName);
  //       setemail(obj.email);
  //       setidx(obj.uid);
  //     } else if (
  //       process.env.REACT_APP_DEFAULTAUTH === "fake" ||
  //       process.env.REACT_APP_DEFAULTAUTH === "jwt"
  //     ) 
  //     {
  //       setname(obj.username);
  //       setemail(obj.email);
  //       setidx(obj.uid);
  //     }
  //     setTimeout(() => {
  //       // dispatch(resetProfileFlag());
  //     }, 3000);
  //   }
  //  },
  //  //  [dispatch, success]
  // );

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: user.username || '',
      // idx: idx || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your UserName"),
    }),
    onSubmit: (values) => {
      // dispatch(editProfile(values));
    }
  });


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Skote" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {/* {authUser && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null} */}

              <Card>
                <CardBody>
                  <div className="d-flex">

                    {/* <div className="ms-3">
                      <img
                        src={avatar}
                        // src ={URL.createObjectURL(profile)}
                        // src ={profile}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div> */}
                    {profile !== null ? (
                      <div className="ms-3">
                        <img
                          // src={avatar}
                          src={URL.createObjectURL(profile)}
                          // src ={profile}
                          alt=""
                          className="avatar-md rounded-circle img-thumbnail"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="ms-3">
                          <img
                            src={avatar}
                            //  src ={URL.createObjectURL(profile)}
                            // src ={profile}
                            alt=""
                            className="avatar-md rounded-circle img-thumbnail"
                          />

                        </div>
                      </>
                    )}
                    <div className="flex-grow-1 align-self-center">
                      <div
                        className="text-muted ms-2"
                      >
                        <h5>{user.username}</h5>
                        <p className="mb-1">{user.email}</p>
                        {/* <p className="mb-0">Id no: #{user._id}</p> */}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Update Your Details</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="form-group">
                  <Label className="form-label">User Name</Label>
                  <Input
                    name="username"
                    className="form-control"
                    placeholder="Enter User Name"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.username || ""}
                    invalid={
                      validation.touched.username && validation.errors.username ? true : false
                    }
                  />
                  {validation.touched.username && validation.errors.username ? (
                    <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                  ) : null}
                  {/* <Label className="form-label">User ID</Label>
                  <Input name="id" value={user._id} type="" readOnly/> */}
                  <Label className="form-label">Email</Label>
                  <Input name="email" value={user.email} type="email" readOnly />
                  <Label className="form-label">Upload Profile</Label>
                  <Input name="profile" type="file" accept=".png,.jpeg " onChange={(e) => { handleImagechange(e); }} />
                  {/* {profile !==null ?(
                    <div className="ms-3">
                      <img
                        // src={avatar}
                        src ={URL.createObjectURL(profile)}
                        // src ={profile}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                   ):(
                     <>
                     <div className="ms-3">
                      <img
                         src={avatar}
                        //  src ={URL.createObjectURL(profile)}
                        // src ={profile}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                     
                    </div>
                     </>
                   )} */}
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update Your Details
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
