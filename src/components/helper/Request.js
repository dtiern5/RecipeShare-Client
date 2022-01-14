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

export const MakePOST = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:1337' + url, data, {
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

export const MakePOST2 = async (url, data) => {
    try {
        const response = await axios.post('http://localhost:1337' + url, data, {
            headers: {
                authorization: `Bearer ${Cookies.get("jwt")}`
            }
        })
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

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

export const MakeDELETE = (url) => {
    return new Promise((resolve, reject) => {
        axios.delete('http://localhost:1337' + url, {
            headers: {
                authorization: `Bearer ${Cookies.get("jwt")}`
            }
        }).then(({data}) => {
            resolve(data);
        }).catch(err => {
            reject(err);
        })
    })
}