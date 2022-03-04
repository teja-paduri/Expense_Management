import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

import { Messages } from 'primereact/messages';
import { Card } from 'primereact/card';
import { FullCalendar } from 'primereact/fullcalendar';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import ExpenseListItem from './../expense/ExpenseListItem';

import { expenseApiEndpoints, reportApiEndpoints, incomeApiEndpoints } from './../../API';
import axios from './../../Axios';

let messages;

const TransactionCalendar = (props) => {

  const [events, setEvents] = useState({ events: [], eventsLoading: true });
  const [transactionsByDate, setTransactionByDate] = useState({ transactions: [], transactionsLoading: true });
  const [modalVisible, setModalVisible] = useState(false);
  const eventInfo = useRef({ id: null, type: null });

  useEffect(() => {
  
  }, []);

  const options = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    defaultView: 'dayGridMonth',
    themeSystem: 'standard',
    height: 'auto',
    titleFormat: { year: 'numeric', month: 'long' },
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      list: 'List'
    },
    header: {
      left: 'dayGridMonth,listWeek', // timeGridWeek,timeGridDay
      center: 'title',
      right: 'today,prev,next' // prevYear,nextYear
    },
    editable: false,
    dateClick: (info) => {
      // console.log(info);
      // info.dayEl.style.backgroundColor = '#fcf8e3';
      // console.log('Clicked on: ' + info.dateStr);
      // console.log('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      // console.log('Current view: ' + info.view.type);
    },
    eventClick: (info) => {
      eventInfo.current = { id: `${info.event.id}%`, type: info.event.extendedProps.type };
      setModalVisible(true);
    },
  };

  const renderTransactionDetails = () => {
    if (transactionsByDate.transactionsLoading) {
      return (
        <div className="p-grid p-nogutter p-justify-center">
          <ProgressSpinner style={{ height: '25px' }} strokeWidth={'4'} />
        </div>
      );
    }
    else {
      if (transactionsByDate.transactions.length > 0) {
        return transactionsByDate.transactions.map((item, index) => {
          return <ExpenseListItem key={item.id} itemDetail={item} />;
        })
      }
      else {
        return (
          <div className="p-grid p-nogutter p-justify-center">
            <h4 className="color-subtitle">Failed to retrieve data.</h4>
          </div>
        );
      }
    }
  };

  



  return (
    <div>
      <Helmet title="Calendar" />

      <div className="p-grid p-nogutter">
        <div className="p-col-12">
          <div className="p-fluid">
            <Messages ref={(el) => messages = el} />
          </div>
        </div>
      </div>

      <Dialog
        header="Transaction Detail"
        visible={modalVisible}
        style={{ width: '80%' }}
        modal={true}
        onShow={() => {
          // requestTransactionDetail(eventInfo.current.id, eventInfo.current.type);
        }}
        onHide={() => {
          setTransactionByDate({
            ...transactionsByDate,
            transactions: [],
            transactionsLoading: true
          });
          setModalVisible(false);
        }}
        dismissableMask={true}
      >
        {renderTransactionDetails()}
      </Dialog>

      <div className="p-grid">

        <div className="p-col-12">
          <Card className="rounded-border">
            <div className='p-grid'>
              <div className='p-col-6'>
                <div className="p-card-title p-grid p-nogutter p-justify-between">Transactions +/-</div>
                <div className="p-card-subtitle">Detail of your daily incomes and expenses.</div>
              </div>
              <div className="p-col-6" align="right">
                {events.eventsLoading ? <ProgressSpinner style={{ height: '25px', width: '25px' }} strokeWidth={'4'} /> : ''}
              </div>
            </div>
            <br />
            <div>
              <FullCalendar events={events.events} options={options} />
            </div>
          </Card>
        </div>

      </div>
    </div>

  )
}

export default React.memo(TransactionCalendar);
