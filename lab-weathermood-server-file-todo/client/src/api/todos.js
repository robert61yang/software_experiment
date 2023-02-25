import axios from 'axios';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import '@babel/polyfill';

const todoKey = 'todos';
const todoBaseUrl = 'http://weathermood-4.us-east-1.elasticbeanstalk.com/api'

// Develop server URL
//const todoBaseUrl = 'http://localhost:8080/api';


export function listTodos(unaccomplishedOnly = false, searchText = '') {
    let url = `${todoBaseUrl}/todos`;
    url += `?unaccomplishedOnly=${unaccomplishedOnly}`;
    if (searchText){
        url += `&searchText=${searchText}`;
    }


    console.log(`Making lGET request to: ${url}`);
    console.log(unaccomplishedOnly);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);
        return res.data;
    });
}

export function createTodo(mood, text) {
    let url = `${todoBaseUrl}/todos`;

    console.log(`Making todo request to: ${url}`);

    return axios.post(url, {
        id: uuid(),
        mood: mood,
        text: text,
        ts: moment().unix(),
        doneTs: null,
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function accomplishTodo(id) {
    let url = `${todoBaseUrl}/todos/${id}`;

    console.log(`Making actodo request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

