import React from 'react';
import { Container, Table } from 'reactstrap';

const ListingPage = () => {
  const data = {
    "_id": {
      "$oid": "64b68603e446aaf3589ae6aa"
    },
    "invoicenumber": "a0001",
    "invoicedate": "2023-07-08",
    "duedate": "2023-07-29",
    "addfield": [
      { "name": "field1", "value": "value2" },
      { "name": "field2", "value": "value3" },
      { "name": "field3", "value": "value3" }
    ],
    "selectedoption": [],
    "businessname": "makfb",
    "email": "mailto:makfb@gmail.com",
    "phone": "01234556789",
    "gst": "axytoppgst",
    "pan": "ywu",
    "clientPhone": "1234567890",
    "clientGST": "SEWDE##@GST",
    "clientPan": "DWCC@PAN",
    "clientAddress": "MP",
    "clientCity": "Indore",
    "clientZip": "89102",
    "clientState": "Madhya Pradesh",
    "ItemField": [
      {
        "itemName": "website",
        "itemTax": "9",
        "itemQuantity": "10",
        "itemRate": "8000",
        "IGST": "7200.00",
        "itemAmount": "80000.00",
        "total": "87200.00"
      },
      {
        "itemName": "App",
        "itemQuantity": "5",
        "itemRate": "10000",
        "itemAmount": "50000.00",
        "IGST": "1500.00",
        "total": "51500.00",
        "itemTax": "3"
      },
      {
        "itemName": "website",
        "itemQuantity": "1",
        "itemRate": "10000",
        "itemAmount": "10000.00",
        "IGST": "3000.00",
        "total": "13000.00",
        "itemTax": "30"
      }
    ],
    "discount": "500",
    "signatureLabel": "Authorised Signatory",
    "termCondition": [
      {
        "term": "Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments.",
        "term2": "Please quote invoice number when remitting funds."
      }
    ],
    "date": {
      "$date": {
        "$numberLong": "1689683459051"
      }
    },
    "__v": {
      "$numberInt": "0"
    }
  };

  return (
    <Container>
      <h1>Invoice Details</h1>
      <Table>
        <tbody>
          <tr>
            <td>Invoice Number:</td>
            <td>{data.invoicenumber}</td>
          </tr>
          <tr>
            <td>Invoice Date:</td>
            <td>{data.invoicedate}</td>
          </tr>
          <tr>
            <td>Due Date:</td>
            <td>{data.duedate}</td>
          </tr>
          <tr>
            <td>Business Name:</td>
            <td>{data.businessname}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{data.email}</td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td>{data.phone}</td>
          </tr>
          <tr>
            <td>GST:</td>
            <td>{data.gst}</td>
          </tr>
          <tr>
            <td>PAN:</td>
            <td>{data.pan}</td>
          </tr>
          <tr>
            <td>Client Phone:</td>
            <td>{data.clientPhone}</td>
          </tr>
          <tr>
            <td>Client GST:</td>
            <td>{data.clientGST}</td>
          </tr>
          <tr>
            <td>Client PAN:</td>
            <td>{data.clientPan}</td>
          </tr>
          <tr>
            <td>Client Address:</td>
            <td>{data.clientAddress}</td>
          </tr>
          <tr>
            <td>Client City:</td>
            <td>{data.clientCity}</td>
          </tr>
          <tr>
            <td>Client Zip:</td>
            <td>{data.clientZip}</td>
          </tr>
          <tr>
            <td>Client State:</td>
            <td>{data.clientState}</td>
          </tr>
          <tr>
            <td>Discount:</td>
            <td>{data.discount}</td>
          </tr>
          <tr>
            <td>Signature Label:</td>
            <td>{data.signatureLabel}</td>
          </tr>
          <tr>
            <td>Add Fields:</td>
            <td>
              {data.addfield.map((field, index) => (
                <div key={index}>
                  {field.name}: {field.value}
                </div>
              ))}
            </td>
          </tr>
          <tr>
            <td>Item Fields:</td>
            <td>
              <Table>
                <thead>
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
                  {data.ItemField.map((item, index) => (
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
        </tbody>
      </Table>
    </Container>
  );
};

export default ListingPage;

