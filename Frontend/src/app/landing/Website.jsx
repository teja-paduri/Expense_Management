import React from 'react'
import { Link } from 'react-router-dom';
import Image from '/Users/karthik/Documents/SE/Expense_Management/Frontend/src/Image.js';

import LandingLayout from './../layouts/LandingLayout';

const Website = (props) => {
  return (
    <LandingLayout>
      <div className="p-grid p-nogutter p-align-center p-justify-center" style={{ height: '95vh' }}>
        {/* <img src={require('./../../landing_logo.png')} alt="" style={{ height: '20vh' }} /> */}
        <div style={
          {
            marginLeft:20
          }
        }>
          <h1 className="color-title">Expense</h1>
          <h1 className="color-title">Management</h1>
          <p>
            <Link to="/login">Login</Link><span className="color-title"> | </span><Link to="/register">SignUp</Link>
          </p>
          <Image
                className=""
                src={require('./../../assets/images/expense_image.jpeg')}
                alt="Hero"
                width={600}
                height={400} /> 
        </div>
      </div>
    </LandingLayout>
  )
}

export default Website;
