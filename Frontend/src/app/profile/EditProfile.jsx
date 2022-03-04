import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';


import axios from './../../Axios';
import { useTracked } from './../../Store';

const updateProfileValidationSchema = yup.object().shape({
  name: yup.string().required('Name field is required').min(4, 'Name must be at most 4 character'),
  email: yup.string().required('Email field is required').min(6, 'Email must be at most 6 character'),
  currency: yup.object().required('Currency field is required'),
});

let messages; // For alert message

const EditProfile = (props) => {

  const [state, setState] = useTracked();
  const { register, handleSubmit, errors, setValue, setError, control } = useForm({
    validationSchema: updateProfileValidationSchema
  });
  const [submitting, setSubmitting] = useState(false);

  // useEffect(() => {
  //   requestCurrencies();
  //   requestProfileInfo();
  // }, []);



  const currencyTemplate = (option) => {
    return (<span><span className="color-highlight text-bold">{option.currency_code}</span> - {option.currency_name}</span>);
  };

  return (
    <div>
      <Helmet title="Edit Profile" />

      <div className="p-grid p-nogutter">
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
              <div className="p-card-title p-grid p-nogutter p-justify-between">Edit Profile</div>
              <div className="p-card-subtitle">Edit current profile information below.</div>
            </div>
            <br />
            <form onSubmit={handleSubmit()}>
              <div className="p-fluid">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" ref={register} className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.name?.message}</p>
              </div>
              <div className="p-fluid">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" ref={register} className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.email?.message}</p>
              </div>
              <div className="p-fluid">
                <label>Currency</label>
                <Controller
                  name="currency"
                  onChange={([e]) => {
                    setState(prev => ({ ...prev, currentCurrency: e.value }));
                    return e.value;
                  }}
                  defaultValue={state.currency}
                  control={control}
                  as={
                    <Dropdown
                      filter={true}
                      filterBy="currency_code,currency_name"
                      filterPlaceholder="Search here"
                      showClear={true}
                      filterInputAutoFocus={false}
                      options={state.currencies}
                      style={{ width: '100%' }}
                      itemTemplate={currencyTemplate}
                      placeholder="Select a currency"
                      optionLabel="currency_code"
                    />
                  }
                />
                <p className="text-error">{errors.currency?.message}</p>
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
