export function toggleNavbar() {
    return {
        type: '@MAIN/TOGGLE_NAVBAR'
    };
}
export function rerender(curusername){
    return{
        type: '@MAIN/RERENDER',
        curusername
    };
}
