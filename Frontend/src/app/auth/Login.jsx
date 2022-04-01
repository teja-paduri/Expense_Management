import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';

import { Card } from "primereact/card";
import { Messages } from "primereact/messages";
import { Button } from "primereact/button";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import background from './../../assets/login_background.jpeg';

import LocaleToggle from './../locale/LocaleToggle';

import axios from './../../Axios';
import { setItem } from "./../../Helpers";
import { authApiEndpoints } from "./../../API";
import { useTracked } from './../../Store';

const loginValidationSchema = yup.object().shape({
  Email: yup.string().required('Email field is required.').email('Email must be a valid email.'),
  Password: yup.string().required('Password field is required.').min(6, 'Must be atleast 6 characters.'),
});

let messages; // For alert message

const Login = (props) => {

  const [state, setState] = useTracked();
  const [submitting, setSubmitting] = useState(false);

  // console.log('Login', state);

  // Login form handle
  const { register, handleSubmit, errors } = useForm({
    validationSchema: loginValidationSchema
  });

  const submitLogin = (data) => {

    messages.clear(); // Clear existing messages
    setSubmitting(true);
    // props.history.replace('/dashboard')
    console.log("Check for loop");

    axios.post(authApiEndpoints.login, JSON.stringify(data))
      .then(response => {
        console.log('success');
        console.log(response.data);

        if (response.status === 200) {
          localStorage.setItem("name",response.data.name);
          localStorage.setItem("email",response.data.email);
          localStorage.setItem("id",response.data.id);
          setState(prev => ({ ...prev, user: response.data.user}));
          props.location.state === undefined ? props.history.replace('/dashboard') : props.history.replace(props.location.state.from.pathname);
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 422) {
          messages.show({ severity: 'error', detail: 'Incorrect email or password.', sticky: true });
        }
        else {
          messages.show({ severity: 'error', detail: 'Something went wrong. Try again.', sticky: true });
        }
        setSubmitting(false);
      })
  };

  const myStyle={
    backgroundImage:`url(${background})`,
      height:'110vh',
      marginTop:'-70px',
      fontSize:'50px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      };

  return (
    <div>
      <Helmet title='Login' />
      <div style={myStyle} >
      <div className="p-grid p-nogutter p-align-center p-justify-center" style={{ height: '95vh' }}>
        <Card className="p-sm-12 p-md-6 p-lg-4" style={{ borderRadius: 5, minHeight: 65 }}>
          <div className="p-col-12 p-fluid">
            <Messages ref={(el) => messages = el} />
          </div>
          <div className="p-col-12">
            <div className="p-card-title p-grid p-nogutter p-justify-between">Login <LocaleToggle /></div>
            <div className="p-card-subtitle">Enter login credentials</div>
          </div>

          <form onSubmit={handleSubmit(submitLogin)}>
            <div className="p-col-12 p-fluid">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon"><i className="pi pi-envelope" /></span>
                <input id="emailInput" type="text" name="Email" placeholder={'Email'} ref={register} className="p-inputtext p-component p-filled" />
              </div>
              <p className="text-error">{errors.email?.message}</p>
            </div>
            <div className="p-col-12 p-fluid">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon"><i className="pi pi-key" /></span>
                <input id="passwordInput" type="password" name="Password" placeholder={'Password'} ref={register} className="p-inputtext p-component p-filled" />
              </div>
              <p id="passwordError" className="text-error">{errors.password?.message}</p>
            </div>
            <div className="p-col-12 p-fluid">
              <Button id="loginButton" disabled={submitting} type="submit" label={'Sign In'} icon="pi pi-sign-in" className="p-button-raised" />
            </div>
            <div className="p-grid p-nogutter p-col-12 p-justify-center">
              <Link to="/register">Register</Link>
            </div> 
          </form>
        </Card>
      </div>
    </div>
    </div>
  );
};

export default React.memo(Login);
