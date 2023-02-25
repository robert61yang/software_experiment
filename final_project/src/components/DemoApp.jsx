import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import actionCreators from 'states/calendar-actions'
import { getHashValues } from 'utilities/utils'
import { Form, Input, Button, Label, FormGroup } from 'reactstrap'
import './DemoAPP.css';

class DemoApp extends React.Component {

  calendarRef = React.createRef();

  render() {
    return (
      <div className='demo-app'>
        <div className = 'spacecolor'><i className="fas fa-circle"> 橘廳</i><i className ="fas fa-circle"> 會議室</i><i className ="fas fa-circle">書房</i></div>
        <div className='demo-app-main'>
        { this.props.formvisible ? 
          <Form className='form-inline' onSubmit={this.handleSubmit.bind(this)}>
          <Label id = 'purpose'>租借用途 :</Label>
          <Input id = 'purpose-input' type='text' value={this.props.inputvalue} onChange={this.handleInputChange.bind(this)} placeholder = '填寫用途...'></Input>  
          <Label id = 'select' for="exampleSelect">空間 :</Label>
          <Input type="select" name="select" id="exampleSelect" onChange={this.handleOptionChange.bind(this)}>
          <option value = '1F' >會議室</option>
          <option value = '2F' >橘廳</option>
          <option value = '3F' >書房</option>
          </Input>
          <Button id = 'confirmbtn'>確認</Button>
          </Form>
          : null }
          <FullCalendar
            ref={this.calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            height='80%'
            allDaySlot={false}
            editable={false}
            eventOrder="groupId,startStr,-duration,allDay,title"
            slotEventOverlap={false}
            longPressDelay={300}
            eventOverlap={false}
            selectable={true}
            unselectAuto={false}
            selectMirror={true}
            dayMaxEvents={true}
            eventBorderColor='white'
            fixedWeekCount={false}
            weekends={this.props.weekendsVisible}
            datesSet={this.handleDates}
            select={this.handleDateSelect}
            events={this.props.events}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventAdd={this.handleEventAdd}
            eventChange={this.handleEventChange} // called for drag-n-drop/resize
            eventRemove={this.handleEventRemove}
          />
        </div>
      </div>
    )
  }
  
  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.props.weekendsVisible}
              onChange={this.props.toggleWeekends}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.props.events.length})</h2>
          <ul>
            {this.props.events.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }
  

  handleInputChange(e) {
    this.props.inPut(e.target.value)
  }

  handleOptionChange(e){
    this.props.selectGroup(e.target.value)
  }

  handleSubmit(e) {
    e.preventDefault();

    let calendarApi = this.calendarRef.current.getApi();

    let events = this.props.events;
    var i;
    for(i=0;i<events.length;i+=1){
      console.log(events[i]);
      if((this.props.group==events[i].groupId)&&(((this.props.start>=events[i].start)&&(this.props.start<=events[i].end))||((this.props.start<=events[i].start)&&(this.props.end>=events[i].start)))){
        alert('該時段場地已經被借走囉');
        this.props.hideForm();
        calendarApi.unselect();
        return;
      }
    }

    let color = (this.props.group=='1F')? '#99d3df': (this.props.group=='2F')? '#88bbd6' : (this.props.group=='3F')? '#c7d8c6' : '#ffffff';

    calendarApi.addEvent({ // will render immediately. will call handleEventAdd
      title: this.props.inputvalue,
      start: this.props.start,
      end: this.props.end,
      allDay: this.props.allday,
      diaplay: 'block',
      groupId: this.props.group,
      backgroundColor: color,
      
    }, true)

    this.props.hideForm();
    calendarApi.unselect();
  }

  // handlers for user actions
  // ------------------------------------------------------------------------------------------

  handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    if(selectInfo.view.type=='dayGridMonth'){
      calendarApi.changeView('timeGridDay', selectInfo.startStr);
    }else{
      this.props.showForm(selectInfo.startStr, selectInfo.endStr, selectInfo.allDay);
    }
    //let title = prompt('Please enter a new title for your event')

     // clear date selection

    /*
    if (title) {
      calendarApi.addEvent({ // will render immediately. will call handleEventAdd
        title,
        overlap: false,
        textcolor: 'yellow',
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      }, true) // temporary=true, will get overwritten when reducer gives new events
    }*/
  }

  handleEventClick = (clickInfo) => {
    let calendarApi = this.calendarRef.current.getApi()
    calendarApi.changeView('timeGridDay',clickInfo.startStr);
    if(clickInfo.event.username == this.props.curname){
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove() // will render immediately. will call handleEventRemove
      }
    }
    
  }

  // handlers that initiate reads/writes via the 'action' props
  // ------------------------------------------------------------------------------------------

  handleDates = (rangeInfo) => {
    this.props.requestEvents(rangeInfo.startStr, rangeInfo.endStr)
      .catch(reportNetworkError)
  }

  handleEventAdd = (addInfo) => {
    this.props.createEvent(addInfo.event.toPlainObject(), this.props.curname, this.props.curmail)
      .catch(() => {
        reportNetworkError()
        addInfo.revert()
      })
  }

  handleEventChange = (changeInfo) => {
    this.props.updateEvent(changeInfo.event.toPlainObject())
      .catch(() => {
        reportNetworkError()
        changeInfo.revert()
      })
  }

  handleEventRemove = (removeInfo) => {
    this.props.deleteEvent(removeInfo.event.id)
      .catch(() => {
        reportNetworkError()
        removeInfo.revert()
      })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
      

    </>
  )
}

function renderSidebarEvent(plainEventObject) {
  return (
    <li key={plainEventObject.id}>
      <b>{formatDate(plainEventObject.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{plainEventObject.title}</i>
    </li>
  )
}

function reportNetworkError() {
  alert('This action could not be completed')
}

function mapStateToProps() {
  const getEventArray = createSelector(
    (state) => state.eventsById,
    getHashValues
  )

  return (state) => {
    return {
      events: getEventArray(state),
      weekendsVisible: state.weekendsVisible,
      start: state.formVisible.start,
      end: state.formVisible.end,
      allday: state.formVisible.allday,
      formvisible: state.formVisible.formvisible,
      inputvalue: state.formVisible.inputvalue,
      group: state.formVisible.group,
      curname: state.main.curname,
      curmail: state.main.curmail
    }
  }
}

export default connect(mapStateToProps, actionCreators)(DemoApp)
