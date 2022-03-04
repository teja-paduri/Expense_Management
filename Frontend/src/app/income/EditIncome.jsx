import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm, Controller } from 'react-hook-form';
import * as dayjs from 'dayjs';
import * as yup from 'yup';

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

import CurrencySidebar from './../common/CurrencySidebar';

import axios from './../../Axios';
import { useTracked } from './../../Store';

let messages;

const editIncomeValidationSchema = yup.object().shape({
  income_date: yup.string().required('Income date field is required'),
  category: yup.object().required('Income category field is required'),
  source: yup.string().required('Spent on field is required').max(100, 'Spent on must be at most 100 characters'),
  amount: yup.number().required('Income amount field is required'),
  notes: yup.string().max(200, 'Remarks must be at most 200 characters'),
});

const EditIncome = (props) => {

  const [state, setState] = useTracked();
  const { register, handleSubmit, errors, setError, setValue, control } = useForm({
    validationSchema: editIncomeValidationSchema
  });
  const [submitting, setSubmitting] = useState(false);
  const [currencyVisible, setCurrencyVisible] = useState(false);
  const [incomeCategories, setIncomeCategories] = useState([]);

  useEffect(() => {
    
  }, []);


  return (
    <div>
      <Helmet title="Edit Income" />

      <CurrencySidebar visible={currencyVisible} onHide={(e) => setCurrencyVisible(false)} />

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
              <div className="p-card-title p-grid p-nogutter p-justify-between">Edit Income</div>
              <div className="p-card-subtitle">Edit selected income information below.</div>
            </div>
            <br />
            <form onSubmit={handleSubmit()}>
              <div className="p-fluid">
                <label>Income Date</label>
                <Controller
                  name="income_date"
                  onChange={([e]) => {
                    return e.value;
                  }}
                  control={control}
                  as={
                    <Calendar
                      dateFormat="yy-mm-dd"
                      showTime={true}
                      hourFormat="12"
                      showButtonBar={true}
                      touchUI={window.innerWidth < 768}
                    />
                  }
                />
                <p className="text-error">{errors.income_date?.message}</p>
              </div>
              <div className="p-fluid">
                <label>Income Category</label>
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
                      options={incomeCategories}
                      style={{ width: '100%' }}
                      placeholder="Income Category"
                      optionLabel="category_name"
                    />
                  }
                />
                <p className="text-error">{errors.category?.message}</p>
              </div>
              <div className="p-fluid">
                <label>Income Source</label>
                <input type="text" ref={register} name="source" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.source?.message}</p>
              </div>
              <div className="p-fluid">
                <label>Amount</label>
                <div className="p-inputgroup">
                  <input type="text" ref={register} placeholder="Amount" name="amount" className="p-inputtext p-component p-filled" />
                  <Button
                    label={`${state.currencies.length === 0 ? 'loading' : state.currentCurrency.currency_code}`}
                    type="button"
                    onClick={(e) => setCurrencyVisible(true)} />
                </div>
                <p className="text-error">{errors.amount?.message}</p>
              </div>
              <div className="p-fluid">
                <label>Income Notes</label>
                <textarea ref={register} rows={5} placeholder="" name="notes" className="p-inputtext p-inputtextarea p-component p-inputtextarea-resizable" />
                <p className="text-error">{errors.notes?.message}</p>
              </div>
              <div className="p-fluid">
                <Button disabled={submitting} type="submit" label="Save Changes" icon="pi pi-save"
                  className="p-button-raised" />
              </div>
            </form>
          </Card>
        </div>

      </div>
    </div>

  )
}

export default React.memo(EditIncome);
