import React, { useEffect, useContext, useState } from "react"
import PropTypes from "prop-types"
import { Link, useParams, useNavigate } from "react-router-dom"
import withRouter from "components/Common/withRouter"
import { Card, CardBody, Col, Container, Row, Table, Button } from "reactstrap"
import EditModal from "./EditModal"

import { isEmpty, map } from "lodash"
import axios from "axios"

// context
import AdminContext from "context/adminContext"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Image
import logo from "../../assets/images/logo-dark.png"
// import logo from "../../../assets/images/clients/1.png";

import logoLight from "../../assets/images/logo-light.png"
import { set } from "lodash"

// import logoLight from "../../../assets/images/clients/1.png";

// import { getInvoiceDetail as onGetInvoiceDetail } from "../../store/invoices/actions";
//redux
// import { useSelector, useDispatch } from "react-redux";

const InvoiceDetail = props => {
  //meta title
  document.title = "Invoice Detail | Zaf - React Admin & Dashboard "

  let navigate = useNavigate()
  // context
  const context = useContext(AdminContext)
  const { invoice_DataByID, dataById, deleteInvoice } = context
  // params to get id
  const { id } = useParams()
  console.log(id)
  console.log("DataByID", dataById)
  useEffect(() => {
    invoice_DataByID(id)
    // eslint-disable-next-line
  }, [])

  const Delete_Invoice = () => {
    if (window.confirm("sure want to delete")) {
      deleteInvoice(dataById._id)
      navigate("/invoices-list")
    }
  }
  // const dispatch = useDispatch();

  // const { invoiceDetail } = useSelector(state => ({
  //   invoiceDetail: state.invoices.invoiceDetail,
  // }));

  // const params = props.router.params;
  // useEffect(() => {
  //   if (params && params.id) {
  //     dispatch(onGetInvoiceDetail(params.id));
  //   } else {
  //     dispatch(onGetInvoiceDetail(1)); //remove this after full integration
  //   }
  // }, [dispatch, onGetInvoiceDetail]);

  // const [payamount, setPayamount] = useState("")
  // setPayamount(totalAmount)
  // console.log(payamount)
  // Calculate the total amount of ItemField items

  const totalAmount = dataById?.ItemField?.reduce(
    (total, item) => total + parseFloat(item.total),
    0
  ).toFixed(0)
  const totalTax = dataById?.ItemField?.reduce(
    (IGST, item) => IGST + parseFloat(item.IGST),
    0
  ).toFixed(2)

  // const setamount = () => {
  //   setPayamount(totalAmount)
  //   console.log(payamount)
  // }

  //Print the Invoice
  const printInvoice = () => {
    window.print()
  }

  //  rozarpay payment
  const checkoutHandler = async amount => {
    const {
      data: { key },
    } = await axios.get("http://www.localhost:8000/api/getkey")

    const {
      data: { order },
    } = await axios.post("http://localhost:8000/api/checkout", {
      amount,
    })

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: dataById?.businessName || "No name",
      description: dataById?.clientEmail || "Description field",
      image:
        "https://media.gettyimages.com/id/171255589/photo/costs-of-baby-care.jpg?s=2048x2048&w=gi&k=20&c=EHVM3iz9tzXEFtlOA-cZN_ASIMx4ochBUBWxpWChZnc=",
      order_id: order.id,
      callback_url: "http://localhost:8000/api/paymentverification",
      prefill: {
        name: "Test Z",
        email: "adminz@example.com",
        contact: "9999999999",
      },
      notes: {
        address: dataById?.clientAddress || "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    }
    const razor = new window.Razorpay(options)
    razor.open()
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoice Detail" />
          {/* {!isEmpty(invoiceDetail) && ( */}
          <Row>
            <Col lg="12">
              <Card>
                <div className="d-print-none">
                  <EditModal id={dataById._id} />
                  <Button
                    className="float-end mt-1 mx-1 "
                    onClick={() => {
                      Delete_Invoice()
                      console.log("delete")
                    }}
                  >
                    Delete
                  </Button>
                </div>

                <CardBody>
                  {/* <hr /> */}
                  <div className="invoice-title">
                    <h2 className="text-center text-primary">Invoice</h2>
                    <div className="float-end ">
                      <h4 className="font-size-16 mb-2 text-primary">
                        {/* Id no. {dataById._id} */}
                        Invoice NO. # {dataById.invoiceNumber}
                      </h4>
                      <h4 className="font-size-16 mb-2 text-primary">
                        Invoice Date: {dataById.invoiceDate}
                      </h4>
                      {/* <h4 className="font-size-16 mb-2">
                        Due Date : {dataById.dueDate}
                      </h4> */}
                    </div>
                    <div className="mb-4">
                      {/* <img src={logo} alt="logo-dark" className="logo-dark-element" height="20" /> */}
                      <img
                        src={`http://localhost:8000/${dataById.logo}`}
                        alt="logo"
                        className="logo-dark-element"
                        height="20"
                        style={{ width: "150px", height: "80px" }}
                      />
                      <p>{dataById.logo}</p>
                      {/* <img src={logoLight} alt="logo-light" className="logo-light-element" height="20" /> */}
                    </div>
                  </div>

                  <hr />
                  <br />
                  {/* <Row>
                    <Col><Card lg="7" className="border"><CardBody>
                      <tr>
                        <td>  <p className="font-size-18">  <strong>Invoice Number :  </strong>  </p> </td>
                        <td>
                          <p className="font-size-20 text-primary"> &nbsp; {dataById.invoiceNumber} </p>
                        </td>
                      </tr>

                    </CardBody></Card></Col>
                    <Col><Card lg="7" className="border"><CardBody>

                      <tr>
                        <td>  <p className="font-size-18">  <strong>Invoice Number :  </strong>  </p> </td>
                        <td>
                          <p className="font-size-20 text-primary"> &nbsp; {dataById.invoiceNumber} </p>
                        </td>
                      </tr>

                    </CardBody></Card></Col>
                  </Row> */}
                  <Row className="">
                    <Col sm="6">
                      {/* <Card className="border"><CardBody> */}
                      <address>
                        <strong className="text-primary">Billed To: </strong>
                        <br />
                        <h5>{dataById.businessName} </h5>

                        <p> {dataById.email}</p>
                        <p> {dataById?.phone}</p>
                        <p> {dataById.GST}</p>
                        <p> {dataById.pan}</p>
                        <p> {dataById.address}</p>
                        <p>{dataById.city}</p>
                        <p>{dataById.zip}</p>
                        <p> {dataById.state} </p>
                      </address>
                      {/* </CardBody></Card> */}
                    </Col>
                    <Col sm="6" className="text-sm-end">
                      {/* <Card className="border"><CardBody> */}
                      <address>
                        <strong className="text-primary">Shipped To:</strong>
                        <br />
                        {/* {map(
                            invoiceDetail.shippingAddress.split(","),
                            (item, key) => (
                              <React.Fragment key={key}>
                                <span>{item}</span>
                                <br />
                              </React.Fragment>
                            )
                          )} */}
                        <h5>{dataById.clientBusinessName} </h5>
                        <p> {dataById.clientEmail}</p>
                        <p> {dataById.clientPhone}</p>
                        <p> {dataById.clientGST} </p>
                        <p> {dataById.clientPan} </p>
                        <p> {dataById.clientAddress} </p>
                        <p> {dataById.clientCity} </p>
                        <p> {dataById.clientZip} </p>
                        <p> {dataById.clientState} </p>
                      </address>
                      {/* </CardBody></Card> */}
                    </Col>
                  </Row>

                  <div className="py-2 mt-3">
                    <h3 className="font-size-15 fw-bold">Order summary:</h3>
                  </div>
                  <div className="table-responsive">
                    <Table className="table-nowrap">
                      <tr>
                        {/* <td>Item Fields:</td> */}
                        <td>
                          <Table>
                            <thead className="text-primary">
                              <tr>
                                <th>Item Name</th>
                                <th>Item Tax</th>
                                <th>Item Quantity</th>
                                <th>Item Rate</th>
                                <th>IGST</th>
                                <th>Item Amount</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dataById?.ItemField?.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.itemName}</td>
                                  <td>{item.itemTax}</td>
                                  <td>{item.itemQuantity}</td>
                                  <td>{item.itemRate}</td>
                                  <td>{item.IGST}</td>
                                  <td>{item.itemAmount}</td>
                                  <td>{item.total}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </td>
                      </tr>
                    </Table>
                  </div>

                  <div>
                    <Card sm={12} lg={6} className="float-en border mt-2">
                      <CardBody>
                        <hr className="border border-primary" />
                        <h2>Total Tax :{totalTax} </h2>

                        <h3>Discount : {dataById?.discount}</h3>

                        <h1>Total (INR) {totalAmount}:</h1>
                        <hr className="border border-primary" />
                        {/* convertNumberToWords */}
                        {/* <h4>Show Total In Words:</h4> */}
                      </CardBody>
                    </Card>
                  </div>
                  {/* signature */}
                  <div>
                    <Card sm={12} lg={6} className="float-en border mt-2">
                      <CardBody>
                        <h2>Signature:</h2>
                        <hr className="border border-primary" />
                        <img
                          src={`http://localhost:8000/${dataById?.signature}`}
                          alt="logo"
                          className="logo-dark-element"
                          height="20"
                          style={{ width: "150px", height: "80px" }}
                        />
                        <h5>2:&nbsp;{dataById?.signatureLabel}</h5>

                        <hr className="border border-primary" />
                      </CardBody>
                    </Card>
                  </div>
                  <div>
                    <Card sm={12} lg={6} className="floa... border mt-2">
                      <CardBody>
                        {/* <hr className="border border-primary" /> */}
                        {dataById?.termCondition?.map((item, index) => (
                          <div key={index}>
                            <h3>Term & Condition</h3>
                            <hr className="border border-primary" />

                            <h5>1:&nbsp;{item.term}</h5>
                            <h5>2:&nbsp;{item.term2}</h5>
                          </div>
                        ))}
                        {/* <hr className="border border-primary" /> */}
                      </CardBody>
                    </Card>
                  </div>
                  {/* {dataById.addField ? ( */}
                  <div>
                    <Card sm={12} lg={6} className="float-sta border mt-2">
                      <CardBody>
                        <h3>Additional Fields :</h3>
                        {/* <hr className="border border-primary" /> */}
                        {dataById?.addField?.map((field, index) => (
                          <div key={index}>
                            <hr className="border border-primary" />
                            <h5>{field.name}</h5>
                            <h5>{field.value}</h5>
                            <hr className="border border-primary" />
                          </div>
                        ))}
                        {/* <hr className="border border-primary" /> */}
                      </CardBody>
                    </Card>
                  </div>
                  {/* ) :
                    ("No Additional Fields")
                  } */}

                  <td>
                    <h4 className="font-size-16 mb-2 text-danger">
                      Due Date : {dataById?.dueDate}
                    </h4>
                  </td>

                  {/* end */}
                  <div className="d-print-none">
                    <div className="float-end">
                      <Button
                        className="mx-2"
                        color="primary"
                        onClick={() => {
                          // let amount = parseInt(totalAmount)
                          checkoutHandler(totalAmount)
                          // console.log('tl', amount)
                        }}
                      >
                        Pay - {totalAmount}
                      </Button>
                      <Link
                        to="#"
                        onClick={printInvoice}
                        className="btn btn-success  me-2"
                      >
                        <i className="fa fa-print" />
                      </Link>
                      <Link to="#" className="btn btn-primary w-md ">
                        Send
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* )} */}
        </Container>
      </div>
    </React.Fragment>
  )
}

InvoiceDetail.propTypes = {
  match: PropTypes.any,
}

export default withRouter(InvoiceDetail)
