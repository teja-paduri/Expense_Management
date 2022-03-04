import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import * as yup from 'yup';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Column } from 'primereact/column';

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

const expenseCategoryValidationSchema = yup.object().shape({
  category_name: yup.string().required('Category name field is required').max(100, 'Category name must be at most 100 characters'),
});

const ExpenseCategory = (props) => {

  const { register, handleSubmit, reset, errors, setError } = useForm({
    validationSchema: expenseCategoryValidationSchema
  });
  const [datatable, setDatatable] = useState({
    sortField: 'id',
    sortOrder: -1,
    rowsPerPage: 5,
    currentPage: 1
  });
  const [expenseCategories, setExpenseCategories] = useState({
    categories: {},
    fetching: true
  });
  const [submitting, setSubmitting] = useState(false);



  return (
    <div>
      <Helmet title="Expense Category" />

      <div className="p-grid p-nogutter">
        <div className="p-col-12">
          <div className="p-fluid">
            <Messages ref={(el) => messages = el} />
          </div>
        </div>
      </div>

      <div className="p-grid">

        <div className="p-col-12 p-md-6">
          <Card className="rounded-border">
            <div>
              <div className="p-card-title p-grid p-nogutter p-justify-between">Add Expense Category</div>
              <div className="p-card-subtitle">Enter expense category name below.</div>
            </div>
            <br />
            <form onSubmit={handleSubmit()}>
              <div className="p-fluid">
                <input type="text" ref={register} placeholder="Category name" name="category_name" className="p-inputtext p-component p-filled" />
                <p className="text-error">{errors.category_name?.message}</p>
              </div>
              <div className="p-fluid">
                <Button disabled={submitting} type="submit" label="Add Category" icon="pi pi-plus"
                  className="p-button-raised" />
              </div>
            </form>
          </Card>
        </div>

        <div className="p-col-12 p-md-6">
          <Card className="rounded-border">
            <div className='p-grid'>
              <div className='p-col-6'>
                <div className="p-card-title p-grid p-nogutter p-justify-between">View Expenses Categories</div>
                <div className="p-card-subtitle">Here are list of expense categories.</div>
              </div>
              <div className="p-col-6" align="right">
                {expenseCategories.fetching ? <ProgressSpinner style={{ height: '25px', width: '25px' }} strokeWidth={'4'} /> : ''}
              </div>
            </div>
            <br />
            <DataTable
              value={expenseCategories.categories.data}
              sortField={datatable.sortField}
              sortOrder={datatable.sortOrder}
              responsive={true}
              paginator={true}
              rows={datatable.rowsPerPage}
              rowsPerPageOptions={[5, 10, 20]}
              totalRecords={expenseCategories.categories.total}
              lazy={true}
              first={expenseCategories.categories.from - 1}
              onPage={(e) => {
                // console.log(e);
                setDatatable({
                  ...datatable,
                  currentPage: (e.page + 1),
                  rowsPerPage: e.rows,
                });
              }}
              onSort={e => {
                // console.log(e);
                setDatatable({
                  ...datatable,
                  sortField: e.sortField,
                  sortOrder: e.sortOrder,
                })
              }}
              className="text-center"
            >
              <Column field="id" header="Serial" sortable={true} />
              <Column field="category_name" header="Category Name" sortable={true} />
              <Column
                body={(rowData, column) => {
                  // console.log(rowData);
                  return (
                    <div>
                      <Link to={`/expense/category/${rowData.id}/edit`}><Button label="Edit"
                        value={rowData.id}
                        icon="pi pi-pencil"
                        className="p-button-raised p-button-rounded p-button-info" /></Link>
                      <Button label="Delete"
                      
                        icon="pi pi-trash"
                        className="p-button-raised p-button-rounded p-button-danger" />
                    </div>
                  )
                }}
                header="Action"
                style={{ textAlign: 'center', width: '8em' }}
              />
            </DataTable>
          </Card>
        </div>

      </div>
    </div>

  )
}

export default React.memo(ExpenseCategory);
