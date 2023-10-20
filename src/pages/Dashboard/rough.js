import React, { useState } from 'react';

const YourComponent = () => {
    const [formData, setFormData] = useState({
        logo: "",
        invoice_number: "",
        date: "",
        dueDate: "",
        newField: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleAddField = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            newField: [...prevFormData.newField, { name: "", value: "" }],
        }));
    };

    const handleFieldChange = (e, index) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const newFields = [...prevFormData.newField];
            newFields[index] = { ...newFields[index], [name]: value };
            return { ...prevFormData, newField: newFields };
        });
    };

    const handleRemoveField = (index) => {
        setFormData((prevFormData) => {
            const newFields = prevFormData.newField.filter((_, i) => i !== index);
            return { ...prevFormData, newField: newFields };
        });
    };

    const handelOnSubmit = async e => {
        e.preventDefault()
        // const { logo, invoiceDate, invoiceNumber, dueDate, businessName, email, phone, GST, pan, address, city, state, zip, email2, phone2, GST2, pan2, address2, city2, state2, zip2, } = data
        const formData = new FormData()
        formData.append("logo", logo)
        formData.append("invoiceDate", invoiceDate)
        formData.append("invoiceNumber", invoiceNumber)
        formData.append("dueDate", dueDate)
        formData.append("addField", addField)
        console.log(addField, "addfield")
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
        formData.append("clientAddress", clientAddress)
        formData.append("clientCity", clientCity)
        formData.append("clientState", clientState)
        formData.append("clientZip", clientZip)
        formData.append("ItemField", ItemField)
        formData.append("termCondition", termCondition)
        console.log("termCondition", termCondition)
        console.log(ItemField, "ItemField")
        formData.append("signature", signature)

        let response = await axios
            .post(`${host}/api/invoice/submit_Invoice`, formData,
                {
                    headers: {
                        // "Content-Type": "application/json",
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
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
    return (
        <form onSubmit={handleSubmit}>
            {/ Business Logo /}
            <input
                name="logo"
                type="file"
                onChange={handleChange}
            />

            <label>
                Invoice No.
                <input
                    name="invoice_number"
                    type="text"
                    value={formData.invoice_number}
                    onChange={handleChange}
                />
            </label>

            <label>
                Invoice date
                <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                />
            </label>

            <label>
                Due Date
                <input
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleChange}
                />
            </label>

            <div>
                {formData.newField.map((field, index) => (
                    <div key={index}>
                        <input
                            name="name"
                            value={field.name}
                            placeholder="Enter Field Name"
                            type="text"
                            onChange={(e) => handleFieldChange(e, index)}
                        />

                        <input
                            name="value"
                            value={field.value}
                            placeholder="Enter Field Value"
                            type="text"
                            onChange={(e) => handleFieldChange(e, index)}
                        />

                        <button type="button" onClick={() => handleRemoveField(index)}>
                            Remove Field
                        </button>
                    </div>
                ))}

                <button type="button" onClick={handleAddField}>
                    Add Field
                </button>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default YourComponent;
