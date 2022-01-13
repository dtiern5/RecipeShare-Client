import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { MakeGET } from "../helper/Request";

const useUser = () => {
    const [userinfo, setUserinfo] = useState({
        loading: true
    });

    const userData = Cookies.get('user-data');

    useEffect (() => {
        if (!userData) {
            MakeGET('/api/users/me').then(user => {
                Cookies.set('user-data', JSON.stringify(user));
                setUserinfo({
                    loading: false,
                    ...user
                })
            })
        } else {
            setUserinfo({
                loading: false,
                ...JSON.parse(Cookies.get('user-data'))
            })
        }
    }, []);
    
    return userinfo;
}

export { useUser };