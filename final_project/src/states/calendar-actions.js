import { requestEventsInRange, requestEventCreate, requestEventUpdate, requestEventDelete } from 'api/calendar-requests'
import {listEvents, createEvent, deleteEvent as DeleteEvent} from 'api/events.js'

export default {

  toggleWeekends() {
    return {
      type: 'TOGGLE_WEEKENDS'
    }
  },

  requestEvents(startStr, endStr) {
    return (dispatch) => {
      return requestEventsInRange(startStr, endStr).then((plainEventObjects) => {
        dispatch({
          type: 'RECEIVE_EVENTS',
          plainEventObjects
        })
      })
    }
  },

  createEvent(plainEventObject, username, usermail) {
    return (dispatch) => {
      return requestEventCreate(plainEventObject, username, usermail).then((newEventId) => {
        dispatch({
          type: 'CREATE_EVENT',
          plainEventObject: {
            id: newEventId,
            ...plainEventObject
          }
        })
      })
    }
  },

  updateEvent(plainEventObject) {
    return (dispatch) => {
      return requestEventUpdate(plainEventObject).then(() => {
        dispatch({
          type: 'UPDATE_EVENT',
          plainEventObject
        })
      })
    }
  },

  deleteEvent(eventId) {
    return (dispatch) => {
      return requestEventDelete(eventId).then(() => {
        dispatch({
          type: 'DELETE_EVENT',
          eventId
        })
      })
    }
  },

  showForm(start, end, allday){
    return{
      type: 'SHOW_FORM',
      formvisible: true,
      start: start,
      end: end,
      allday: allday
    }
  },

  hideForm(){
    return{
      type: 'HIDE_FORM',
      formvisible: false,
      start: '',
      end: '',
      allday: false,
      group: '1F'
    }
  },

  inPut(value){
    return{
      type: 'INPUT',
      inputvalue: value
    }
  },

  selectGroup(value){
    return{
      type: 'GROUP',
      group: value
    }
  }
}
