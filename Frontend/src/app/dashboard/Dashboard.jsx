import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import * as dayjs from 'dayjs';

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

// import CurrencySidebar from '../common/CurrencySidebar';
// import ExpenseListItem from '../expense/ExpenseListItem';
// import IncomeListItem from '../income/IncomeListItem';
import { authApiEndpoints } from './../../API';
import { expenseApiEndpoints, incomeApiEndpoints, reportApiEndpoints, } from './../../API';
import axios from './../../Axios';
import { useTracked } from './../../Store';

let messages;

const addExpenseValidationSchema = yup.object().shape({
  expense_date: yup.string().required('Expense date field is required'),
  category: yup.string().required('Expense category field is required'),
  amount: yup.string().required('Expense amount field is required'),
  spent_on: yup.string().required('Spent on field is required').max(100, 'Spent on must be at most 100 characters'),
  // remarks: yup.string().max(200, 'Remarks must be at most 200 characters'),
});

const Dashboard = (props) => {

  const [state] = useTracked();
  const { register, handleSubmit, setValue, errors, setError, reset, control } = useForm({
    validationSchema: addExpenseValidationSchema
  });

  const addExpenseValidationSchema = yup.object().shape({
    expense_date: yup.string().required('Expense date field is required'),
    category: yup.object().required('Expense category field is required'),
    amount: yup.string().required('Expense amount field is required'),
    spent_on: yup.string().required('Spent on field is required').max(100, 'Spent on must be at most 100 characters'),
    remarks: yup.string().max(200, 'Remarks must be at most 200 characters'),
  });

  const [submitting, setSubmitting] = useState(false);
  const [currencyVisible, setCurrencyVisible] = useState(false);
  const [recentExpense, setRecentExpense] = useState({ expense: [], expenseLoading: true });
  const [recentIncome, setRecentIncome] = useState({ income: [], incomeLoading: true });
  const [monthlyExpenseSummary, setMonthlyExpenseSummary] = useState({});
  const [monthlyIncomeSummary, setMonthlyIncomeSummary] = useState({});
  const [expenseCategories, setExpenseCategories] = useState({});

  const category = [
    {name: 'Food', code: 'food'},
    {name: 'Travel', code: 'travel'},
    {name: 'Rent', code: 'rent'},
    {name: 'Miscellaneous', code: 'misc'},
    {name: 'Allowance', code: 'allowance'}
];

  const submitExpense = (data) => {
    data.category_id = data.category.id;
    data.currency_id = state.currentCurrency.id;
    data.expense_date = dayjs(data.expense_date).format('YYYY-MM-DD HH:mm:ss');
    setSubmitting(true);
    axios.post(authApiEndpoints.expense, data)
      .then(response => {
        console.log('success');
        console.log(response.data);
        if (response.status === 200) {
          messages.clear();
          messages.show({ severity: 'success', detail: "Expense Added Successfully", sticky: true });
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

  const renderSummary = (data) => {
    if (false) {
      return data.map((item, index) => {
        return <div key={index}>
          <div className="color-link text-center">{item.total.toLocaleString()} <span className="color-title">{item.currency_code + '.'}</span></div>
          <hr />
        </div>
      })
    }
    else if (false) {
      return Object.values(data).map((item, index) => {
        return <div key={index}>
          <div className="color-link text-center">{item.total.toLocaleString()} <span className="color-title">{item.currency_code + '.'}</span></div>
          <hr />
        </div>
      })
    }
    else {
      return <div>
        <div className="text-center">No transaction data found.</div>
        <hr />
      </div>
    }
  };

  const uname = localStorage.getItem('name');
  const uid = localStorage.getItem('id');



  return (
    <div style={{ background: "black" }}>
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
        <div className="p-col-12">
          <div className="p-fluid">
            <div className="p-grid" >
              <div className="p-col-6 p-md-3">
                <div className="p-panel p-component">
                  <div className="p-panel-titlebar"><span className="color-title text-bold">Total Expenses Last Month</span>
                  </div>
                  <div className="p-panel-content-wrapper p-panel-content-wrapper-expanded" id="pr_id_1_content"
                    aria-labelledby="pr_id_1_label" aria-hidden="false">
                    <div className="p-panel-content">
                      {renderSummary(monthlyExpenseSummary.expense_last_month)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-col-6 p-md-3">
                <div className="p-panel p-component">
                  <div className="p-panel-titlebar"><span className="color-title text-bold">Total Income Last Month</span>
                  </div>
                  <div className="p-panel-content-wrapper p-panel-content-wrapper-expanded" id="pr_id_1_content"
                    aria-labelledby="pr_id_1_label" aria-hidden="false">
                    <div className="p-panel-content">
                      {renderSummary(monthlyIncomeSummary.income_last_month)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-col-6 p-md-3">
                <div className="p-panel p-component">
                  <div className="p-panel-titlebar"><span className="color-title text-bold">Total Expenses This Month</span></div>
                  <div className="p-panel-content-wrapper p-panel-content-wrapper-expanded" id="pr_id_1_content"
                    aria-labelledby="pr_id_1_label" aria-hidden="false">
                    <div className="p-panel-content">
                      {renderSummary(monthlyExpenseSummary.expense_this_month)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-col-6 p-md-3">
                <div className="p-panel p-component">
                  <div className="p-panel-titlebar"><span className="color-title text-bold">Total Income This Month</span></div>
                  <div className="p-panel-content-wrapper p-panel-content-wrapper-expanded" id="pr_id_1_content"
                    aria-labelledby="pr_id_1_label" aria-hidden="false">
                    <div className="p-panel-content">
                      {renderSummary(monthlyIncomeSummary.income_this_month)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="p-grid p-nogutter p-align-center p-justify-center" >
        <div className="p-col-12 p-md-10 p-lg-4">
          <Card className="rounded-border">
            <div>
              <div className="p-card-title p-grid p-nogutter p-justify-between">Expenses Info</div>
              <div className="p-card-subtitle">Enter your expenses </div>
            </div>
            <br />
            <form onSubmit={handleSubmit(submitExpense)}>
              <div className="p-fluid">
                <input type="text" ref={register} placeholder="name" name="name" value={uname} className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.description?.message}</p>
              </div>

              <div className="p-fluid">
                <input type="text" ref={register} placeholder="userid" name="userid" value={uid} className="p-inputtext p-component p-filled" />
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
                <input type="text" ref={register} placeholder="category" name="category" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.category?.message}</p>
              </div>
              <div className="p-fluid">
                <input type="text" ref={register} placeholder="description" name="spent_on" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.description?.message}</p>
              </div>
              <div className="p-fluid">
                <Controller
                  name="category"
                  onChange={([e]) => {
                    return e.value
                  }}
                  control={control}
                  as={
                    <Dropdown
                      filter={true}
                      filterPlaceholder="Search here"
                      showClear={true}
                      filterInputAutoFocus={false}
                      options={category}
                      style={{ width: '100%' }}
                      placeholder="Expense Category"
                      optionLabel="name"
                    />
                  }
                />
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
                <Button disabled={submitting} type="submit" label="Add Expense" icon="pi pi-plus"
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
