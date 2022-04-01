import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';


import axios from './../../Axios';
import { useTracked } from './../../Store';

const updateProfileValidationSchema = yup.object().shape({
  name: yup.string().required('Name field is required').min(4, 'Name must be at most 4 character'),
  email: yup.string().required('Email field is required').min(6, 'Email must be at most 6 character'),
  currency: yup.object().required('Currency field is required'),
});
let messages;
const EditProfile = (props) => {
  const [state, setState] = useTracked();
  const { register, handleSubmit, errors, setValue, setError, control } = useForm({
    validationSchema: updateProfileValidationSchema
  });
  const [submitting, setSubmitting] = useState(false);



  const currencyTemplate = (option) => {
    return (<span><span className="color-highlight text-bold">{option.currency_code}</span> - {option.currency_name}</span>);
  };
  return (
    <div>
      <Helmet title="Edit Profile" />

      <div className="p-grid p-nogutter p-align-center p-justify-center" style={{ height: '30vh' }}>

        <div className="p-col-12">
          <div className="p-fluid">
            <Messages ref={(el) => messages = el} />
          </div>
        </div>
      </div>
      <div className="p-grid">
        <div className="p-col-12">
          <Card className="rounded-border">
            <div>
              <div className="p-card-title p-grid p-nogutter p-justify-between"style={{ color: "black" }}>Edit Profile</div>
              <div className="p-card-subtitle"style={{ color: "black" }}>Edit profile information below.</div>
            </div>
            <br />
            <form onSubmit={handleSubmit()}>
              <div className="p-fluid">
                <label htmlFor="name" style={{ color: "black" }}>Name</label>
                <input type="text" name="name" ref={register} className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.name?.message}</p>
              </div>
              <div className="p-fluid">
                <label htmlFor="email"style={{ color: "black" }}>Email</label>
                <input type="text" name="email" ref={register} className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.email?.message}</p>
              </div>
              <div className="p-fluid">
                <Button disabled={submitting} type="submit" label="Update Profile" icon="pi pi-refresh" className="p-button-raised" />
              </div>
            </form>
          </Card>
        </div>

      </div>
    </div>

  )
}

export default React.memo(EditProfile);
