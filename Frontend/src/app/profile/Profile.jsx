import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import * as yup from "yup";

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import background from './../../assets/login_background.jpeg';
import { authApiEndpoints } from "./../../API";
import { useTracked } from './../../Store';
import axios from './../../Axios';
document.body.setAttribute('style', 'background: black;');

let messages;

const passwordValidationSchema = yup.object().shape({
  new_password: yup.string().required('This field is required').min(6, 'Password must be at most 6 character'),
  password: yup.string().required('This field is required').oneOf([yup.ref('new_password')], 'Confirm password does not match')
});

const Profile = (props) => {

  const [state] = useTracked();
  const { register, handleSubmit, errors, reset } = useForm({
    validationSchema: passwordValidationSchema
  });
  const [submitting, setSubmitting] = useState(false);
  const profileData = (data) => {
    axios.post(authApiEndpoints.userData+"userID", JSON.stringify(data))
      .then(response => {
        if (response.status === 200) {

        }
      })
      .catch(error => {
        if (error.response && error.response.status === 422) {
          messages.show({ severity: 'error', detail: 'Incorrect email or password.', sticky: true });
        }
        else {
          messages.show({ severity: 'error', detail: 'Something went wrong. Try again.', sticky: true });
        }
      })
  };
  const uid = localStorage.getItem('id');
  const myStyle={
    backgroundImage:`url(${background})`,
      height:'110vh',
      marginTop:'-70px',
      fontSize:'50px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      };

      const updatePwd = (data) => {
        setSubmitting(true);
        axios.post(authApiEndpoints.updatePwd,data)
          .then(response => {
            console.log('success');
            console.log(response.data);
            if (response.status === 200) {
              messages.clear();
              messages.show({ severity: 'success', detail: "Password updated successfully", sticky: true });
              reset();
              setSubmitting(false);

              
            }
    
          })
          .catch(error => {
            console.log('error', error.response);
    
            if (error.response.status === 422) {
              // Set validation errors returned from backend
              let errors = Object.entries(error.response.data).map(([key, value]) => {
                return { name: key, message: value[0] }
              });
              // setError(errors);
            }
            else {
              messages.show({ severity: 'error', detail: 'Something went wrong. Try again.', sticky: true });
            }
    
            setSubmitting(false);
    
          })
      };

  return (
    <div>
      <Helmet title="Profile" />
      <div style={myStyle} >

      <div className="p-grid p-nogutter">
        <div className="p-col-12">
          <div className="p-fluid">
            <Messages ref={(el) => messages = el} />
          </div>
        </div>
      </div>

      <div className="p-grid p-nogutter p-align-center p-justify-center" style={{ height: '50vh' }}>

        <div className="p-col-12 p-md-6">
          <Card className="rounded-border">
            <div>
              <div className="p-card-title" style={{ color: "black" }}>Profile Info</div>
            </div>
            <div className="p-grid p-nogutter p-justify-between">
              <h3 className="color-title p-col-6" style={{ color: "black" }}>
                Name:
                </h3>
              <h3 className="p-col-6">
                {/* {state.user.name} */}
                {localStorage.getItem('name')}
              </h3>
            </div>
            <div className="p-grid p-nogutter p-justify-between">
              <h3 className="color-title p-col-6" style={{ color: "black" }}>
                Email:
                </h3>
              <h3 className="p-col-6">
                {/* {state.user.email} */}
                {localStorage.getItem('email')}
              </h3>
            </div>

            {/* <div className="p-card-footer p-fluid">
              <Link to={'/profile/edit'}>
                <Button label="Edit" className="" icon="pi pi-pencil" />
              </Link>
            </div> */}
          </Card>
        </div>
        </div>
      
      <div className="p-grid p-nogutter p-align-center p-justify-center" style={{ height: '10vh' }}>

        <div className="p-col-12 p-md-6">
          <Card className="rounded-border">
            <div>
              <div className="p-card-title" style={{ color: "black" }}>Password Info</div>
              <div className="p-card-subtitle" style={{ color: "black" }}>Manage your current password here.</div>
            </div>
            <br />

            <form onSubmit={handleSubmit(updatePwd)}>
            <div className="p-fluid">
                <input type="text" ref={register} placeholder="userid" id='puserid' name="userid" value= {uid} className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.description?.message}</p>
              </div>
              <div className="p-fluid">
                <input type='password' name='new_password' ref={register} id='pnewpassword' autoComplete="off" placeholder="New Password" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.new_password?.message}</p>
              </div>
              <div className="p-fluid">
                <input type='password' name='password' ref={register} id='pconfirmpassword'autoComplete="off" placeholder="Confirm Password" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.confirm_password?.message}</p>
              </div>
              <div className="p-fluid">
                <Button id='pchangepassword' disabled={submitting} type="submit" label="Change Password" icon="pi pi-key"
                  className="p-button-raised" />
              </div>
            </form>
          </Card>
        </div>  
        </div> 
    </div>

    </div>

  )
}

export default Profile;