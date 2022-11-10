import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useContext(AuthContext)

    const signup = async (body) => {
        setIsLoading(true)
        setError(null)

        const response = axios.post('https://iapplied-api.herokuapp.com/api/register', body).then((res) => {
            if(!res.data.err){
                setIsLoading(false)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                dispatch({type: 'LOGIN', payload:res.data.user})
            } else {
                const {err} = res.data;
                const errors = {}
                for(let r in err){
                    errors[r] = err[r].message
                }
                setError(errors)
                setIsLoading(false);
            }
        })
    }

    return { signup, isLoading, error, setError }
}