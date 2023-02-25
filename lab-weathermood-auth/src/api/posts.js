// import axios from 'axios';

// // Develop server URL
// const postBaseUrl = 'http://localhost:3000/api';

// // Staging server URL
// // const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// // Production server URL
// // const postBaseUrl = 'http://weathermood-cloudprog-env2.mefye6uxcy.us-east-1.elasticbeanstalk.com/api';

// export function listPosts(searchText = '', start) {
//     let url = `${postBaseUrl}/posts`;
//     let query = [];
//     if (searchText)
//         query.push(`searchText=${searchText}`);
//     if (start)
//         query.push(`start=${start}`);
//     if (query.length)
//         url += '?' + query.join('&');

//     console.log(`Making GET request to: ${url}`);

//     return axios.get(url).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.data;
//     });
// }

// export function createPost(mood, text) {
//     let url = `${postBaseUrl}/posts`;

//     console.log(`Making POST request to: ${url}`);

//     return axios.post(url, {
//         mood,
//         text
//     }).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.data;
//     });
// }

// export function createVote(id, mood) {
//     let url = `${postBaseUrl}/posts/${id}/${mood.toLowerCase()}Votes`;

//     console.log(`Making POST request to: ${url}`);

//     return axios.post(url).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.data;
//     });
// }


import axios from 'axios';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import '@babel/polyfill';

const postKey = 'posts';

export function listPosts(searchText = '') {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_listPosts(searchText));
        }, 500);
    });
}

// Simulated server-side code
function _listPosts(searchText = '') {
    let postString = localStorage.getItem(postKey);
    let posts = postString ? JSON.parse(postString) : [];
    if (posts.length > 0 && searchText) {
        posts = posts.filter(p => {
            return p.text.toLocaleLowerCase().indexOf(searchText.toLowerCase()) !== -1
        });
    }
    return posts;
};

export function createPost(mood, text, username) {
    return new Promise((resolve, reject) => {
        resolve(_createPost(mood, text, username));
    });
}

// Simulated server-side code
function _createPost(mood, text, username) {
    const newPost = {
        id: uuid(),
        mood: mood,
        text: text,
        ts: moment().unix(),
        clearVotes: 0,
        cloudsVotes: 0,
        drizzleVotes: 0,
        rainVotes: 0,
        thunderVotes: 0,
        snowVotes: 0,
        windyVotes: 0,
        username: username
    };
    const posts = [
        newPost,
        ..._listPosts()
    ];
    localStorage.setItem(postKey, JSON.stringify(posts));
    return newPost;
}

export function createVote(id, mood) {
    return new Promise((resolve, reject) => {
        _createVote(id, mood);
        resolve();
    });
}

// Simulated server-side code
function _createVote(id, mood) {
    const posts = _listPosts().map(p => {
        if (p.id === id) {
            p[mood.toLowerCase() + 'Votes']++;
        }
        return p;
    });
    localStorage.setItem(pomstKey, JSON.stringify(posts));
}
