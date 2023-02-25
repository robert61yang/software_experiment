import axios from 'axios';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import '@babel/polyfill';

const todoKey = 'todos';
//const eventBaseUrl = 'http://weathermood-4.us-east-1.elasticbeanstalk.com/api'

// Develop server URL
const eventBaseUrl = 'ziwu.us-east-1.elasticbeanstalk.com/api';


export function listEvents(start, end) {
    let url = `${eventBaseUrl}/events`;
    if (start){
        url += `?start=${start}&end=${end}`;
    }

    console.log(`Making lGET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function createEvent(event, username) {
    let url = `${eventBaseUrl}/events`;

    console.log(`Making event request to: ${url}`);

    return axios.post(url, {
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allday,
        groupId: event.groupId,
        backgroundColor: event.backgroundColor,
        username
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function deleteEvent(id) {
    let url = `${eventBaseUrl}/events/del`;
    url += `?id=${id}`;

    console.log(`Making del request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}
/*
export function accomplishTodo(id) {
    let url = `${eventBaseUrl}/events/${id}`;

    console.log(`Making actodo request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
*/
