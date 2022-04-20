import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';


import { setItem } from './../../Helpers';
import { useTracked } from './../../Store';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import { Calendar } from 'primereact/calendar';
import { authApiEndpoints } from './../../API';
import { expenseApiEndpoints, incomeApiEndpoints, reportApiEndpoints,  } from './../../API';
import axios from './../../Axios';


let messages; // For alert message

const addExpenseValidationSchema = yup.object().shape({
    amount: yup.string().required('Expense amount field is required'),
    spent_on: yup.string().required('Spent on field is required').max(100, 'Spent on must be at most 100 characters'),
    
  });


  const uname = localStorage.getItem('name');
  const uid = localStorage.getItem('id');

const Splitwise = (props) => {
const { register, handleSubmit, setValue, errors, setError, reset, control } = useForm({
    validationSchema: addExpenseValidationSchema
  });
    const [state, setState] = useTracked();
    const [visible, setVisible] = useState(false);
    const [t, i18n] = useTranslation();
    const [submitting, setSubmitting] = useState(false);
    const toggleLanguage = useCallback(() => {
      i18n.language === 'en' ? i18n.changeLanguage('bn') : i18n.changeLanguage('en');
      setItem('language', i18n.language);
    }, [i18n]);

    const sendSplit = (data) => {
      console.log('ff')
      setSubmitting(true);
      axios.post(authApiEndpoints.paymentsplit,data)
        .then(response => {
          console.log('success');
          console.log(response.data);
          if (response.status === 200) {
            messages.clear();
            messages.show({ severity: 'success', detail: "split Added Successfully", sticky: true });
            reset();
            setSubmitting(false);
          }
  
        })
        .catch(error => {
          console.log('error', error.response);
  
          if (error.response.status === 422) {
            let errors = Object.entries(error.response.data).map(([key, value]) => {
              return { name: key, message: value[0] }
            });
            setError(errors);
          }
          else {
            messages.show({ severity: 'error', detail: 'Something went wrong. Try again.', sticky: true });
          }
  
          setSubmitting(false);
  
        })
    };

return(
<div>
<div className="p-grid p-nogutter p-align-center p-justify-center" >
        <div className="p-col-12 p-md-10 p-lg-4">
          <Card className="rounded-border">
            <div>
              <div className="p-card-title p-grid p-nogutter p-justify-between">Splitwise Info</div>
              <div className="p-card-subtitle">Enter the Split Amount and Names </div>
            </div>
            <br />
            <form onSubmit={handleSubmit(sendSplit)}>
            <div className="p-fluid">
                <input type="text" ref={register} placeholder="name" name="username" value= {uname} className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.description?.message}</p>
              </div>

            <div className="p-fluid">
                <input type="text" ref={register} placeholder="userid" name="user_id" value= {uid} className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.description?.message}</p>
              </div>
              <div className="p-fluid">
                <Controller
                  name="timestamp"
                  defaultValue={new Date()}
                  onChange={([e]) => {
                    // console.log(e);
                    return e.value;
                  }}
                  control={control}
                  as={
                    <Calendar
                      dateFormat="yy-mm-dd"
                      showTime={true}
                      hourFormat="12"
                      showButtonBar={true}
                      maxDate={new Date()}
                      touchUI={window.innerWidth < 768}
                    />
                  }
                />
                <p className="text-error">{errors.expense_date?.message}</p>
              </div>
              <div className="p-fluid">
                <input type="text" ref={register} placeholder="Enter the people names" name="borrowers" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.category?.message}</p>
              </div>
              <div className="p-fluid">
                <div className="p-inputgroup">
                  <input type="number" step="0.00" id='amountInputExpense' ref={register} keyfilter="money" placeholder="Amount" name="amount" className="p-inputtext p-component p-filled" />
                  <Button
                    label={"$"}
                    type="button" />
                </div>
                <p className="text-error">{errors.amount?.message}</p>
              </div>
              <div className="p-fluid">
                <input type="text" ref={register} placeholder="description" name="description" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.description?.message}</p>
              </div>
              
              <div className="p-fluid">
                <Button disabled={submitting} type="submit" label="Add Expense to Split" icon="pi pi-plus"
                  className="p-button-raised" />
              </div>
            </form>
          </Card>
        </div>
      </div>
      </div>
      )
    }

    export default React.memo(Splitwise);