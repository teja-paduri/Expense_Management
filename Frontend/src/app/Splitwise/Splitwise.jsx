import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import CurrencySidebar from './../common/CurrencySidebar';

import { currencyApiEndpoints } from './../../API';
import { setItem } from './../../Helpers';
import { useTracked } from './../../Store';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import * as dayjs from 'dayjs';

import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { ProgressSpinner } from 'primereact/progressspinner';

// import CurrencySidebar from '../common/CurrencySidebar';
// import ExpenseListItem from '../expense/ExpenseListItem';
// import IncomeListItem from '../income/IncomeListItem';
import { authApiEndpoints } from './../../API';
import { expenseApiEndpoints, incomeApiEndpoints, reportApiEndpoints,  } from './../../API';
import axios from './../../Axios';
import background from './../../assets/login_background.jpeg';


let messages; // For alert message

const addExpenseValidationSchema = yup.object().shape({
    expense_date: yup.string().required('Expense date field is required'),
    category: yup.string().required('Expense category field is required'),
    amount: yup.string().required('Expense amount field is required'),
    spent_on: yup.string().required('Spent on field is required').max(100, 'Spent on must be at most 100 characters'),
    // remarks: yup.string().max(200, 'Remarks must be at most 200 characters'),
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
  
    const toggleLanguage = useCallback(() => {
      i18n.language === 'en' ? i18n.changeLanguage('bn') : i18n.changeLanguage('en');
      setItem('language', i18n.language);
    }, [i18n]);

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
            <form>
            <div className="p-fluid">
                <input type="text" ref={register} placeholder="name" name="name" value= {uname} className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.description?.message}</p>
              </div>

            <div className="p-fluid">
                <input type="text" ref={register} placeholder="userid" name="userid" value= {uid} className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.description?.message}</p>
              </div>
              <div className="p-fluid">
                <Controller
                  name="expense_date"
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
                <input type="text" ref={register} placeholder="Enter the people names" name="category" className="p-inputtext p-component p-filled" />
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
                <input type="text" ref={register} placeholder="description" name="spent_on" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.description?.message}</p>
              </div>
              
              <div className="p-fluid">
                <Button type="submit" label="Add Expense" icon="pi pi-plus"
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