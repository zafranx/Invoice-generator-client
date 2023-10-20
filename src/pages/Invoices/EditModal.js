import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Col,
  Row,
  Card,
  CardBody,
  Input,
  Form,
  FormGroup,
  Label,
  Button,
  CardTitle,
} from "reactstrap"
import Select from "react-select"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AdminContext from "context/adminContext"

function EditModal(id) {
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)
  // const { id } = args.id
  console.log("id", id.id)
  // context
  const context = useContext(AdminContext)
  const { invoice_DataByID, dataById } = context
  // const { id } = useParams();
  // console.warn('DataByID', dataById)
  // console.warn("invoice_DataByID", invoice_DataByID)
  // useEffect(() => {
  //   invoice_DataByID(id)
  //   // eslint-disable-next-line
  // }, [])

  const [object, setObject] = useState({
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
  })
  const { invoiceNumber, invoiceDate, dueDate } = object

  const handelChangeObject = e => {
    setObject({ ...object, [e.target.name]: e.target.value })
    // let newField = [...addField]
    // newField[index][e.target.name] = e.target.value
    // setObject(newField)
    console.log(object, "obj")
  }
  const [logo, setLogo] = useState("")
  const handelLogoChange = e => {
    setLogo(e.target.files[0])
    console.log("logo", logo)
  }

  const [addField, setAddField] = useState([{ name: "", value: "" }])

  const addFieldChange = (e, index) => {
    const newField = [...addField]
    newField[index][e.target.name] = e.target.value
    // setObject(newField)
    setAddField(newField)
    // console.log("newField", newField)
    console.log(addField, "addField")
  }
  // React Select for country
  const options = [
    { value: "India", label: "India" },
    { value: "China", label: "China" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Nepal", label: "Nepal" },
    { value: "Bangladesh", label: "Bangladesh" },
  ]
  const [selectedOption, setSelectedOption] = useState("")
  const setSelectedValue = e => {
    setSelectedOption(e.value)
  }
  // console.log(selectedOption, "country")
  // fo bill to section
  const [selectedOption2, setSelectedOption2] = useState([])
  // console.log(selectedOption2, "client_country")
  const setSelectedValueClient = e => {
    setSelectedOption2(e.value)
  }

  const [isClearable, setIsClearable] = useState(true)
  const [isSearchable, setIsSearchable] = useState(true)

  const [showEmail, setShowEmail] = useState(false)
  const AddEmail = () => {
    if (showEmail == true) {
      setShowEmail(false)
    } else {
      setShowEmail(true)
    }
  }
  // show phone
  const [showPhone, setShowPhone] = useState(false)
  const AddPhone = () => {
    if (showPhone == true) {
      setShowPhone(false)
    } else {
      setShowPhone(true)
    }
  }
  // show GST
  const [showGST, setShowGST] = useState(false)
  const AddGST = () => {
    if (showGST == true) {
      setShowGST(false)
    } else {
      setShowGST(true)
    }
  }
  // Show PAN
  const [showPan, setShowPan] = useState(false)
  const AddPan = () => {
    if (showPan == true) {
      setShowPan(false)
    } else {
      setShowPan(true)
    }
  }
  // Billed To: State
  // Show Email
  const [showEmail2, setShowEmail2] = useState(false)
  const AddEmail2 = () => {
    if (showEmail2 == true) {
      setShowEmail2(false)
    } else {
      setShowEmail2(true)
    }
  }
  // show phone
  const [showPhone2, setShowPhone2] = useState(false)
  const AddPhone2 = () => {
    if (showPhone2 == true) {
      setShowPhone2(false)
    } else {
      setShowPhone2(true)
    }
  }
  // show GST
  const [showGST2, setShowGST2] = useState(false)
  const AddGST2 = () => {
    if (showGST2 == true) {
      setShowGST2(false)
    } else {
      setShowGST2(true)
    }
  }
  // Show PAN
  const [showPan2, setShowPan2] = useState(false)
  const AddPan2 = () => {
    if (showPan2 == true) {
      setShowPan2(false)
    } else {
      setShowPan2(true)
    }
  }
  // show Gst in input field
  const [showTax, setShowTax] = useState(true)
  const AddTax = () => {
    if (showTax == true) {
      setShowTax(false)
    } else {
      setShowTax(true)
    }
  }

  // Show Signature
  const [showSignature, setShowSignature] = useState(false)
  // to hide signature button state
  const [hideSignatureButton, setHideSignatureButton] = useState(true)

  const AddSignature = () => {
    if (showSignature == true) {
      setShowSignature(false)
      // to hide signature button
      setHideSignatureButton(true)
    } else {
      setShowSignature(true)
      // to hide signature button
      setHideSignatureButton(false)
    }
  }
  // Show Term & Condition
  const [showTermCondition, setShowTermCondition] = useState(false)
  // to hide term condition button state
  const [hideTermButton, setHideTermButton] = useState(true)

  const AddTermCondition = () => {
    if (showTermCondition == true) {
      setShowTermCondition(false)
      // to hide term condition button
      setHideTermButton(true)
    } else {
      setShowTermCondition(true)
      // to hide term condition button

      setHideTermButton(false)
    }
  }

  // addfield TODO

  //  Billed By state
  const [billDetails, setBillDetails] = useState({
    businessName: "",
    email: "",
    phone: "",
    GST: "",
    pan: "",
    address: "",
    city: "",
    zip: "",
    state: "",
    clientBusinessName: "",
    clientEmail: "",
    clientPhone: "",
    clientGST: "",
    clientPan: "",
    clientAddress: "",
    clientCity: "",
    clientZip: "",
    clientState: "",
    signatureLabel: "",
  })
  const {
    businessName,
    email,
    phone,
    GST,
    pan,
    address,
    city,
    zip,
    state,
    clientBusinessName,
    clientEmail,
    clientPhone,
    clientGST,
    clientPan,
    clientAddress,
    clientCity,
    clientZip,
    clientState,
    signatureLabel,
  } = billDetails

  const handelBillDetailChange = e => {
    const { name, value } = e.target
    setBillDetails({ ...billDetails, [name]: value })
    console.log("billDetails", billDetails)
  }

  // Add new Field rate quantity abount
  const [ItemField, setItemField] = useState([
    {
      itemName: "",
      itemTax: "",
      itemQuantity: "",
      itemRate: "",
      IGST: "",
      itemAmount: "",
      total: "",
    },
  ])
  const handelItemField = (e, index) => {
    const { name, value } = e.target
    const newItemField = [...ItemField]
    newItemField[index][name] = value
    // amount calculation
    const quantity = parseFloat(newItemField[index].itemQuantity)
    const rate = parseFloat(newItemField[index].itemRate)
    const tax = parseFloat(newItemField[index].itemTax)

    // isNaN check karta hai number hai ki nahi input me
    if (!isNaN(quantity) && !isNaN(rate)) {
      const amount = (quantity * rate).toFixed(2)
      newItemField[index].itemAmount = amount
    } else {
      newItemField[index].itemAmount = ""
    }
    setItemField(newItemField)
    console.log("ItemField", newItemField)
    // tax
    if (!isNaN(tax)) {
      const taxAmount = ((quantity * rate * tax) / 100).toFixed(2)
      newItemField[index].IGST = taxAmount
    } else {
      newItemField[index].IGST = ""
    }
    setItemField(newItemField)
    // abount * tax
    const itemAmount = parseFloat(newItemField[index].itemAmount)
    const IGST = parseFloat(newItemField[index].IGST)

    if (!isNaN(itemAmount) && !isNaN(IGST)) {
      // const total = (itemAmount + IGST ? IGST : 0).toFixed(2)
      const total = (itemAmount + IGST).toFixed(2)
      newItemField[index].total = total
    } else {
      newItemField[index].total = ""
    }
    return setItemField(newItemField)
  }
  console.log(ItemField, "Field Item")

  // To remove field & cross button Function
  const removeItemField = index => {
    const newField = [...ItemField]
    newField.splice(index, 1)
    setItemField(newField)
  }

  // Show discount Button
  const [showDiscount, setShowDiscount] = useState(false)
  // to hide discount button
  const [hideDiscountButton, setHideDiscountButton] = useState(true)
  // discount button
  const AddDiscount = () => {
    if (showDiscount == true) {
      setShowDiscount(false)
      // to hide
      setHideDiscountButton(true)
    } else {
      setShowDiscount(true)
      setHideDiscountButton(false)
    }
  }

  const [discount, setDiscount] = useState("")
  // onChange Discount
  const ApplyDiscount = e => {
    // const { name, value } = e.target;
    setDiscount(e.target.value)
    console.log("discount", discount)
  }
  const calculateDiscount = () => {
    let totalDiscount = 0
    ItemField?.forEach(item => {
      const total = parseFloat(item.total)
      if (!isNaN(discount)) {
        totalDiscount += total - discount
      }
    })

    return totalDiscount.toFixed(2)
  }

  const calculateTotalTax = () => {
    let totalTax = 0
    // let discount = 30
    ItemField?.forEach(item => {
      const IGST = parseFloat(item.IGST)
      if (!isNaN(IGST)) {
        totalTax += IGST
      }
    })
    return totalTax.toFixed(2)
  }

  const calculateTotalAmount = () => {
    let totalAmount = 0
    ItemField?.forEach(item => {
      const quantity = parseFloat(item.itemQuantity)
      const rate = parseFloat(item.itemRate)
      const IGST = parseFloat(item.IGST)

      if (!isNaN(quantity) && !isNaN(rate)) {
        // totalAmount += quantity * rate + IGST ? IGST : 0
        totalAmount += quantity * rate + IGST - discount
      }
    })
    return totalAmount.toFixed(2)
  }

  // number to words
  // const numberToWord = () => {
  //   let abc = converter.toWords(calculateTotalAmount);
  //   console.log(abc, 'abc')
  // }

  const [termCondition, setTermCondition] = useState({
    term: "",
    term2: "",
  })
  const handelTermCondition = e => {
    const { name, value } = e.target
    setTermCondition({ ...termCondition, [name]: value })
    console.log("termCondition", termCondition)
  }

  const [signature, setSignature] = useState(null)
  const handelUploadSignature = e => {
    setSignature(e.target.files[0])
    console.log(signature, "signature")
  }
  // signatureLabel state
  // const [signatureLabel, setSignatureLabel] = useState("Authorised Signatory")

  // upate api
  const host = process.env.REACT_APP_HOST || "http://localhost:8000"

  // const handelOnUpdate2 = async id => {
  //   editInvoice(
  //     id,
  //     invoiceNumber,
  //     invoiceDate,
  //     dueDate,
  //     addField,
  //     selectedOption,
  //     businessName,
  //     email,
  //     pan,
  //     clientAddress,
  //     clientCity,
  //     clientState,
  //     clientZip,
  //     selectedOption2,
  //     ItemField,
  //     discount,
  //     termCondition,
  //     logo,
  //     signature
  //   )
  //   toast("Updated Successfully!", {
  //     position: "top-right",
  //     autoClose: 1000,
  //     theme: "light",
  //   })
  // }

  const handelOnUpdate = async id => {
    // e.preventDefault()
    const formData = new FormData()
    formData.append("logo", logo || imgdata)
    formData.append("invoiceDate", invoiceDate)
    formData.append("invoiceNumber", invoiceNumber)
    formData.append("dueDate", dueDate)
    formData.append("addField", JSON.stringify(addField))
    // console.log(addField, "addfield")
    // addField.forEach((field, index) => {
    //   formData.append(`field[${index}][name]`, field.name);
    //   formData.append(`field[${index}][value]`, field.value);
    // })
    formData.append("selectedOption", selectedOption)
    formData.append("businessName", businessName)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("GST", GST)
    formData.append("pan", pan)
    formData.append("address", address)
    formData.append("city", city)
    formData.append("state", state)
    formData.append("zip", zip)
    formData.append("selectedOption2", selectedOption2)
    formData.append("clientBusinessName", clientBusinessName)
    formData.append("clientEmail", clientEmail)
    formData.append("clientPhone", clientPhone)
    formData.append("clientGST", clientGST)
    formData.append("clientPan", clientPan)
    formData.append("ItemField", JSON.stringify(ItemField))
    // console.log(ItemField, "ItemField")
    formData.append("discount", discount)
    formData.append("termCondition", JSON.stringify(termCondition))
    formData.append("signature", signature || signatureData)
    formData.append("signatureLabel", signatureLabel)

    console.log(formData, "formdata")
    let response = await axios
      .put(`${host}/api/invoice/updateInvoice/${id}`, formData)

      .then(response => {
        if (response.status == 200) {
          console.log(response)
          toast("Submitted successfully", {
            type: "success",
          })
          invoice_DataByID(id)
        }
      })
      .catch(error => {
        if (error && error.response);
        toast(error.response.data, {
          type: "error",
          autoClose: 3000,
          theme: "light",
        })
        console.log("error", error)
      })
    console.log("response", response)
  }
  const [imgdata, setImgdata] = useState("")
  const [preview, setPreview] = useState("")
  useEffect(() => {
    if (logo) {
      setImgdata("")
      setPreview(URL.createObjectURL(logo))
    }
    // setTimeout(() => {
    //   setShowSpin(false)
    // }, 1200)
  }, [logo])
  const [signatureData, setSignatureData] = useState("")
  const [previewSignature, setPreviewSignature] = useState("")
  useEffect(() => {
    if (signature) {
      setSignatureData("")
      setPreviewSignature(URL.createObjectURL(signature))
    }
    // setTimeout(() => {
    //   setShowSpin(false)
    // }, 1200)
  }, [signature])
  useEffect(() => {
    setImgdata(dataById?.logo)
    setObject({ ...dataById })
    setSelectedOption(dataById?.selectedOption)
    setSelectedOption2(dataById?.selectedOption2)
    setBillDetails({ ...dataById })
    setAddField(dataById?.addField)
    setItemField(dataById?.ItemField)
    setTermCondition(dataById?.termCondition)
    setDiscount(dataById?.discount)
    setSignatureData(dataById?.signature)
  }, [dataById])

  // useEffect(() => {
  //   setAddField({ ...dataById })
  // }, [dataById])
  // useEffect(() => {
  //   setItemField({ ...dataById })
  // }, [dataById])

  return (
    <div className="">
      <Button color="dark" onClick={toggle} className="float-end">
        Edit
      </Button>
      <Modal size="xl" isOpen={modal} toggle={toggle} {...id}>
        <ModalHeader toggle={toggle}>Edit Invoice Form</ModalHeader>
        <ModalBody>
          <Container fluid>
            <Row className="border border-primary">
              <Col lg={12}>
                <Row>
                  <Card>
                    <div className="text-center text-primary mt-4 d-block  text-decoration-underline mb-2">
                      {" "}
                      <h1>Invoice</h1>{" "}
                    </div>
                    <CardBody>
                      <Form className="mt-3">
                        <Row>
                          {/* <div>ID:{dataById._id}</div> */}
                          <div className=" text-lg-center text-sm-center mx-2 mt-2 mb-2">
                            {/* {logo || imgdata && ( */}
                            <>
                              <Col lg={12}>
                                {" "}
                                <i
                                  className="dripicons-cross font-size-24 float-end "
                                  onClick={() => {
                                    setLogo("")
                                    setImgdata("")
                                  }}
                                ></i>{" "}
                              </Col>
                              <img
                                // src="${host}/Form_Images/1690959551221.png"
                                // src={logo ? preview : `${host}/${imgdata}`}
                                src={imgdata ? `${host}/${imgdata}` : preview}
                                // src={`${host}/${imgdata}`}
                                alt={imgdata}
                                style={{ width: "130px", height: "70px" }}
                              />
                            </>
                            {/* )} */}
                          </div>

                          <FormGroup className="float-end">
                            <Col>
                              <div className="float-end ">
                                <Label for="logo" className="mt-2 mb-2 border">
                                  <h4
                                    className=" text-center mx-2 mt-2 mb-2"
                                    onChange={handelLogoChange}
                                  >
                                    + Bussiness Logo
                                  </h4>{" "}
                                </Label>
                                <Input
                                  type="file"
                                  accept=".png,.jpeg,.webp,"
                                  className="d-none"
                                  id="logo"
                                  name="logo"
                                  onChange={handelLogoChange}
                                />
                              </div>
                            </Col>
                          </FormGroup>
                          <br />
                          <div>
                            <FormGroup row>
                              <Label
                                for="invoiceNumber"
                                sm={2}
                                // contentEditable="true"
                              >
                                Invoice No.
                              </Label>
                              <Col sm={4}>
                                <Input
                                  id="invoiceNumber"
                                  name="invoiceNumber"
                                  placeholder="Enter Invoice Number"
                                  type="text"
                                  value={invoiceNumber}
                                  // onChange={e => {
                                  //   setInvoiceNumber(e.target.value)
                                  // }}
                                  onChange={e => {
                                    handelChangeObject(e)
                                  }}
                                />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="invoiceDate" sm={2}>
                                Invoice date
                              </Label>
                              <Col sm={4}>
                                <Input
                                  id="invoiceDate"
                                  name="invoiceDate"
                                  placeholder="Enter Date"
                                  type="date"
                                  value={invoiceDate}
                                  // onChange={e => {
                                  //   setInvoiceDate(e.target.value)
                                  // }}
                                  onChange={e => {
                                    handelChangeObject(e)
                                  }}
                                />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="dueDate" sm={2}>
                                Due Date
                              </Label>
                              <Col sm={4}>
                                <Input
                                  id="dueDate"
                                  name="dueDate"
                                  placeholder="Enter Date"
                                  type="date"
                                  value={dueDate}
                                  // onChange={e => {
                                  //   setDueDate(e.target.value)
                                  // }}
                                  onChange={e => {
                                    handelChangeObject(e)
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <div>
                              {addField?.map((field, index) => {
                                return (
                                  <>
                                    <div key={index}>
                                      <FormGroup>
                                        <Row>
                                          <Col sm={2}>
                                            <Input
                                              className="mt-2"
                                              value={field.name}
                                              name="name"
                                              placeholder="Enter Field Name"
                                              type="text"
                                              onChange={e => {
                                                addFieldChange(e, index)
                                              }}
                                              // onChange={(e) => { handelChangeObject(e, index) }}
                                            />
                                          </Col>

                                          <Col sm={4}>
                                            <Input
                                              value={field.value}
                                              className="mt-2"
                                              name="value"
                                              placeholder="Enter Field Value"
                                              type="text"
                                              onChange={e => {
                                                addFieldChange(e, index)
                                              }}
                                              // onChange={(e) => { handelChangeObject(e, index) }}
                                            />
                                          </Col>

                                          {/* Cross Icon */}
                                          <Col sm={2}>
                                            {" "}
                                            <i
                                              className="dripicons-cross font-size-24"
                                              onClick={() => {
                                                const newarr = addField.filter(
                                                  (i, j) => {
                                                    return index !== j
                                                  }
                                                )
                                                setAddField(newarr)
                                              }}
                                            ></i>{" "}
                                          </Col>
                                        </Row>
                                      </FormGroup>
                                    </div>
                                  </>
                                )
                              })}
                              <button
                                type="button"
                                onClick={() => {
                                  setAddField([
                                    ...addField,
                                    { name: "", value: "" },
                                  ])
                                }}
                                className="btn btn-outline-primary mb-2 mt-2"
                              >
                                <span className="text-center">
                                  {" "}
                                  <i className="bx bx-plus font-size-14"></i>Add
                                  More Fields
                                </span>
                              </button>
                            </div>
                          </div>
                          {/* BIlled By Billed To Card */}
                          <Container fluid className="mt-2">
                            {/* Bill Row */}
                            <Row>
                              {/* Billed By */}
                              <Col lg={6} sm={12}>
                                <div>
                                  {" "}
                                  <h3> Billed By:</h3>{" "}
                                  <span>(Your Details)</span>{" "}
                                </div>
                                <Card className="border border-primary">
                                  <CardBody>
                                    <div className="mb-3">
                                      <Select
                                        // defaultValue={selectedOption}
                                        onChange={setSelectedValue}
                                        // onChange={(selected) => {
                                        //   setSelectedOption(selected); console.log("country", selected)
                                        // setBillDetails(selectedOption)
                                        // }}
                                        options={options}
                                        isClearable={isClearable}
                                        isSearchable={isSearchable}
                                      />
                                    </div>
                                    <div className="">
                                      <Input
                                        type="text"
                                        className="mb-3 inputborder "
                                        placeholder="Your Business/ Freelancer Name"
                                        name="businessName"
                                        value={businessName}
                                        onChange={e => {
                                          handelBillDetailChange(e)
                                        }}
                                        // onChange={e => {
                                        //   setBusinessName(e.target.value)
                                        // }}
                                      />
                                    </div>

                                    <Row>
                                      <Col>
                                        <div>
                                          <Input
                                            type="email"
                                            className="mb-3"
                                            placeholder="Email(Optional)"
                                            name="email"
                                            value={email}
                                            onChange={e => {
                                              handelBillDetailChange(e)
                                            }}
                                          />
                                        </div>
                                      </Col>

                                      <Col>
                                        <div>
                                          <Input
                                            type="text"
                                            className="mb-3"
                                            placeholder="Phone(Optional)"
                                            name="phone"
                                            value={phone}
                                            onChange={e => {
                                              handelBillDetailChange(e)
                                            }}
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                    {/* Gst Pan */}
                                    <Row>
                                      <Col sm={12} lg={6}>
                                        <div>
                                          <Input
                                            type="text"
                                            className="mb-3"
                                            placeholder="Client Gstin (Optional)"
                                            name="GST"
                                            value={GST}
                                            onChange={e => {
                                              handelBillDetailChange(e)
                                            }}
                                          />
                                        </div>
                                      </Col>

                                      <Col sm={12} lg={6}>
                                        <div>
                                          <Input
                                            type="text"
                                            className="mb-3"
                                            placeholder="Client PAN(Optional)"
                                            name="pan"
                                            value={pan}
                                            onChange={e => {
                                              handelBillDetailChange(e)
                                            }}
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                    <div>
                                      <Input
                                        type="text"
                                        className="mb-3"
                                        placeholder="Address(Optional)"
                                        name="address"
                                        value={address}
                                        onChange={e => {
                                          handelBillDetailChange(e)
                                        }}
                                      />
                                    </div>
                                    <Row>
                                      <Col>
                                        <div>
                                          {/* <Input type='text' className="mb-3 border-top-0 border-start-0  border-end-0 border-dark" placeholder="City(Optional)"/> */}
                                          <Input
                                            type="text"
                                            className="mb-3"
                                            placeholder="City(Optional)"
                                            name="city"
                                            value={city}
                                            onChange={e => {
                                              handelBillDetailChange(e)
                                            }}
                                          />
                                        </div>
                                      </Col>
                                      <Col>
                                        <div>
                                          <Input
                                            type="text"
                                            className="mb-3"
                                            placeholder="Postal Code / Zip Code"
                                            name="zip"
                                            value={zip}
                                            onChange={e => {
                                              handelBillDetailChange(e)
                                            }}
                                          />
                                        </div>
                                      </Col>
                                    </Row>

                                    <div>
                                      <Input
                                        type="text"
                                        className="mb-3"
                                        placeholder="State(Optional)"
                                        name="state"
                                        value={state}
                                        onChange={e => {
                                          handelBillDetailChange(e)
                                        }}
                                      />
                                    </div>

                                    {/* <Button
                                      className="mx-2 mb-2 bg-primary"
                                      onClick={() => AddEmail()}
                                    >
                                      Add Email{" "}
                                    </Button>
                                    <Button
                                      className="mx-2 mb-2 bg-primary"
                                      onClick={() => AddPhone()}
                                    >
                                      Add Phone Number{" "}
                                    </Button>
                                    <Button
                                      className="mx-2 mb-2 bg-primary"
                                      onClick={() => AddGST()}
                                    >
                                      Add GST{" "}
                                    </Button>
                                    <Button
                                      className="mx-2 mb-2 bg-primary"
                                      onClick={() => AddPan()}
                                    >
                                      Add PAN
                                    </Button> */}
                                    {/* <Button className="mx-2 mb-2" onClick={()=>AddCustom()}>Add Custom Field </Button> */}
                                    {/* <i class="fa-solid fa-phone fa-beat-fade" style="color: #8025da;"></i> */}
                                  </CardBody>
                                </Card>
                              </Col>
                              {/* Billed To */}
                              <Col lg={6} sm={12}>
                                <div>
                                  {" "}
                                  <h3> Billed To:</h3>{" "}
                                  <span>(Clients Details)</span>{" "}
                                </div>
                                <Card className="border border-primary">
                                  {/* <div><h1> Billed By: </h1></div> */}
                                  <CardBody>
                                    <div className="mb-3">
                                      <Select
                                        // defaultValue={selectedOption2}
                                        onChange={setSelectedValueClient}
                                        options={options}
                                        isClearable={isClearable}
                                        isSearchable={isSearchable}
                                      />
                                    </div>
                                    <div>
                                      <Input
                                        type="text"
                                        className="mb-3"
                                        placeholder="Client Business Name (Required)"
                                        name="clientBusinessName"
                                        value={clientBusinessName}
                                        onChange={e => {
                                          handelBillDetailChange(e)
                                        }}
                                      />
                                    </div>

                                    <Row>
                                      <Col>
                                        <div>
                                          <Input
                                            type="email"
                                            className="mb-3"
                                            placeholder="Email(Optional)"
                                            name="clientEmail"
                                            value={clientEmail}
                                            onChange={e => {
                                              handelBillDetailChange(e)
                                            }}
                                          />
                                        </div>
                                      </Col>

                                      <Col>
                                        <div>
                                          <Input
                                            type="text"
                                            className="mb-3"
                                            placeholder="Phone(Optional)"
                                            name="clientPhone"
                                            value={clientPhone}
                                            onChange={e => {
                                              handelBillDetailChange(e)
                                            }}
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                    {/* Gst Pan */}
                                    <Row>
                                      <Col sm={12} lg={6}>
                                        <div>
                                          <Input
                                            type="text"
                                            className="mb-3"
                                            placeholder="Client Gstin (Optional)"
                                            name="clientGST"
                                            value={clientGST}
                                            onChange={e => {
                                              handelBillDetailChange(e)
                                            }}
                                          />
                                        </div>
                                      </Col>

                                      <Col sm={12} lg={6}>
                                        <div>
                                          <Input
                                            type="text"
                                            className="mb-3"
                                            placeholder="Client PAN(Optional)"
                                            name="clientPan"
                                            value={clientPan}
                                            onChange={e => {
                                              handelBillDetailChange(e)
                                            }}
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                    <div>
                                      <Input
                                        type="text"
                                        className="mb-3"
                                        placeholder="Address(Optional)"
                                        name="clientAddress"
                                        value={clientAddress}
                                        onChange={e => {
                                          handelBillDetailChange(e)
                                        }}
                                      />
                                    </div>
                                    <Row>
                                      <Col>
                                        <div>
                                          <Input
                                            type="text"
                                            className="mb-3"
                                            placeholder="City(Optional)"
                                            name="clientCity"
                                            value={clientCity}
                                            onChange={e => {
                                              handelBillDetailChange(e)
                                            }}
                                          />
                                        </div>
                                      </Col>
                                      <Col>
                                        <div>
                                          <Input
                                            type="text"
                                            className="mb-3"
                                            placeholder="Postal Code / Zip Code"
                                            name="clientZip"
                                            value={clientZip}
                                            onChange={e => {
                                              handelBillDetailChange(e)
                                            }}
                                          />
                                        </div>
                                      </Col>
                                    </Row>

                                    <div>
                                      <Input
                                        type="text"
                                        className="mb-3"
                                        placeholder="State(Optional)"
                                        name="clientState"
                                        value={clientState}
                                        onChange={e => {
                                          handelBillDetailChange(e)
                                        }}
                                      />
                                    </div>

                                    {/* <Button
                                      className="mx-2 mb-2 bg-primary"
                                      onClick={() => AddEmail2()}
                                    >
                                      Add Email{" "}
                                    </Button>
                                    <Button
                                      className="mx-2 mb-2 bg-primary"
                                      onClick={() => AddPhone2()}
                                    >
                                      Add Phone Number{" "}
                                    </Button>
                                    <Button
                                      className="mx-2 mb-2 bg-primary"
                                      onClick={() => AddGST2()}
                                    >
                                      Add GST{" "}
                                    </Button>
                                    <Button
                                      className="mx-2 mb-2 bg-primary"
                                      onClick={() => AddPan2()}
                                    >
                                      Add PAN
                                    </Button> */}
                                    {/* <Button className="mx-2 mb-2" onClick={()=>AddCustom2()}>Add Custom Field </Button> */}
                                  </CardBody>
                                </Card>
                              </Col>
                            </Row>
                          </Container>
                          {/* end billing card */}
                          <Row>
                            <div className="display-wrap border border-primary container mx-2">
                              <Button
                                className="mx-5 mb-2 mt-2 bg-dark"
                                onClick={() => AddTax()}
                              >
                                {" "}
                                Add TAX{" "}
                              </Button>
                              <Button className="mx-5 mb-2 mt-2 bg-dark">
                                {" "}
                                Add Currency{" "}
                              </Button>
                              <Button className="mx-5 mb-2 mt-2 bg-dark">
                                {" "}
                                Number Currency Format
                              </Button>
                              <Button className="mx-5 mb-2 mt-2 bg-dark">
                                {" "}
                                Rename Add Field{" "}
                              </Button>
                            </div>
                          </Row>
                          {/* Item Field */}
                          <div>
                            <Card className="bg-primary mt-3" fluid>
                              <Row>
                                {/* d-sm-none */}
                                <Col lg={2}>
                                  <CardTitle
                                    tag="h5"
                                    className="mt-3 mb-2 mx-2 text-white"
                                    id="element-item"
                                  >
                                    <h5> &nbsp; Item &nbsp;</h5>
                                  </CardTitle>
                                </Col>
                                {showTax && (
                                  <Col lg={1}>
                                    <CardTitle
                                      tag="h5"
                                      className="mt-3 mb-3 mx-2 text-white "
                                      id="element-to-hide"
                                    >
                                      <h5>Tax %</h5>
                                    </CardTitle>
                                  </Col>
                                )}

                                <Col lg={2}>
                                  <CardTitle
                                    tag="h5"
                                    className="mt-3 mb-3 mx-2 text-white"
                                    id="element-to-hide"
                                  >
                                    <h5>Quantity</h5>
                                  </CardTitle>
                                </Col>

                                <Col lg={1}>
                                  <CardTitle
                                    tag="h5"
                                    className="mt-3 mb-3 mx-2 text-white "
                                    id="element-to-hide"
                                  >
                                    <h5>Rate</h5>
                                  </CardTitle>
                                </Col>
                                <Col lg={2}>
                                  <CardTitle
                                    tag="h5"
                                    className="mt-3 mb-3 mx-2 text-white"
                                    id="element-to-hide"
                                  >
                                    <h5>Amount</h5>
                                  </CardTitle>
                                </Col>
                                {showTax && (
                                  <Col lg={1}>
                                    <CardTitle
                                      tag="h5"
                                      className="mt-3 mb-3 mx-2 text-white "
                                      id="element-to-hide"
                                    >
                                      <h5>IGST</h5>
                                    </CardTitle>
                                  </Col>
                                )}
                                <Col lg={2}>
                                  <CardTitle
                                    tag="h5"
                                    className="mt-3 mb-3 mx-2 text-white"
                                    id="element-to-hide"
                                  >
                                    <h5>(Total + Tax)</h5>
                                  </CardTitle>
                                </Col>
                              </Row>
                            </Card>
                          </div>
                          <div>
                            {ItemField?.map((item, index) => {
                              return (
                                <>
                                  <div key={index}>
                                    <Card className="border border-primary">
                                      <CardBody>
                                        <Row>
                                          <Col lg={12}>
                                            {" "}
                                            <i
                                              className="dripicons-cross font-size-24 float-end"
                                              // onClick={() => {
                                              //   const newarray = ItemField.filter((i, j) => {
                                              //     return index !== j
                                              //   })
                                              //   setItemField(newarray)
                                              // }}
                                              onClick={removeItemField}
                                            ></i>{" "}
                                          </Col>

                                          <Col sm={12} lg={2}>
                                            {" "}
                                            <Input
                                              name="itemName"
                                              value={item.itemName}
                                              className="mb-3 mt-3"
                                              placeholder="Item"
                                              type="text"
                                              onChange={e => {
                                                handelItemField(e, index)
                                              }}
                                            />{" "}
                                          </Col>
                                          {showTax && (
                                            <Col sm={12} lg={1}>
                                              {" "}
                                              <Input
                                                name="itemTax"
                                                value={item.itemTax}
                                                className="mb-3 mt-3"
                                                placeholder="TAX %"
                                                type="text"
                                                onChange={e => {
                                                  handelItemField(e, index)
                                                }}
                                              />{" "}
                                            </Col>
                                          )}

                                          <Col sm={12} lg={2}>
                                            {" "}
                                            <Input
                                              name="itemQuantity"
                                              value={item.itemQuantity}
                                              type="text"
                                              className="mb-3 mt-3"
                                              placeholder="Quantity"
                                              onChange={e => {
                                                handelItemField(e, index)
                                              }}
                                            />{" "}
                                          </Col>
                                          <Col sm={12} lg={1}>
                                            {" "}
                                            <Input
                                              name="itemRate"
                                              value={item.itemRate}
                                              className="mb-3 mt-3"
                                              placeholder="rate"
                                              type="text"
                                              onChange={e => {
                                                handelItemField(e, index)
                                              }}
                                            />{" "}
                                          </Col>
                                          <Col sm={12} lg={2}>
                                            {" "}
                                            <Input
                                              name="itemAmount"
                                              value={item.itemAmount}
                                              className="mb-3 mt-3"
                                              placeholder="Amount"
                                              type="text"
                                              onChange={e => {
                                                handelItemField(e, index)
                                              }}
                                            />{" "}
                                          </Col>
                                          {showTax && (
                                            <Col sm={12} lg={1}>
                                              {" "}
                                              <Input
                                                name="IGST"
                                                value={item.IGST}
                                                className="mb-3 mt-3"
                                                placeholder="IGST "
                                                type="text"
                                                onChange={e => {
                                                  handelItemField(e, index)
                                                }}
                                              />{" "}
                                            </Col>
                                          )}
                                          <Col sm={12} lg={2}>
                                            {" "}
                                            <Input
                                              name="total"
                                              value={item.total}
                                              className="mb-3 mt-3"
                                              placeholder="total"
                                              type="text"
                                              onChange={e => {
                                                handelItemField(e, index)
                                              }}
                                            />{" "}
                                          </Col>
                                        </Row>
                                        {/* <Input value={item} className="mb-3 mt-3  " placeholder="Add Description" /> */}
                                      </CardBody>
                                    </Card>
                                  </div>
                                </>
                              )
                            })}
                            <button
                              type="button"
                              onClick={() => {
                                setItemField([
                                  ...ItemField,
                                  {
                                    itemName: "",
                                    itemQuantity: "",
                                    itemRate: " ",
                                    itemAmount: "",
                                  },
                                ])
                              }}
                              className="btn btn-outline-primary mb-2 mt-2 container"
                            >
                              <span className="text-center  font-size-16">
                                Add New Line
                              </span>
                            </button>
                          </div>
                          <div>
                            <Card
                              sm={12}
                              lg={6}
                              className="float-end border mt-2"
                            >
                              <CardBody>
                                {showDiscount && (
                                  <>
                                    <Row>
                                      <Col lg={3} sm={3}>
                                        {" "}
                                        <i
                                          className="dripicons-cross font-size-24 float-end"
                                          onClick={() => {
                                            setShowDiscount("")
                                            setHideDiscountButton(true)
                                            setDiscount("")
                                          }}
                                        ></i>
                                      </Col>
                                      <Col>
                                        <div>
                                          <Input
                                            type="text"
                                            className="mb-3"
                                            placeholder="Add discount over all products"
                                            name="discount"
                                            value={discount}
                                            onChange={e => ApplyDiscount(e)}
                                            // onChange={(e) => e.target.value}
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                  </>
                                )}
                                {hideDiscountButton && (
                                  <Button
                                    onClick={() => {
                                      AddDiscount()
                                      setHideDiscountButton(false)
                                    }}
                                  >
                                    Add Discount
                                  </Button>
                                )}

                                <hr className="border border-dark" />
                                {showTax && (
                                  <h2>Total Tax : {calculateTotalTax()}</h2>
                                )}
                                {showDiscount && <h3>Discount : {discount}</h3>}
                                <h1>Total (INR): {calculateTotalAmount()}</h1>
                                <hr className="border border-dark" />
                                {/* convertNumberToWords */}
                                <h4>Show Total In Words:</h4>
                              </CardBody>
                            </Card>
                          </div>

                          <Row>
                            <div className="display-wrap  container mx-2">
                              {hideTermButton && (
                                <Button
                                  className="mx-5 mb-2 mt-2 bg-dark "
                                  onClick={e => {
                                    AddTermCondition(e)
                                  }}
                                >
                                  {" "}
                                  Add Term & Condition{" "}
                                </Button>
                              )}
                              {/* <Button className="mx-5 mb-2 mt-2 bg-dark"  > Add Contact Details  </Button> */}
                              {hideSignatureButton && (
                                <Button
                                  className="mx-5 mb-2 mt-2 bg-dark"
                                  onClick={e => {
                                    AddSignature(e)
                                  }}
                                >
                                  {" "}
                                  Add Signature{" "}
                                </Button>
                              )}
                              {showSignature && (
                                <div>
                                  <Card
                                    sm={12}
                                    lg={6}
                                    className="float-end border"
                                  >
                                    <CardBody>
                                      <Col lg={12}>
                                        {" "}
                                        <i
                                          className="dripicons-cross font-size-24 float-end"
                                          onClick={() => {
                                            setShowSignature("")
                                            setHideSignatureButton(true)
                                          }}
                                        ></i>{" "}
                                      </Col>
                                      <div>
                                        <Card className="mt-2 mb-2">
                                          <CardBody>
                                            <Label
                                              for="signature"
                                              className=" mt-2 mb-2 mx-2 my-2  text-center"
                                            >
                                              {" "}
                                              <h4> + Upload Signature</h4>{" "}
                                            </Label>
                                            <Input
                                              type="file"
                                              className="d-none "
                                              id="signature"
                                              name="signature"
                                              onChange={e => {
                                                handelUploadSignature(e)
                                              }}
                                            />
                                            <div className="float-end mx-2 mt-2 mb-2">
                                              {signature && (
                                                <>
                                                  <Col lg={12}>
                                                    <i
                                                      className="dripicons-cross font-size-24 float-end"
                                                      onClick={() => {
                                                        setSignature(null)
                                                      }}
                                                    ></i>{" "}
                                                  </Col>
                                                  <img
                                                    className="texm-sm-center text-lg-center "
                                                    src={URL.createObjectURL(
                                                      signature
                                                    )}
                                                    alt="logo"
                                                    style={{
                                                      width: "100px",
                                                      height: "60px",
                                                    }}
                                                  />
                                                </>
                                              )}
                                              {signatureData && (
                                                <>
                                                  <Col lg={12}>
                                                    {" "}
                                                    <i
                                                      className="dripicons-cross font-size-24 float-end "
                                                      onClick={() => {
                                                        setLogo("")
                                                        setImgdata("")
                                                      }}
                                                    ></i>{" "}
                                                  </Col>
                                                  <img
                                                    // src={
                                                    //   signature
                                                    //     ? previewSignature
                                                    //     : `${host}/${signatureData}`
                                                    // }
                                                    src={
                                                      signatureData
                                                        ? `${host}/${imgdata}`
                                                        : previewSignature
                                                    }
                                                    alt="xyz"
                                                    style={{
                                                      width: "130px",
                                                      height: "70px",
                                                    }}
                                                  />
                                                </>
                                              )}
                                            </div>
                                          </CardBody>
                                        </Card>
                                      </div>
                                      <Card className="mt-2">
                                        <CardBody>
                                          {" "}
                                          <h4 className=" mt-2 mb-2">
                                            Use Signature Pad
                                          </h4>
                                          <Label
                                            for="signatureLabel"
                                            className="mt-2 mb-2 "
                                          >
                                            Add Signature Label
                                          </Label>
                                          <Input
                                            type="text"
                                            id="signatureLabel"
                                            name="signatureLabel"
                                            value={signatureLabel}
                                            // onChange={e => {
                                            //   const { name, value } = e.target
                                            //   setSignatureLabel({
                                            //     ...signatureLabel,
                                            //     [name]: value,
                                            //   })
                                            //   console.log(
                                            //     signatureLabel,
                                            //     "signatureLabel"
                                            //   )
                                            // }}
                                            onChange={e => {
                                              handelBillDetailChange(e)
                                            }}
                                          />
                                        </CardBody>
                                      </Card>
                                    </CardBody>
                                  </Card>
                                </div>
                              )}
                            </div>
                          </Row>

                          {showTermCondition && (
                            <div>
                              <Card sm={12} lg={12} className="border">
                                <CardBody>
                                  <Col lg={12}>
                                    {" "}
                                    <i
                                      className="dripicons-cross font-size-24 float-end"
                                      onClick={() => {
                                        setShowTermCondition("")
                                        setHideTermButton(true)
                                      }}
                                    ></i>{" "}
                                  </Col>
                                  <CardTitle>Terms And Conditions</CardTitle>
                                  <ol>
                                    <li>
                                      {" "}
                                      <Input
                                        type="text"
                                        className="mb-2"
                                        name="term"
                                        value={termCondition.term}
                                        onChange={e => {
                                          handelTermCondition(e)
                                        }}
                                      />{" "}
                                    </li>
                                    <li>
                                      {" "}
                                      <Input
                                        type="text"
                                        name="term2"
                                        value={termCondition.term2}
                                        onChange={e => {
                                          handelTermCondition(e)
                                        }}
                                      />{" "}
                                    </li>
                                  </ol>
                                </CardBody>
                              </Card>
                            </div>
                          )}

                          {/* update button */}
                          <div
                            className="display-wrap text-center"
                            // style={{padding:'10px', margin:'10px', diplay:'flex', flexDirection:'row'}} hide
                          >
                            <Button
                              className="mt-5 mb-2 bottom-center bg-danger "
                              onClick={e => {
                                handelOnUpdate(id.id)
                              }}
                            >
                              Save & Continue
                            </Button>
                          </div>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </Row>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={e => {
              handelOnUpdate(id.id)
            }}
          >
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default EditModal
