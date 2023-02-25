import { commentUnknown } from "./post-actions";

/* Search text */

export function searchText(state = '', action) {
    switch (action.type) {
        case '@SEARCH_TEXT/SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
}

/* Posts */

const initPostState = {
    postLoading: false,
    posts: [],
    hasMore: false//true
};
export function post(state = initPostState, action) {
    switch (action.type) {
        case '@POST/START_LOADING':
            return {
                ...state,
                postLoading: true
            };
        case '@POST/END_LOADING':
            return {
                ...state,
                postLoading: false
            };
        case '@POST/END_LIST_POSTS':
            return {
                ...state,
                posts: action.posts,
                hasMore: false// action.posts.length > 0
            };
        case '@POST/END_LIST_MORE_POSTS':
            return {
                ...state,
                posts: [...state.posts, ...action.posts],
                hasMore: false//action.posts.length > 0
            };
        case '@POST/END_CREATE_POST':
            var newPosts = state.posts.slice();
            newPosts.unshift(action.post);
            return {
                ...state,
                posts: newPosts
            };
        case '@POST/END_CREATE_VOTE':
            var newPosts = state.posts.map(p => {
                if (p.id === action.post.id)
                    return action.post;
                return p;
            });
            return {
                ...state,
                posts: newPosts,
            };
        case '@POST/END_CREATE_COMMENT':
            var newPosts = state.posts.map(p => {
                if (p.id === action.post.id)
                    return action.post;
                    return p;
                });
            return {
                ...state,
                posts: newPosts,
            };

        default:
            return state;
    }
}

/* Post Form */

const initPostFormState = {
    inputValue: '',
    inputDanger: false,
    moodToggle: false,
    mood: 'na',
    postUnknown: false,
};
export function postForm(state = initPostFormState, action) {
    switch (action.type) {
        case '@POST_FORM/INPUT':
            return {
                ...state,
                inputValue: action.value
            };
        case '@POST_FORM/INPUT_DANGER':
            return {
                ...state,
                inputDanger: action.danger
            };
        case '@POST_FORM/TOGGLE_MOOD':
            return {
                ...state,            
            };
        case '@POST_FORM/SET_MOOD_TOGGLE':
            return {
                ...state,
            };
        case '@POST_FORM/SELECT_MOOD':
            return {
                ...state,
            };
        case '@POST_FORM/POST_UNKNOWN':
            return{
                ...state,
                postUnknown: !state.postUnknown,
            }
        case '@POST_FORM/INIT':
            return{
                ...state,
                postUnknown: false,
            }
        default:
            return state;
    }
}

/* Post item */

const initPostItemState = {
    tooltipOpen: {},
    commentUnknown: false
};

export function postItem(state = initPostItemState, action) {
    switch (action.type) {
        case '@POST_ITEM/TOGGLE_TOOLTIP':
            return {
                ...state,
                tooltipOpen: {
                    ...state.tooltipOpen,
                    [action.id]: state.tooltipOpen[action.id] ? false : true
                }
            };
        case '@POST_ITEM/SET_TOOLTIP_TOGGLE':
            return {
                ...state,
                tooltipOpen: {
                    ...state.tooltipOpen,
                    [action.id]: action.toggle
                }
            };
        case '@POST_ITEM/COMMENT_UNKNOWN':
            return {
                tooltipOpen: {
                    ...state.tooltipOpen,
                },
                commentUnknown: !state.commentUnknown,
            };
        case '@POST_ITEM/INIT':
            return {
                tooltipOpen: {
                    ...state.tooltipOpen,
                },
                commentUnknown: false,
            };
        default:
            return state;
    }
}
