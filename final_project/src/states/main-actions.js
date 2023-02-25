export function toggleNavbar() {
    return {
        type: '@MAIN/TOGGLE_NAVBAR'
    };
}


export function callUserImf(curname, curmail){
    return {
        type: '@MAIN/USERIMF',
        curname,
        curmail
    };
}