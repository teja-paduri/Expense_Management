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

import CurrencySidebar from './../common/CurrencySidebar';

import { expenseApiEndpoints } from './../../API';
import { useTracked } from './../../Store';
import axios from 'axios';


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

const Expense = (props) => {

  const [state] = useTracked();
  const [datatable, setDatatable] = useState({
    sortField: 'id',
    sortOrder: -1,
    rowsPerPage: 5,
    currentPage: 1
  });
  const [currencyVisible, setCurrencyVisible] = useState(false);
  const [expenseSummary, setExpenseSummary] = useState([{name:'Test',category:'stock',amount:'$200',date:'2022-04-16'},{name:'Test2',category:'stock',amount:'$400',date:'2022-04-16'}]);
  const [submitting, setSubmitting] = useState(false);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [expense, setExpense] = useState({ expenses: {}, fetching: true });

  const renderExpenseSummary = (data) => {
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
        <div className="text-center">No expense data found.</div>
        <hr />
      </div>
    }
  };


  // useEffect(async ()=>{
  //   var expenseData = await axios.get('/expense/get');
  //   if(expenseData.data)
  //   {
  //     expenseData =expenseData;
  //     setExpenseSummary(expenseData);
  //   }
  // })

  return (
    <div>
      <Helmet title="Expense" />

      <CurrencySidebar visible={currencyVisible} onHide={(e) => setCurrencyVisible(false)} />

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
            <div className='p-grid'>
              <div className='p-col-6'>
                <div className="p-card-title p-grid p-nogutter p-justify-between">View Expenses</div>
                <div className="p-card-subtitle">Here are few expenses you've added.</div>
              </div>
              <div className="p-col-6" align="right">
                {expense.fetching ? <ProgressSpinner style={{ height: '25px', width: '25px' }} strokeWidth={'4'} /> : ''}
              </div>
            </div>
            <br />
            <DataTable
              value={expenseSummary}
              sortField={datatable.sortField}
              sortOrder={datatable.sortOrder}
              responsive={true}
              paginator={true}
              rows={datatable.rowsPerPage}
              rowsPerPageOptions={[5, 10, 20]}
              totalRecords={expense.expenses.total}
              lazy={true}
              first={expense.expenses.from - 1}
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
                });
              }}
              className="text-center"
            >
              <Column field="name" header="Serial" sortable={true} />
              <Column field="category" header="Spent On" sortable={true} />
              <Column field="amount" header="Category" sortable={true} />
              <Column field="date" header="Amount" sortable={true}
                body={(rowData, column) => {
                  return rowData.amount.toLocaleString() + ' ' + rowData.currency_name
                }}
              />
              {/* <Column field="transaction_date" header="Date" sortable={true}
                body={(rowData, column) => {
                  return dayjs(rowData.transaction_date).format('YYYY-MM-DD hh:mm a')
                }}
              /> */}
              {/* <Column
                body={(rowData, column) => {
                  // console.log(rowData);
                  return (
                    <div>
                      <Link to={`/expense/${rowData.id}/edit`}>
                        <Button label="Edit" value={rowData.id}
                          icon="pi pi-pencil"
                          className="p-button-raised p-button-rounded p-button-info" />
                      </Link>
                      <Button label="Delete"
                        
                        icon="pi pi-trash"
                        className="p-button-raised p-button-rounded p-button-danger" />
                    </div>
                  )
                }}
                header="Action"
                style={{ textAlign: 'center', width: '8em' }}
              /> */}
            </DataTable>
          </Card>
        </div>

      </div>
    </div>

  )
}

export default Expense;