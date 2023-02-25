import {
    listPosts as listPostsFromApi,
    listComments as listCommentsFromApi,
    createPost as createPostFromApi,
    createComment as createCommentFromApi,
    createVote as createVoteFromApi,
    createVoteOfComment as createVoteOfCommentFromApi,
    openComment as openCommentFromApi,
    followUp as increaseFollowFromApi ,
    deletePost as deletePostFromApi,
    deleteFollow as deleteFollowFromApi ,
    deleteComment as deleteCommentFromApi,
    initPost as initPostFromApi,
} from 'api/posts.js';

/*  Search text */

export function setSearchText(searchText) {
    return {
        type: '@SEARCH_TEXT/SET_SEARCH_TEXT',
        searchText
    };
}

/*  Posts */

function startLoading() {
    console.log('loading')
    return {
        type: '@POST/START_LOADING'
    };
}

function endLoading() {
    return {
        type: '@POST/END_LOADING'
    };
}

function endListPosts(posts) {
    return {
        type: '@POST/END_LIST_POSTS',
        posts
    };
}

function endListMorePosts(posts) {
    return {
        type: '@POST/END_LIST_MORE_POSTS',
        posts
    };
}

function endCreatePost(post) {
    return {
        type: '@POST/END_CREATE_POST',
        post
    };
}

function endCreateVote(post) {
    return {
        type: '@POST/END_CREATE_VOTE',
        post
    };
}

function endCreateComment(post) {
    return {
        type: '@POST/END_CREATE_COMMENT',
        post
    };
}

export function listPosts(curname = '') {
    return (dispatch, getState) => {
        dispatch(startLoading());
        return listPostsFromApi(curname).then(posts => {
            dispatch(endListPosts(posts));
        }).catch(err => {
            console.error('Error listing posts', err);
        }).then(() => {
            dispatch(endLoading())
        });
    };
};

export function listMorePosts(searchText, start) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        return listPostsFromApi(searchText, start).then(posts => {
            dispatch(endListMorePosts(posts));
        }).catch(err => {
            console.error('Error listing more posts', err);
        }).then(() => dispatch(endLoading()));
    };
};

export function createPost(text, name,imageurl) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return createPostFromApi(text, name,imageurl).then(post => {
            dispatch(endCreatePost(post));
        }).catch(err => {
            console.error('Error creating post', err);
        }).then(() => dispatch(endLoading()));
    };
};

export function createVote(id, mood) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return createVoteFromApi(id, mood).then(post => {
            dispatch(endCreateVote(post));
        }).catch(err => {
            console.error('Error creating vote', err);
        }).then(() => dispatch(endLoading()));
    };
};

export function createComment(id, text, name, searchname='') {
    console.log(id+"createComment(action)");
    return (dispatch, getState) => {
        //dispatch(startLoading());

        return createCommentFromApi(id, text, name).then(post => {
            dispatch(listPosts(searchname));
            //dispatch(endCreateComment(post));
        }).catch(err => {
            console.error('Error creating vote', err);
        })//then(() => dispatch(endLoading()));
    };
};

export function followUp(id, name, searchname=''){
    return (dispatch, getState) => {
        return increaseFollowFromApi(id,name).then(post => {
            dispatch(listPosts(searchname));
        }).catch(err => {
            console.error('Error increase follow', err);
        })
    };
}

export function deleteFollow(id, name,searchname=''){
    return (dispatch, getState) => {
        return deleteFollowFromApi(id,name).then(post => {
            dispatch(listPosts(searchname));
        }).catch(err => {
            console.error('Error delete follow', err);
        })
    };
}

export function deletePost(id, username=''){
    return (dispatch, getState) => {
        return deletePostFromApi(id).then(post => {
            dispatch(listPosts(username));
        }).catch(err => {
            console.error('Error delete post', err);
        })
    };
}

export function deleteComment(parentid, id, username=''){
    return (dispatch, getState) => {
        return deleteCommentFromApi(parentid, id).then(post => {
            dispatch(listPosts(username));
        }).catch(err => {
            console.error('Error delete post', err);
        })
    };
}

export function initPost(){
    return (dispatch, getState) => {
        return initPostFromApi().then(post => {
            dispatch(listPosts());
        }).catch(err => {
            console.error('Error delete post', err);
        })
    };
}



export function createVoteOfComment(parentid,id, mood) {
    console.log("createVoteOfComment-action");
    return (dispatch, getState) => {
        dispatch(startLoading());

        return createVoteOfCommentFromApi(parentid, id, mood).then(post => {
            dispatch(listPosts());
        }).catch(err => {
            console.error('Error creating vote of comment', err);
        }).then(() => dispatch(endLoading()));
    };
};

export function openComment(id, curname = '') {
    return (dispatch, getState) => {
        return openCommentFromApi(id).then(post => {
            dispatch(listPosts(curname));
        }).catch(err => {
            console.error('Error creating vote of comment', err);
        });
    };
};

/*  Post Form */

export function input(value) {
    return {
        type: '@POST_FORM/INPUT',
        value
    };
};

export function inputDanger(danger) {
    return {
        type: '@POST_FORM/INPUT_DANGER',
        danger
    };
};

export function toggleMood() {
    return {
        type: '@POST_FORM/TOGGLE_MOOD'
    };
};

export function postUnknown(){
    return{
        type: '@POST_FORM/POST_UNKNOWN',
    };
}
export function postUnknownInit(){
    return{
        type: '@POST_FORM/INIT',
    };
}

export function setMoodToggle(toggle) {
    return {
        type: '@POST_FORM/SET_MOOD_TOGGLE',
        toggle
    };
};

export function selectMood(mood) {
    return {
        type: '@POST_FORM/SELECT_MOOD',
        mood
    };
};

/*  Post item */

export function toggleTooltip(id) {
    return {
        type: '@POST_ITEM/TOGGLE_TOOLTIP',
        id
    };
};

export function setTooltipToggle(id, toggle) {
    return {
        type: '@POST_ITEM/SET_TOOLTIP_TOGGLE',
        id,
        toggle
    };
};

export function commentUnknown() {
    return {
        type: '@POST_ITEM/COMMENT_UNKNOWN',
    };
};

export function commentUnknownInit(){
    return{
        type: '@POST_ITEM/INIT',
    };
}
