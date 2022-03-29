import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import * as yup from "yup";

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import { useTracked } from './../../Store';
document.body.setAttribute('style', 'background: white;');

let messages;

const passwordValidationSchema = yup.object().shape({
  old_password: yup.string().required('This field is required').min(6, 'Password must be at most 6 character'),
  new_password: yup.string().required('This field is required').min(6, 'Password must be at most 6 character'),
  confirm_password: yup.string().required('This field is required').oneOf([yup.ref('new_password')], 'Confirm password does not match')
});

const Profile = (props) => {

  const [state] = useTracked();
  const { register, handleSubmit, errors, reset } = useForm({
    validationSchema: passwordValidationSchema
  });
  const [submitting, setSubmitting] = useState(false);

  

  return (
    <div>
      <Helmet title="Profile" />

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
              <h3 className="color-highlight p-col-6">
                {/* {state.user.name} */}
              </h3>
            </div>
            <div className="p-grid p-nogutter p-justify-between">
              <h3 className="color-title p-col-6" style={{ color: "black" }}>
                Email:
                </h3>
              <h3 className="color-highlight p-col-6">
                {/* {state.user.email} */}
              </h3>
            </div>

            <div className="p-card-footer p-fluid">
              <Link to={'/profile/edit'}>
                <Button label="Edit" className="" icon="pi pi-pencil" />
              </Link>
            </div>
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

            <form onSubmit={handleSubmit()}>
              <div className="p-fluid">
                <input type='password' name='old_password' ref={register} autoComplete="off" placeholder="Old Password" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.old_password?.message}</p>
              </div>
              <div className="p-fluid">
                <input type='password' name='new_password' ref={register} autoComplete="off" placeholder="New Password" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.new_password?.message}</p>
              </div>
              <div className="p-fluid">
                <input type='password' name='confirm_password' ref={register} autoComplete="off" placeholder="Confirm Password" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.confirm_password?.message}</p>
              </div>
              <div className="p-fluid">
                <Button disabled={submitting} type="submit" label="Change Password" icon="pi pi-key"
                  className="p-button-raised" />
              </div>
            </form>
          </Card>
        </div>  
        </div> 
    </div>

  )
}

export default Profile;
