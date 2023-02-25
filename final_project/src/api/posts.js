import axios from 'axios';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import '@babel/polyfill';

const postKey = 'posts';

export function listPosts(curname = '') {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_listPosts(curname));
        }, 500);
    });
}

// Simulated server-side code
function _listPosts(curname = '', start) {
    let postString = localStorage.getItem(postKey);
    let posts = postString ? JSON.parse(postString) : [];
    return posts;
};

export function createPost(text,name) {
    return new Promise((resolve, reject) => {
        resolve(_createPost(text,name));
    });
}

// Simulated server-side code
function _createPost(text,name) {
    const newPost = {
        id: uuid(),
        username: name,
        text: text,
        ts: moment().unix(),
        comments: [],
        numofcomment: 0,
        opencomment: false,
        follownum: 1,
        follower: [name], 
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

export function followUp(id, name){
    return new Promise((resolve, reject) => {
        _followUp(id, name);
        resolve();
    });
}

export function deleteFollow(id, name){
    return new Promise((resolve, reject) => {
        _deleteFollow(id, name);
        resolve();
    });
}

function _deleteFollow(id, name){
    const posts = _listPosts().map(p => {
        if (p.id === id) {
            p.follower = p.follower.filter(el => el != name);
            p.follownum = p.follower.length;
        }
        return p;
    });
    localStorage.setItem(postKey, JSON.stringify(posts));
}

function _followUp(id, name){
    const posts = _listPosts().map(p => {
        if (p.id === id) {
            p.follower.push(name);
            p.follownum = p.follower.length;
        }
        return p;
    });
    localStorage.setItem(postKey, JSON.stringify(posts));
}

export function deletePost(id){
    return new Promise((resolve, reject) => {
        _deletePost(id);
        resolve();
    });
}

function _deletePost(id){
    const posts = _listPosts().filter(p => p.id != id);
    console.log(posts);
    localStorage.setItem(postKey, JSON.stringify(posts));
}

export function deleteComment(parentid, id){
    return new Promise((resolve, reject) => {
        _deleteComment(parentid, id);
        resolve();
    });
}

function _deleteComment(parentid, id){
    const posts = _listPosts().map(p =>{
        if(p.id == parentid){
            p.comments = p.comments.filter(el => el.id != id);
            p.numofcomment = p.comments.length;
        }
        return p;
    })
    console.log(posts);
    localStorage.setItem(postKey, JSON.stringify(posts));
}

// Simulated server-side code
function _createVote(id, mood) {
    const posts = _listPosts().map(p => {
        if (p.id === id) {
            p[mood.toLowerCase() + 'Votes']++;
        }
        return p;
    });
    localStorage.setItem(postKey, JSON.stringify(posts));
}

export function initPost(){
    return new Promise((resolve, reject) => {
        _initPost();
        resolve();
    });
}


function _initPost(){
    const posts = _listPosts().map(p =>{
        p.opencomment = false;
        return p;
    })
    console.log("init");
    console.log(posts);
    localStorage.setItem(postKey, JSON.stringify(posts));
}

export function createComment(id, text, name) {
    return new Promise((resolve, reject) => {
        _createComment(id, text, name);
        resolve();
    });
}

export function createVoteOfComment(parentid,id, mood) {
    return new Promise((resolve, reject) => {
        _createVoteOfComment(parentid,id, mood);
        resolve();
    });
}


function _createComment(id, text, name) {
    const posts = _listPosts().map(p => {
        if (p.id === id) {
                const comment = 
                    {
                        parentid:id,
                        id: uuid(),
                        text: text,
                        username: name,
                        ts: moment().unix(),         
                    };

            const newcomment = [
                comment,
                ...p.comments  
            ];
            p.comments = newcomment;
            console.log(id+"comment+1");
            p.numofcomment = p.comments.length;
        }
        return p;
    });
    localStorage.setItem(postKey, JSON.stringify(posts));
}

function _createVoteOfComment(parentid,id, mood) {
    const posts = _listPosts().map(p => {
        if (p.id === parentid) {
            p.comments.map(comment => {
                if (comment.id === id) {
                    comment[mood.toLowerCase() + 'Votes']++;
                }
            });
        }
        return p;
    });
    localStorage.setItem(postKey, JSON.stringify(posts));
}

export function openComment(id) {
    return new Promise((resolve, reject) => {
        _openComment(id);
        resolve();
    });
}

function _openComment(id) {
    const posts = _listPosts().map(p => {
        if (p.id === id) {
            p.opencomment = (!p.opencomment);
        }
        return p;
    });
    localStorage.setItem(postKey, JSON.stringify(posts));
}


// import axios from 'axios';
// import { v4 as uuid } from 'uuid';
// import moment from 'moment';
// import '@babel/polyfill';

// const postBaseUrl = 'ziwu.us-east-1.elasticbeanstalk.com/api';

// const postKey = 'posts';

// export function listPosts(curname = '') {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(_listPosts(curname));
//         }, 500);
//     });
// }

// // Simulated server-side code
// function _listPosts(curname = '', start) {
//     let url = `${postBaseUrl}/posts`;

//     console.log(`Making GET post request to: ${url}`);

//     return axios.get(url, {
//         start,
//         followerid: curname
//     }).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.data;
//     });

// };

// export function createPost(text,name,imageurl) {
//     return new Promise((resolve, reject) => {
//         resolve(_createPost(text,name,imageurl));
//     });
// }

// // Simulated server-side code
// function _createPost(text,name,imageurl) {
//     let url = `${postBaseUrl}/postcreate`;

//     console.log(`Making create post request to: ${url}`);

//     return axios.post(url, {
//         username: name,
//         text: text,
//         numofcomment: 0,
//         opencomment: false,
//         follownum: 1,
//         follower: [name],
//         url:imageurl
//     }).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.data;
//     });
// }

// export function createVote(id, mood) {
//     return new Promise((resolve, reject) => {
//         _createVote(id, mood);
//         resolve();
//     });
// }

// export function followUp(id, name){
//     return new Promise((resolve, reject) => {
//         _followUp(id, name);
//         resolve();
//     });
// }

// export function deleteFollow(id, name){
//     return new Promise((resolve, reject) => {
//         _deleteFollow(id, name);
//         resolve();
//     });
// }

// function _deleteFollow(id, name){
//     let url = `${postBaseUrl}/cancelfollow`;

//     console.log(`Making cancelfollow request to: ${url}`);

//     return axios.post(url, {
//         id,
//         username:name
//     }).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.data;
//     });
// }

// function _followUp(id, name){
//     let url = `${postBaseUrl}/follow`;

//     console.log(`Making follow request to: ${url}`);

//     return axios.post(url, {
//         id,
//         username: name
//     }).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.data;
//     });

// }

// export function deletePost(id){
//     return new Promise((resolve, reject) => {
//         _deletePost(id);
//         resolve();
//     });
// }

// function _deletePost(id){
//     let url = `${postBaseUrl}/postdel`;

//     console.log(`Making delete POST request to: ${url}`);

//     return axios.post(url, {
//         id
//     }).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.data;
//     });

// }

// export function deleteComment(parentid, id){
//     return new Promise((resolve, reject) => {
//         _deleteComment(parentid, id);
//         resolve();
//     });
// }

// function _deleteComment(parentid, id){
//     let url = `${postBaseUrl}/deletecomment`;

//     console.log(`Making delete comment request to: ${url}`);

//     return axios.post(url, {
//         parentid,
//         id
//     }).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.data;
//     });

// }

// // Simulated server-side code
// function _createVote(id, mood) {
//     const posts = _listPosts().map(p => {
//         if (p.id === id) {
//             p[mood.toLowerCase() + 'Votes']++;
//         }
//         return p;
//     });
//     localStorage.setItem(postKey, JSON.stringify(posts));
// }


// export function createComment(id, text, name) {
//     return new Promise((resolve, reject) => {
//         _createComment(id, text, name);
//         resolve();
//     });
// }

// export function createVoteOfComment(parentid,id, mood) {
//     return new Promise((resolve, reject) => {
//         _createVoteOfComment(parentid,id, mood);
//         resolve();
//     });
// }


// function _createComment(id, text, name) {
//     let url = `${postBaseUrl}/createcomment`;

//     console.log(`Making create comment request to: ${url}`);

//     return axios.post(url, {
//         id,
//         text,
//         username:name
//     }).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.data;
//     });
// }

// function _createVoteOfComment(parentid,id, mood) {
//     const posts = _listPosts().map(p => {
//         if (p.id === parentid) {
//             p.comments.map(comment => {
//                 if (comment.id === id) {
//                     comment[mood.toLowerCase() + 'Votes']++;
//                 }
//             });
//         }
//         return p;
//     });
//     localStorage.setItem(postKey, JSON.stringify(posts));
// }

// export function openComment(id) {
//     return new Promise((resolve, reject) => {
//         _openComment(id);
//         resolve();
//     });
// }

// function _openComment(id) {
//     let url = `${postBaseUrl}/opencomment`;

//     console.log(`Making open comment request to: ${url}`);

//     return axios.post(url, {
//         id
//     }).then(function(res) {
//         if (res.status !== 200)
//             throw new Error(`Unexpected response code: ${res.status}`);

//         return res.data;
//     });
// }
