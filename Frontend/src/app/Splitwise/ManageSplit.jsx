import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';


import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

import { authApiEndpoints } from './../../API';
import { expenseApiEndpoints, incomeApiEndpoints, reportApiEndpoints,  } from './../../API';
import axios from './../../Axios';
import { useTracked } from './../../Store';
import background from './../../assets/login_background.jpeg';

let messages;

const addExpenseValidationSchema = yup.object().shape({
  timestamp: yup.string().required('Expense date field is required'),
  borrowers: yup.string().required('borrowers field is required'),
  amount: yup.string().required(' amount field is required'),
  description: yup.string().required('description field is required').max(100, 'Spent on must be at most 100 characters'),

});

const Dashboard = (props) => {

  const [state] = useTracked();
  const { register, handleSubmit, setValue, errors, setError, reset, control } = useForm({
    validationSchema: addExpenseValidationSchema
  });
  const [submitting, setSubmitting] = useState(false);
  const [currencyVisible, setCurrencyVisible] = useState(false);
  const [recentExpense, setRecentExpense] = useState({ expense: [], expenseLoading: true });
  const [recentIncome, setRecentIncome] = useState({ income: [], incomeLoading: true });
  const [monthlyExpenseSummary, setMonthlyExpenseSummary] = useState({});
  const [monthlyIncomeSummary, setMonthlyIncomeSummary] = useState({});
  const [expenseCategories, setExpenseCategories] = useState({});


  const submitExpense = (data) => {
    setSubmitting(true);
    axios.post(authApiEndpoints.paymentsplit,data)
      .then(response => {
        console.log('success');
        console.log(response.data);
        if (response.status === 200) {
          messages.clear();
          messages.show({ severity: 'success', detail: "Split Expense Added Successfully", sticky: true });
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
          setError(errors);
        }
        else {
          messages.show({ severity: 'error', detail: 'Something went wrong. Try again.', sticky: true });
        }

        setSubmitting(false);

      })
  };

  const uname = localStorage.getItem('name');
  const uid = localStorage.getItem('id');


  return (
    <div>
    
      <Helmet title="Dashboard" />
      {/* <CurrencySidebar visible={currencyVisible} onHide={(e) => setCurrencyVisible(false)} /> */}

      <div className="p-grid p-nogutter">
        <div className="p-col-12">
          <div className="p-fluid">
            <Messages ref={(el) => messages = el} />
          </div>
        </div>
      </div>

      <div className="p-grid">
        
      </div>

      <div className="p-grid p-nogutter p-align-center p-justify-center" >
        <div className="p-col-12 p-md-10 p-lg-4">
          <Card className="rounded-border">
            <div>
              <div className="p-card-title p-grid p-nogutter p-justify-between">Splitwise Info</div>
              <div className="p-card-subtitle">Enter the Split Amount and Names </div>
            </div>
            <br />
            <form onSubmit={handleSubmit(submitExpense)}>
            <div className="p-fluid">
                <input type="text" ref={register} placeholder="name" id='susername' name="username" value= {uname} className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.description?.message}</p>
              </div>

            <div className="p-fluid">
                <input type="text" ref={register} placeholder="userid" id='suserid' name="user_id" value= {uid} className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.description?.message}</p>
              </div>
              <div className="p-fluid">
                <Controller
                id='stimestamp'
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
                <input type="text" ref={register} placeholder="borrowers" id='sborrowers' name="borrowers" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.category?.message}</p>
              </div>
              <div className="p-fluid">
                <input type="text" ref={register} placeholder="description" id='sdescription' name="description" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.description?.message}</p>
              </div>
              <div className="p-fluid">
                <div className="p-inputgroup">
                  <input type="number" step="0.00" id='samount' ref={register} keyfilter="money" placeholder="Amount" name="amount" className="p-inputtext p-component p-filled" />
                  <Button
                    label={"$"}
                    type="button" />
                </div>
                <p className="text-error">{errors.amount?.message}</p>
              </div>
              <div className="p-fluid">
                <Button id='saddsplitexpense'disabled={submitting} type="submit" label="Add Split Expense" icon="pi pi-plus"
                  className="p-button-raised" />
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
    
  )
}

export default React.memo(Dashboard);
