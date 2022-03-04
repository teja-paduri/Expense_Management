import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import { expenseApiEndpoints } from './../../API';
import axios from './../../Axios';

let messages;

const expenseCategoryValidationSchema = yup.object().shape({
  category_name: yup.string().required('Category name field is required').max(100, 'Category name must be at most 100 characters')
});

const EditExpenseCategory = (props) => {

  useEffect(() => {
  }, []);

  const { register, handleSubmit, errors, setError, setValue } = useForm({
    validationSchema: expenseCategoryValidationSchema
  });
  const [submitting, setSubmitting] = useState(false);

 

  return (
    <div>
      <Helmet title="Edit Expense" />

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
              <div className="p-card-title p-grid p-nogutter p-justify-between">Edit Expense Category</div>
              <div className="p-card-subtitle">Edit selected expense category information below.</div>
            </div>
            <br />
            <form onSubmit={handleSubmit()}>
              <div className="p-fluid">
                <label>Category Name</label>
                <div className="p-fluid">
                  <input type="text" ref={register} placeholder="Category name" name="category_name" className="p-inputtext p-component p-filled" />
                  <p className="text-error">{errors.category_name?.message}</p>
                </div>
              </div>
              <div className="p-fluid">
                <Button disabled={submitting} type="submit" label="Save Changes" icon="pi pi-save" className="p-button-raised" />
              </div>
            </form>
          </Card>
        </div>

      </div>
    </div>

  )
}

export default React.memo(EditExpenseCategory);
