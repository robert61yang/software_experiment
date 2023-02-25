const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');


function list(unaccomplishedOnly = false, searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-todos.json')) {
            fs.writeFileSync('data-todos.json', '');
        }

        fs.readFile('data-todos.json', 'utf8', (err, data) => {
            if (err) reject(err);
    
            let posts = data ? JSON.parse(data) : [];
        
            if (searchText) {
                posts = posts.filter(p => {
                    return p.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
                });
            }
            if(unaccomplishedOnly){
                posts = posts.filter(p => {
                    return !p.doneTs;
                });
            }

            resolve(posts);
        });
    });
}

function create(mood, text) {
    return new Promise((resolve, reject) => {
        const newPost = {
            id: uuid(),
            mood: mood.charAt(0).toUpperCase() + mood.slice(1),
            text: text,
            ts: moment().unix(),
            doneTs: null,
        };

        list().then(posts => {
            posts = [
                newPost,
                ...posts
            ];
            fs.writeFile('data-todos.json', JSON.stringify(posts), err => {
                if (err) reject(err);

                resolve(newPost);
            });
        });
    });
}

function accomplishTodo(id) {
    return new Promise((resolve, reject) => {
        let accomplishedTodo = null
        list().then(todos => {
            for(let t of todos){
                if(t.id === id){
                    accomplishedTodo = t;
                    t.doneTs = moment().unix();
                    break;
                }
            }
            
            fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
                if (err) reject(err);

                resolve(accomplishedTodo);
            });
        });
    });
}



module.exports = {
    list,
    create,
    accomplishTodo
};