const initMainState = {
    navbarToggle: false,
    curusername: 'hi'
};
export function main(state = initMainState, action) {
    switch (action.type) {
        case '@MAIN/TOGGLE_NAVBAR':
            return {
                navbarToggle: !state.navbarToggle
            };
        case '@MAIN/RERENDER':
            return {
                curusername: action.curusername
            };
        default:
            return state;
    }
}
