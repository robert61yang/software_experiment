import {getLaundry as getLaundryFromApi} from 'api/laundry.js'


export function startGetLaundry(){
    return {
        type: '@LAUNDRY/START_GET'
    }
}

export function endGetLaundry(lasttime){
    return {
        type: '@LAUNDRY/END_GET',
        lasttime,
    }
}

export function getLaundry(){
    return(dispatch,getState) =>{
        dispatch(startGetLaundry());

        return getLaundryFromApi().then(laundry=>{
            const {lasttime} = laundry;
            dispatch(endGetLaundry(lasttime));
        }).catch(err=>{
            console.error('Error getting laundry', err);
        });
    };
};