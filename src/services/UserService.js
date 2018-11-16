const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/user'
    : '//localhost:3000/user';

const TOKEN = 'user token';
const LOG_ID = 'log id';
const USER_ID = 'user_id';

import axios from 'axios';

function signUp(user) {
    return axios.post(`${BASE_URL}/signUp`, user)
        .then(user => {
            return user.data;
        }).catch(err => console.log('from front userService cant sign up'))
}

function logIn(user) {  // log in 
    return axios.post(`${BASE_URL}/logIn`, user)
        .then(res => {
            localStorage.setItem(TOKEN, res.data.token);  // save token on local storage
            return axios.post(`${BASE_URL}/log`, res.data.user) // save logIn timestamp in db
                .then(result => {
                    localStorage.setItem(LOG_ID, result.data._id); // save log id on local storage
                    localStorage.setItem(USER_ID, result.data.userId); //save user id on local storage
                    return result;
                }).catch(err => {
                    console.log(err, 'failed to loge entry');
                }).then(() => {
                    return res.data.message;
                })

        })
        .catch(err => console.warn(err, 'failed to logIn'))
}


function signOut() {  // set logOut timeStamp in db
    const logId =localStorage.getItem(LOG_ID);
    const token =localStorage.getItem(TOKEN);
    const userID =localStorage.getItem(USER_ID);
    return axios.post(`${BASE_URL}/logout`, {logId:logId, token:token,userId:userID})
    .then((result) => {
        console.log(result);
        window.localStorage.removeItem(TOKEN); // remove data from db
        window.localStorage.removeItem(LOG_ID);
        window.localStorage.removeItem(USER_ID);
        return result;
    }).catch(err => {
        console.warn(err, 'failed to logOut')
    });
}

export default {
    logIn,
    signUp,
    signOut,
}