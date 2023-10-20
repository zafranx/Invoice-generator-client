import React, { useState } from "react"
import "./invoice.css"
import {
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
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"
import classnames from "classnames"
import { Link } from "react-router-dom"

import Select from "react-select"
import SignatureCanvas from "react-signature-canvas"
// image crop
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
//i18n
import { withTranslation } from "react-i18next"
// let converter = require('number-to-words');
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
var converter = require("number-to-words")
const Invoice = props => {
  //meta title
  document.title = "Invoice | Zaf - React Invoice"
  // nav item function
  const [activeTab, setactiveTab] = useState(1)
  const [activeTabVartical, setoggleTabVertical] = useState(1)

  const [passedSteps, setPassedSteps] = useState([1])
  const [passedStepsVertical, setPassedStepsVertical] = useState([1])

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab]
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab)
        setPassedSteps(modifiedSteps)
      }
    }
  }

  function toggleTabVertical(tab) {
    if (activeTabVartical !== tab) {
      var modifiedSteps = [...passedStepsVertical, tab]

      if (tab >= 1 && tab <= 4) {
        setoggleTabVertical(tab)
        setPassedStepsVertical(modifiedSteps)
      }
    }
  }
  // end nav

  // Define the convertNumberToWords function
  // function convertNumberToWords(number) {
  //   // if number present in object no need to go further
  //   if (number in numbersToWords) return numbersToWords[number];

  //   // Initialize the words variable to an empty string
  //   let words = "";

  //   // If the number is greater than or equal to 100, handle the hundreds place (ie, get the number of hundres)
  //   if (number >= 100) {
  //     // Add the word form of the number of hundreds to the words string
  //     words += convertNumberToWords(Math.floor(number / 100)) + " hundred";

  //     // Remove the hundreds place from the number
  //     number %= 100;
  //   }

  //   // If the number is greater than zero, handle the remaining digits
  //   if (number > 0) {
  //     // If the words string is not empty, add "and"
  //     if (words !== "") words += " and ";

  //     // If the number is less than 20, look up the word form in the numbersToWords object
  //     if (number < 20) words += numbersToWords[number];
  //     else {
  //       // Otherwise, add the word form of the tens place to the words string
  //       //if number = 37, Math.floor(number /10) will give you 3 and 3 * 10 will give you 30
  //       words += numbersToWords[Math.floor(number / 10) * 10];

  //       // If the ones place is not zero, add the word form of the ones place
  //       if (number % 10 > 0) {
  //         words += "-" + numbersToWords[number % 10];
  //       }
  //     }
  //   }

  //   // Return the word form of the number
  //   return words;
  // }

  // console.log(convertNumberToWords(123));

  // React Select for country
  const options = [
    { value: "India", label: "India" },
    { value: "China", label: "China" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Nepal", label: "Nepal" },
    { value: "Bangladesh", label: "Bangladesh" },
  ]
  const [selectedOption, setSelectedOption] = useState(null)
  const setSelectedValue = e => {
    setSelectedOption(e.value)
  }
  // console.log(selectedOption, "country")
  // fo bill to section
  const [selectedOption2, setSelectedOption2] = useState(null)
  // console.log(selectedOption2, "client_country")
  const setSelectedValueClient = e => {
    setSelectedOption2(e.value)
  }
  const [isClearable, setIsClearable] = useState(true)
  const [isSearchable, setIsSearchable] = useState(true)
  // console.log("selectedOption ,selectedOption2", selectedOption, selectedOption2)
  // end react select

  //  Billed by state
  // show email
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
  const [showTax, setShowTax] = useState(false)
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

  //  onChange Functions with their field state
  const [object, setObject] = useState({
    // logo: null,
    invoiceNumber: "A0001",
    invoiceDate: "",
    dueDate: "",
    // newField: [{ name: "", value: "" }],
  })
  const { invoiceNumber, invoiceDate, dueDate } = object

  const [logo, setLogo] = useState(null)
  const handelLogoChange = e => {
    setLogo(e.target.files[0])
    console.log("logo", logo)
  }

  const handelChangeObject = e => {
    setObject({ ...object, [e.target.name]: e.target.value })
    // let newField = [...addField]
    // newField[index][e.target.name] = e.target.value
    // setObject(newField)

    console.log(object, "obj")
  }

  // add more field after invoice date and invoice number
  // const [addField, setAddField] = useState([{ name: "", value: "" }])
  const [addField, setAddField] = useState([
    { name: "New Field", value: "Field Value" },
  ])

  const addFieldChange = (e, index) => {
    const newField = [...addField]
    newField[index][e.target.name] = e.target.value
    // setObject(newField)
    setAddField(newField)
    // console.log("newField", newField)
    console.log(addField, "addField")
  }
  //  Billed By state
  const [billDetails, setBillDetails] = useState({
    // selectedOption: "", selectedOption2: "",
    businessName: "kubozon",
    email: "kubozon@gmail.com",
    phone: "1234567890",
    GST: "APKHSHYBDSNND",
    pan: "JIGUUGHS99",
    address: "IND,22,city,",
    city: "City",
    zip: "Zip123",
    state: "StateMp",
    clientBusinessName: "Y.com",
    clientEmail: "Y@gmail.com",
    clientPhone: "09876543211",
    clientGST: "DDSHTYDSSW",
    clientPan: "JIGJJUUD00",
    clientAddress: "clientAddress",
    clientCity: "clientCity",
    clientZip: "clientZip123",
    clientState: "clientState#",
    signatureLabel: "signaturelabel",
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
      itemName: "Item Name",
      itemTax: "10",
      itemQuantity: "1",
      itemRate: "1",
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
    ItemField.forEach(item => {
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
    ItemField.forEach(item => {
      const IGST = parseFloat(item.IGST)
      if (!isNaN(IGST)) {
        totalTax += IGST
      }
    })
    return totalTax.toFixed(2)
  }

  const calculateTotalAmount = () => {
    let totalAmount = 0
    ItemField.forEach(item => {
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
  // const [signatureLabel, setSignatureLabel] = useState("")
  const [sign, setSign] = useState()
  const [url, setUrl] = useState()

  const handleClear = () => {
    sign.clear()
    setUrl("")
  }
  const handleGenerate = () => {
    setUrl(sign.getTrimmedCanvas().toDataURL("image/png"))
  }

  // url

  // submit api
  const host = process.env.REACT_APP_HOST || "http://localhost:8000"

  const handelOnSubmit22 = async e => {
    e.preventDefault()
    const response = await fetch(`${host}/api/invoice/submit_Invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify({
        // logo, signature,
        invoiceNumber,
        invoiceDate,
        dueDate,
        addField,
        selectedOption,
        businessName,
        email,
        phone,
        GST,
        pan,
        address,
        city,
        zip,
        state,
        selectedOption2,
        clientBusinessName,
        clientEmail,
        clientPhone,
        clientGST,
        clientPan,
        clientAddress,
        clientCity,
        clientZip,
        clientState,
        ItemField,
        discount,
        signatureLabel,
        termCondition,
      }),
    })
    const json = await response.json()
    console.log(json)
    if (response.status === 200) {
      toast("success", {
        type: "success",
        autoClose: 1000,
      })
    } else {
      toast("Error ", {
        type: "error",
        autoClose: 1000,
      })
    }
  }

  const handelOnSubmit = async e => {
    e.preventDefault()
    if (invoiceDate === "") {
      toast.error("InvoiceDate is Required !")
    } else if (dueDate === "") {
      toast.error("dueDate  is Required !")
    } else {
      const formData = new FormData()
      formData.append("logo", logo)
      formData.append("invoiceDate", invoiceDate)
      formData.append("invoiceNumber", invoiceNumber)
      formData.append("dueDate", dueDate)
      formData.append("addField", JSON.stringify(addField))
      // console.log(addField, "addfield")
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
      formData.append("clientAddress", clientAddress)
      formData.append("clientCity", clientCity)
      formData.append("clientState", clientState)
      formData.append("clientZip", clientZip)
      formData.append("ItemField", JSON.stringify(ItemField))
      formData.append("termCondition", JSON.stringify(termCondition))
      // console.log("termCondition", termCondition)
      // console.log(ItemField, "ItemField")
      formData.append("signature", url)
      formData.append("signatureLabel", signatureLabel)

      let response = await axios
        .post(`${host}/api/invoice/submit_Invoice`, formData, {
          headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
          },
          // body: JSON.stringify({ addField, ItemField },),
        })
        .then(response => {
          if (response.status == 200) {
            console.log(response)
            toast("Submitted successfully", {
              type: "success",
            })
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
  }
  // const handelOnSubmit = async e => {
  //   e.preventDefault()
  //   if (invoiceDate === "") {
  //     toast.error("InvoiceDate is Required !")
  //   }
  //   //  else if (dueDate === "") {
  //   //   toast.error("dueDate  is Required !")
  //   // }
  //   else {
  //     const formData = new FormData()
  //     // formData.append("logo", logo)
  //     formData.append("invoiceDate", invoiceDate)
  //     formData.append("invoiceNumber", invoiceNumber)
  //     formData.append("dueDate", dueDate)
  //     // formData.append("addField", JSON.stringify(addField))
  //     // // console.log(addField, "addfield")
  //     // formData.append("selectedOption", selectedOption)
  //     // formData.append("businessName", businessName)
  //     // formData.append("email", email)
  //     // formData.append("phone", phone)
  //     // formData.append("GST", GST)
  //     // formData.append("pan", pan)
  //     // formData.append("address", address)
  //     // formData.append("city", city)
  //     // formData.append("state", state)
  //     // formData.append("zip", zip)
  //     // formData.append("selectedOption2", selectedOption2)
  //     // formData.append("clientBusinessName", clientBusinessName)
  //     // formData.append("clientEmail", clientEmail)
  //     // formData.append("clientPhone", clientPhone)
  //     // formData.append("clientGST", clientGST)
  //     // formData.append("clientPan", clientPan)
  //     // formData.append("clientAddress", clientAddress)
  //     // formData.append("clientCity", clientCity)
  //     // formData.append("clientState", clientState)
  //     // formData.append("clientZip", clientZip)
  //     // formData.append("ItemField", JSON.stringify(ItemField))
  //     // formData.append("termCondition", JSON.stringify(termCondition))
  //     // // console.log("termCondition", termCondition)
  //     // // console.log(ItemField, "ItemField")
  //     // formData.append("signature", url)
  //     // formData.append("signatureLabel", signatureLabel)

  //     let response = await axios
  //       .post(`${host}/api/invoice/submit_Invoice`, formData,
  //         {
  //           headers: {
  //             // "Content-Type": "application/json",
  //             'Content-Type': 'multipart/form-data',
  //           },
  //           // body: JSON.stringify({ addField, ItemField },),
  //         }
  //       )
  //       .then(response => {
  //         if (response.status == 200) {
  //           console.log(response)
  //           toast("Submitted successfully", {
  //             type: "success",
  //           })
  //         }
  //       })
  //       .catch(error => {
  //         if (error && error.response);
  //         toast(error.response.data, {
  //           type: "error",
  //           autoClose: 3000,
  //           theme: "light",
  //         })
  //         console.log("error", error)
  //       })
  //     console.log("response", response)
  //   }
  // }

  const [src, setSrc] = useState(null)
  const [crop, setCrop] = useState({ aspect: 1 })

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener("load", () => setSrc(reader.result))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onImageLoaded = image => {
    setCrop({ aspect: 1, width: 50, height: 50 })
  }

  const onCropComplete = crop => {
    console.log(crop)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container
        // fluid
        >
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("invoice")}
            breadcrumbItem={props.t("invoice")}
          />

          <Row className="border">
            <Col lg={12}>
              <Row>
                <Card>
                  <CardBody>
                    <div className="wizard clearfix">
                      {/* <div className="text-center text-primary mt-2 d-block  text-decoration-underline mb-2">
                        {" "}
                        <h1>Invoice</h1>{" "}
                      </div> */}

                      <div className="steps clearfix">
                        <ul>
                          <NavItem
                            className={classnames({ current: activeTab === 1 })}
                          >
                            <NavLink
                              className={classnames({
                                current: activeTab === 1,
                              })}
                              onClick={() => {
                                setactiveTab(1)
                              }}
                              disabled={!(passedSteps || []).includes(1)}
                            >
                              <span className="number">1.</span> Invoice Details
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTab === 2 })}
                          >
                            <NavLink
                              className={classnames({
                                active: activeTab === 2,
                              })}
                              onClick={() => {
                                setactiveTab(2)
                              }}
                              disabled={!(passedSteps || []).includes(2)}
                            >
                              <span className="number">2.</span> Submit Details
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTab === 3 })}
                          >
                            <NavLink
                              className={classnames({
                                active: activeTab === 3,
                              })}
                              onClick={() => {
                                setactiveTab(3)
                              }}
                              disabled={!(passedSteps || []).includes(3)}
                            >
                              <span className="number">3.</span>Confirm Detail
                            </NavLink>
                          </NavItem>
                          {/*
                          <NavItem
                            className={classnames({ current: activeTab === 4 })}
                          >
                            <NavLink
                              className={classnames({ active: activeTab === 4 })}
                              onClick={() => {
                                setactiveTab(4)
                              }}
                              disabled={!(passedSteps || []).includes(4)}
                            >
                              <span className="number">4.</span> Confirm Detail
                            </NavLink>
                          </NavItem> */}
                        </ul>
                      </div>

                      {/* <div
                        className="display-wrap text-center"
                        // style={{padding:'10px', margin:'10px', diplay:'flex', flexDirection:'row'}} hide
                      >
                        <Button
                          className="mt-5 mb-2 bottom-center bg-danger "
                          onClick={e => {
                            handelOnSubmit(e)
                          }}
                        >
                          Save & Continue
                        </Button>
                      </div> */}

                      <div className="content clearfix">
                        <TabContent activeTab={activeTab} className="body">
                          <TabPane tabId={1}>
                            <Form
                              className="mt-3"
                              //  onClick={e => { e.preventDefault() }}
                            >
                              <Row>
                                <div className=" text-lg-center text-sm-center mx-2 mt-2 mb-2">
                                  {logo && (
                                    <>
                                      <Col lg={12}>
                                        {" "}
                                        <i
                                          className="dripicons-cross font-size-24 float-end "
                                          onClick={() => {
                                            setLogo("")
                                          }}
                                        ></i>{" "}
                                      </Col>
                                      <img
                                        src={URL.createObjectURL(logo)}
                                        alt="logo"
                                        style={{
                                          width: "130px",
                                          height: "70px",
                                        }}
                                      />
                                    </>
                                  )}
                                </div>
                                {/* <div>
                          <input type="file" accept="image/*" onChange={onSelectFile} />
                          {src && (
                            <ReactCrop
                              src={src}
                              crop={crop}
                              onImageLoaded={onImageLoaded}
                              onComplete={onCropComplete}
                              onChange={newCrop => setCrop(newCrop)}
                            />
                          )}
                        </div> */}

                                <FormGroup className="float-end">
                                  <Col>
                                    <div className="float-end ">
                                      <Label
                                        for="logo"
                                        className="mt-2 mb-2 border"
                                      >
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
                                  {/* <Col>
                            <div className="float-end mx-2 mt-2 mb-2">
                              {logo && (
                                <>
                                  <img src={URL.createObjectURL(logo)} alt="logo" style={{ width: "90px", height: "50px" }} />
                                </>
                              )}
                            </div>
                          </Col> */}
                                </FormGroup>

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
                                        onChange={e => {
                                          handelChangeObject(e)
                                        }}
                                      />
                                    </Col>
                                  </FormGroup>
                                  <div>
                                    {addField.map((field, index) => {
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
                                                      const newarr =
                                                        addField.filter(
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
                                        <i className="bx bx-plus font-size-14"></i>
                                        Add More Fields
                                      </span>
                                    </button>
                                  </div>
                                  {/* end 1st column */}
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
                                              //   setSelectedOption(value); console.log("your country", selected)
                                              //   // setBillDetails(selected)
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
                                            />
                                          </div>

                                          <Row>
                                            {showEmail && (
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
                                            )}
                                            {showPhone && (
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
                                            )}
                                          </Row>
                                          {/* Gst Pan */}
                                          <Row>
                                            {showGST && (
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
                                            )}
                                            {showPan && (
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
                                            )}
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

                                          <Button
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
                                          </Button>
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
                                              // onChange={(selected) => {
                                              //   setSelectedOption2(selected); console.log("country", selected)
                                              //   // setBillDetails(selected)
                                              // }}
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
                                            {showEmail2 && (
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
                                            )}
                                            {showPhone2 && (
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
                                            )}
                                          </Row>
                                          {/* Gst Pan */}
                                          <Row>
                                            {showGST2 && (
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
                                            )}
                                            {showPan2 && (
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
                                            )}
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

                                          <Button
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
                                          </Button>
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
                                  {ItemField.map((item, index) => {
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
                                                        handelItemField(
                                                          e,
                                                          index
                                                        )
                                                      }}
                                                    />{" "}
                                                  </Col>
                                                )}

                                                <Col sm={12} lg={1}>
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
                                                <Col sm={12} lg={2}>
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
                                                        handelItemField(
                                                          e,
                                                          index
                                                        )
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
                                                  onChange={e =>
                                                    ApplyDiscount(e)
                                                  }
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
                                        <h2>
                                          Total Tax : {calculateTotalTax()}
                                        </h2>
                                      )}
                                      {showDiscount && (
                                        <h3>Discount : {discount}</h3>
                                      )}
                                      <h1>
                                        Total (INR): {calculateTotalAmount()}
                                      </h1>
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
                                          setTermCondition({
                                            term: "Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments.",
                                            term2:
                                              "Please quote invoice number when remitting funds.",
                                          })
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
                                                    <h4>
                                                      {" "}
                                                      + Upload Signature
                                                    </h4>{" "}
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
                                                <div>
                                                  <div
                                                    style={{
                                                      border: "1px solid black",
                                                      width: 200,
                                                      height: 200,
                                                    }}
                                                  >
                                                    <SignatureCanvas
                                                      canvasProps={{
                                                        width: 200,
                                                        height: 200,
                                                        className: "sigCanvas",
                                                      }}
                                                      ref={data =>
                                                        setSign(data)
                                                      }
                                                    />
                                                  </div>

                                                  <br></br>
                                                  <Button
                                                    onChange={e => {
                                                      handleClear(e)
                                                    }}
                                                  >
                                                    Clear
                                                  </Button>
                                                  <Button
                                                    className="mx-2"
                                                    onChange={handleGenerate}
                                                  >
                                                    Save
                                                  </Button>

                                                  <br />
                                                  <br />
                                                  <img src={url} />
                                                </div>
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
                                              setTermCondition("")
                                              setHideTermButton(true)
                                            }}
                                          ></i>{" "}
                                        </Col>
                                        <CardTitle>
                                          Terms And Conditions
                                        </CardTitle>
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

                                <div
                                  className="display-wrap text-center"
                                  // style={{padding:'10px', margin:'10px', diplay:'flex', flexDirection:'row'}} hide
                                >
                                  <Button
                                    className="mt-5 mb-2 bottom-center bg-danger "
                                    onClick={e => {
                                      handelOnSubmit(e)
                                    }}
                                  >
                                    Save & Continue
                                  </Button>
                                </div>
                              </Row>
                            </Form>
                          </TabPane>
                          {/* <TabPane tabId={2}>
                          <div>
                            <Form>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-pancard-input5">
                                      PAN Card
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-pancard-input5"
                                      placeholder="Enter Your PAN No."
                                    />
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-vatno-input6">
                                      VAT/TIN No.
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-vatno-input6"
                                      placeholder="Enter Your VAT/TIN No."
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-cstno-input7">
                                      CST No.
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-cstno-input7"
                                      placeholder="Enter Your CST No."
                                    />
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-servicetax-input8">
                                      Service Tax No.
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-servicetax-input8"
                                      placeholder="Enter Your Service Tax No."
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-companyuin-input9">
                                      Company UIN
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-companyuin-input9"
                                      placeholder="Enter Your Company UIN"
                                    />
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-declaration-input10">
                                      Declaration
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="basicpill-Declaration-input10"
                                      placeholder="Declaration Details"
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </TabPane>
                      */}
                          <TabPane tabId={2}>
                            <div className="row justify-content-center">
                              <Col lg="6">
                                <div className="text-center">
                                  <div
                                    className="display-wrap text-center"
                                    // style={{padding:'10px', margin:'10px', diplay:'flex', flexDirection:'row'}} hide
                                  >
                                    <Button
                                      className="mt-5 mb-2 bottom-center bg-danger "
                                      onClick={e => {
                                        handelOnSubmit(e)
                                      }}
                                    >
                                      Save & Continue
                                    </Button>
                                  </div>
                                </div>
                              </Col>
                            </div>
                          </TabPane>
                          <TabPane tabId={3}>
                            <div className="row justify-content-center">
                              <Col lg="6">
                                <div className="text-center">
                                  <div className="mb-4">
                                    <i className="mdi mdi-check-circle-outline text-success display-4" />
                                  </div>
                                  <div>
                                    <h5>Confirm Detail</h5>
                                    <p className="text-muted">
                                      All details saved In database
                                    </p>
                                  </div>
                                </div>
                              </Col>
                            </div>
                          </TabPane>
                        </TabContent>
                      </div>

                      <div className="actions clearfix">
                        <ul>
                          <li
                            className={
                              activeTab === 1 ? "previous disabled" : "previous"
                            }
                          >
                            <Link
                              to="#"
                              onClick={() => {
                                toggleTab(activeTab - 1)
                              }}
                            >
                              Previous
                            </Link>
                          </li>
                          <li
                            className={
                              activeTab === 4 ? "next disabled" : "next"
                            }
                          >
                            <Link
                              to="#"
                              onClick={() => {
                                toggleTab(activeTab + 1)
                              }}
                            >
                              Next
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(Invoice)
