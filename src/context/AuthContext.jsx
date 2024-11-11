import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null);
    let [user, setUser] = useState(localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    let [loading, setLoading] = useState(true)
    let loginUser = async (e) => {
        e.preventDefault();
        let response = await fetch('https://behzod.pythonanywhere.com/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            }),
        });
        let data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            return true;
        } else {
            alert('Something went wrong! Dovuchcha is working on it.');
            return false;
        }
    };

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
    };

    let updateToken = async () => {
        let response = await fetch('https://behzod.pythonanywhere.com/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })
        let data = await response.json()
        if(response.status===200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            console.log(response)
        }
        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        authTokens: authTokens,
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    useEffect(()=>{
        if(loading){
            updateToken()
        }

        let fMinutes = 1000 * 60 * 4
        let interval = setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, fMinutes)
        return ()=> clearInterval(interval)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}