import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useContext(AuthContext)

    const login = async (body) => {
        setIsLoading(true)
        setError(null)

        const response = axios.post('https://iapplied-api.herokuapp.com/api/login', body).then((res) => {
            if(!res.data.err){
                setIsLoading(false)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                dispatch({type: 'LOGIN', payload:res.data.user})
            } else {
                setError(res.data.err)
                setIsLoading(false)
                console.log(res.data.err)
            }
        })
    }

    return { login, isLoading, error, setError }
}