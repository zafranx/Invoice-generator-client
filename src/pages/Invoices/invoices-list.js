import React, { useEffect, useContext } from "react"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Label,
  FormGroup,
  Button,
} from "reactstrap"
import PropTypes from "prop-types"
import { Link, useParams } from "react-router-dom"
import withRouter from "components/Common/withRouter"
// import { map } from "lodash"
// import axios from 'axios';
import AdminContext from "context/adminContext"
//redux
// import { useSelector, useDispatch } from "react-redux";
//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Card invoice
// import CardInvoice from "./card-invoice"
import EditModal from "./EditModal"

const InvoicesList = props => {
  //meta title
  document.title = "Invoice List | zaf - React Admin & Dashboard "
  const context = useContext(AdminContext)
  const { data, invoices_Data, deleteInvoice, dataById } = context
  const { id } = useParams()
  const host = process.env.REACT_APP_HOST || "http://localhost:8000"

  // const [data, setdata] = useState([]);
  // // console.log(data,"dfer");
  // const invoices_Data = async () => {
  //   let res = await axios.get(
  //     "http://localhost:8000/api/invoice/getData"
  //   );
  //   console.log("res", res.data);
  //   setdata(res.data);
  // };

  useEffect(() => {
    invoices_Data()
    // console.log("invoices_Data", invoices_Data)
    // eslint-disable-next-line
  }, [])
  const Delete_Invoice = id => {
    if (window.confirm("sure want to delete")) {
      // deleteInvoice(dataById._id)
      deleteInvoice(id)
      // invoices_Data()
      console.log(id)
      // navigate('/invoices-list')
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoice List" />

          {/* <Row> */}
          {/* {map(invoices, (invoice, key) => (
            <CardInvoice data={invoice} key={"_invoice_" + key}
             />
          ))} */}

          {data?.map((invoices_Data, index) => (
            <>
              <div key={index}>
                <Container>
                  <Col
                    //  sm={12} lg={3}
                    xl="12"
                    sm="6"
                    lg="12"
                    // xl="4" sm="6"
                  >
                    <Card className="border border-primary">
                      <Row>
                        {/* Modal */}
                        {/* <EditModal id={invoices_Data._id} /> */}
                        {/* id={invoices_Data._id} */}
                        <Link to={`/invoices-detail/${invoices_Data._id}`}>
                          <Button className="float-end mt-1 mx-1">View</Button>
                        </Link>
                        <div>
                          <Button
                            className="float-end mt-1 mx-1 "
                            onClick={() => {
                              Delete_Invoice(invoices_Data?._id)
                              console.log("delete")
                            }}
                          >
                            Del
                          </Button>
                        </div>
                      </Row>
                      <CardBody>
                        <Row>
                          <Col
                          // lg="4"
                          >
                            {/* <Label className="mx-2 float-end ">
                              <strong>Invoice id:</strong> &nbsp;{invoices_Data._id}
                            </Label>
                            <tr className="mx-2 float-start">

                              <td><strong>Invoice Number:</strong> &nbsp;</td>   <td>{invoices_Data.invoiceNumber}</td>
                            </tr> */}
                            {invoices_Data?.logo && (
                              <img
                                className="text-center"
                                src={`${host}/${invoices_Data?.logo}`}
                                // src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                                alt="logo"
                                style={{ width: "200px", height: "100px" }}
                              />
                            )}

                            <Row>
                              <Col>
                                <tr>
                                  <td>
                                    {" "}
                                    <p className="font-size-18">
                                      {" "}
                                      <strong>Invoice Number : </strong>{" "}
                                    </p>{" "}
                                  </td>
                                  <td>
                                    <p className="font-size-20 text-primary">
                                      {" "}
                                      &nbsp; {invoices_Data?.invoiceNumber}{" "}
                                      {/* <br />{invoices_Data._id} */}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="font-size-14 text-dark">
                                      Invoice Date :
                                    </p>
                                  </td>
                                  <td>
                                    <p className="font-size-14">
                                      {invoices_Data?.invoiceDate}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="font-size-14">Due Date :</p>
                                  </td>
                                  <td>
                                    <p className="font-size-14">
                                      {invoices_Data?.dueDate}
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <p className="font-size-14">
                                      Bussiness Name :
                                    </p>
                                  </td>
                                  <td>
                                    <p className="font-size-14">
                                      {invoices_Data?.businessName}
                                    </p>
                                  </td>
                                </tr>
                              </Col>
                            </Row>
                            {/* <FormGroup row >
                              <Col>
                                <p className="font-size-20"> <strong>Invoice Number : # {invoices_Data.invoiceNumber} </strong> </p>
                              </Col>
                            </FormGroup>
                            <FormGroup row >
                              <Col>
                                <p className="font-size-22">   Invoice Date : {invoices_Data.invoiceDate}</p>


                              </Col>
                            </FormGroup>

                            <FormGroup row >
                              <Col>
                                <p className="font-size-22">      Due Date : {invoices_Data.dueDate} </p>
                              </Col>
                            </FormGroup> */}
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Container>
              </div>
            </>
          ))}

          {/* </Row> */}

          <Row>
            <Col xs="12">
              {/* <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                  Load more
                </Link>
              </div> */}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

InvoicesList.propTypes = {
  invoices: PropTypes.array,
  onGetInvoices: PropTypes.func,
}

export default withRouter(InvoicesList)
