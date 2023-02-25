import { combineReducers } from 'redux'
import { hashById } from 'utilities/utils'



export function weekendsVisible(weekendsVisible = true, action) {
  switch (action.type) {

    case 'TOGGLE_WEEKENDS':
      return !weekendsVisible

    default:
      return weekendsVisible
  }
}

export function eventsById(eventsById = {}, action) {
  switch (action.type) {

    case 'RECEIVE_EVENTS':
      return hashById(action.plainEventObjects)

    case 'CREATE_EVENT':
    case 'UPDATE_EVENT':
      return {
        ...eventsById,
        [action.plainEventObject.id]: action.plainEventObject
      }

    case 'DELETE_EVENT':
      eventsById = {...eventsById} // copy
      delete eventsById[action.eventId]
      return eventsById

    default:
      return eventsById
  }
}

const initForm = { 
  formvisible: false,
  start: null,
  end: null,
  allday: null,
  inputvalue: '',
  group: '1F'
}

export function formVisible(formVisible = initForm, action){
  switch(action.type) {
    case 'SHOW_FORM':
      return {
        ...formVisible,
        formvisible: action.formvisible,
        start: action.start,
        end: action.end,
        allday: action.allday
      }
    case 'HIDE_FORM':
      return {
        ...formVisible,
        formvisible: action.formvisible,
        start: action.start,
        end: action.end,
        allday: action.allday
      }
    case 'INPUT':
      return {
        ...formVisible,
        inputvalue: action.inputvalue
      }
    case 'GROUP':
      return{
        ...formVisible,
        group: action.group
      }

    default:
      return {
        formvisible: false,
        start: '',
        end: '',
        allday: false,
        inputvalue: ' ',
        group: '1F'
      }
  }
}
