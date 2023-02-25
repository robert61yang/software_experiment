import axios from 'axios';

const cors = 'https://cors-anywhere.herokuapp.com/';
const laundryUrl = `http://140.114.216.81:2580/REN_M`;
let laundrySource = axios.CancelToken.source();


export function getLaundry(){
    var url = laundryUrl;

    console.log(`Making request to ${url}`);

    return axios.get(`${url}` ,{cancelToken:laundrySource.token}).then(function(res){
        const rep = res.data.toString().split(";")
        const a1 = rep[2].split(":")
        const a2 = rep[5].split(":")
        const a3 = rep[8].split(":")
        const a4 = rep[11].split(":")
        
        console.log(a3[1]);
        return{
            lasttime: [a1[1],a2[1],a3[1],a4[1]]
        };
    }).catch(function(err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
} 