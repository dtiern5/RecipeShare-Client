import axios, { Axios } from 'axios';
import Cookies from 'js-cookie';

export const MakeGET = (url) => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:1337' + url, {
            headers: {
                authorization: `Bearer ${Cookies.get("jwt")}`
            }
        }).then(({data}) => {
            resolve(data);
        }).catch(err => {
            reject(err);
        })
    })
};

export const MakePOST = (url, recipedata) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:1337' + url, recipedata, {
            headers: {
                authorization: `Bearer ${Cookies.get("jwt")}`
            }
        }).then(({recipedata}) => {
            resolve(recipedata);
        }).catch(err => {
            reject(err);
        })
    })
};

export const MakePUT = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.put('http://localhost:1337' + url, data, {
            headers: {
                authorization: `Bearer ${Cookies.get("jwt")}`
            }
        }).then(({data}) => {
            resolve(data);
        }).catch(err => {
            reject(err);
        })
    })
};