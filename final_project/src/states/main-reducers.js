const initMainState = {
    navbarToggle: false,
    curname: '',
    curmail: '',
};
export function main(state = initMainState, action) {
    switch (action.type) {
        case '@MAIN/TOGGLE_NAVBAR':
            return {
                ...state,
                navbarToggle: !state.navbarToggle
            };
        case '@MAIN/USERIMF' :
            return {
                ...state,
                curname: action.curname,
                curmail: action.curmail,
            }
        default:
            return state;
    }
}
