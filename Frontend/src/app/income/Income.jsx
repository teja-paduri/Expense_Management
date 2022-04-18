import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import * as yup from 'yup';
import * as dayjs from 'dayjs';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

import CurrencySidebar from './../common/CurrencySidebar';

import axios from './../../Axios';
import { incomeApiEndpoints } from './../../API';
import { useTracked } from './../../Store';

const StyledSwal = Swal.mixin({
  customClass: {
    container: 'container-class',
    popup: 'popup-class',
    header: 'header-class',
    title: 'p-card-title',
    content: 'content-class',
    closeButton: 'close-button-class',
    image: 'image-class',
    input: 'input-class',
    actions: 'actions-class',
    confirmButton: 'p-button p-button-raised p-button-danger p-button-text-icon-left',
    cancelButton: 'p-button p-button-raised p-button-info p-button-text-icon-left',
    footer: 'footer-class'
  },
  buttonsStyling: false
});

let messages;

const addIncomeValidationSchema = yup.object().shape({
  source: yup.string().required('Income source field is required').max(100, 'Income source must be at most 100 characters'),
  // category: yup.object().required('Income category field is required'),
  notes: yup.string().max(200, 'Income notes must be at most 200 characters'),
  amount: yup.string().required('Income amount field is required'),
});

const Income = (props) => {

  const [state] = useTracked();
  const { register, handleSubmit, setValue, errors, setError, reset, control } = useForm({
    validationSchema: addIncomeValidationSchema
  });
  const [datatable, setDatatable] = useState({
    sortField: 'id',
    sortOrder: -1,
    rowsPerPage: 5,
    currentPage: 1
  });
  const [currencyVisible, setCurrencyVisible] = useState(false);
  const [incomeSummary, setIncomeSummary] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [income, setIncome] = useState({ incomes: {}, fetching: true });
  const [incomeCategory,setIncomeCategory] = useState();
  const uid= localStorage.getItem('id');

  const setIncomeCategoryFun=(e)=>{
    setIncomeCategory(e);
  }
  const sendIncome = (data) => {
    setSubmitting(true);
    axios.post(incomeApiEndpoints.insertIncome,data)
      .then(response => {
        console.log('success');
        console.log(response.data);
        if (response.status === 200) {
          messages.clear();
          messages.show({ severity: 'success', detail: "Income Added Successfully", sticky: true });
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

  const renderIncomeSummary = (data) => {
    if (data && data.length > 0) {
      return data.map((item, index) => {
        return <div key={index}>
          <div className="color-link text-center">{item.total.toLocaleString()} <span className="color-title">{item.currency_code + '.'}</span></div>
          <hr />
        </div>
      })
    }
    else {
      return <div>
        <div className="text-center">No income data found.</div>
        <hr />
      </div>
    }
  };

  return (
    <div>
      <Helmet title="Income" />

      <CurrencySidebar visible={currencyVisible} onHide={(e) => setCurrencyVisible(false)} />

      <div className="p-grid p-nogutter">
        <div className="p-col-12">
          <div className="p-fluid">
            <Messages ref={(el) => messages = el} />
          </div>
        </div>
      </div>

      <div className="p-grid p-nogutter">
        <div className="p-col-12">
          <div className="p-fluid">

          </div>
        </div>
      </div>

      <div className="p-grid">

        <div className="p-col-12 p-md-6">
          <Card className="rounded-border">
            <div>
              <div className="p-card-title p-grid p-nogutter p-justify-between">Add Income</div>
              <div className="p-card-subtitle">Add your income information below.</div>
            </div>
            <br />
            <form onSubmit={handleSubmit(sendIncome)}>
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
                <p className="text-error">{errors.income_date?.message}</p>
              </div>
              
             < div className="p-fluid">
                <input type="text" ref={register} placeholder="Income Category" name="income_source" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.category?.message}</p>
              </div>
              <div className="p-fluid">
                <input type="text" ref={register} placeholder="Income Source" name="source" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.source?.message}</p>
              </div>
              <div className="p-fluid">
                <div className="p-inputgroup">
                  <input type="number" step="0.00" ref={register} keyfilter="money" placeholder="Amount" name="amount" className="p-inputtext p-component p-filled" />
                  <Button
                    label={`${state.currencies.length === 0 ? 'loading' : state.currentCurrency.currency_code}`}
                    type="button"
                    onClick={(e) => setCurrencyVisible(true)} />
                </div>
                <p className="text-error">{errors.amount?.message}</p>
              </div>
              <div className="p-fluid">
                <textarea ref={register} rows={5} placeholder="Income Notes" name="description" className="p-inputtext p-inputtextarea p-component p-inputtextarea-resizable" />
                <p className="text-error">{errors.notes?.message}</p>
              </div>
              <div className="p-fluid">
                <Button disabled={submitting} type="submit" label="Add Income" icon="pi pi-plus"
                  className="p-button-raised" />
              </div>
            </form>
          </Card>
        </div>

      </div>
    </div>

  )
}

export default React.memo(Income);