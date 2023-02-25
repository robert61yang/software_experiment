const initLaundryState = {
    lasttime: ['N/A','N/A','N/A','N/A']
};


export function laundry(state = initLaundryState, action){
    switch(action.type){
        case '@LAUNDRY/START_GET':
            return{
                ...state,
            };
        case '@LAUNDRY/END_GET':
            return{
                ...state,
                lasttime: action.lasttime
            };
        default:
            return state;

    }
}