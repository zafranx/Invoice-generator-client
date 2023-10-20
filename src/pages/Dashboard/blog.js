// import React from "react"; // rough page
// import {
//   Container
// } from "reactstrap";
// //Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";

// //i18n
// import { withTranslation } from "react-i18next";
// const Blog = props => {

//   //meta title
//   document.title = "Blog | Skote - React Admin & Blog Template";

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           {/* Render Breadcrumb */}
//           <Breadcrumbs
//             title={props.t("blogs")}
//             breadcrumbItem={props.t("blog")}
//           />

//         <div className="text-center" > blogz </div>

//           blog zzzzzz
//           </Container>
//           </div>
//     </React.Fragment>
//   );
// };


// export default withTranslation()(Blog);

import React, { useState } from 'react';
import { Container } from "reactstrap";
import countrydata from '../Invoices/country_Data.json';


function Blog() {
  const [countryid, setCountryid] = useState('');
  const [state, setState] = useState([]);
  const [stateid, setStateid] = useState('');

  const handlecounty = (e) => {
    const getcountryId = e.target.value;
    const getStatedata = countrydata.find(country => country.country_id === getcountryId).states;
    setState(getStatedata);
    setCountryid(getcountryId);
    console.log(getcountryId);
  }

  const handlestate = (e) => {
    const stateid = e.target.value;
    console.log(stateid);
    setStateid(stateid);

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Get Country id" + countryid + " And " + stateid);
  }

  return (<React.Fragment>
    <Container className="content">
      <div className="row">
        <div className="col-sm-12">
          <h3 className='mt-3'>Select Country and State from JSON file in React js</h3>
          <form className="row g-3" onSubmit={handleSubmit}>

            <div className="col-md-3">
              <label className="form-label"> Country</label>
              <div className="text-dark">
                <select name='country' className='form-control' onChange={(e) => handlecounty(e)}>
                  <option value="">--Select Country--</option>
                  {
                    countrydata.map((getcountry, index) => (
                      <option value={getcountry.country_id} key={index}>{getcountry.country_name}</option>
                    ))

                  }


                </select>
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label"> State</label>
              <div className="text-dark">
                <select name='states' className='form-control' onChange={(e) => handlestate(e)}>
                  <option value="">--Select State--</option>
                  {
                    state.map((getstate, index) => (
                      <option value={getstate.state_id} key={index}>{getstate.state_name}</option>
                    ))
                  }


                </select>
              </div>
            </div>


            <div className="col-md-2" style={{ padding: '9px' }}>
              <label className="form-label"> </label>
              <div className="text-dark">
                <button name='submit' className='btn btn-success'>Submit</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </Container>

  </React.Fragment>);
}

export default Blog;