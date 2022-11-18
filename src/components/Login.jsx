import React, { useState, useEffect } from 'react';
import { useLogin } from '../hooks/useLogin.hook'; 
import { ValidatorError } from './ValidatorError';

export const LogIn = () => {
    const { login, isLoading, error, setError } = useLogin()
    const [state,setState] = useState({
        formData: {
            email: '',
            password: ''
        }
    })
    const [visible,setVisible] = useState(false)

    const changeHandler = (e) => {
        setError(null)
        const {name, value} = e.target;
        setState({...state, formData: {...state.formData, [name]: value}})
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        await login(state.formData)
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='d-flex justify-content-center'>
                { error && (<ValidatorError message={error} />)}
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input onChange={changeHandler} value={state.email} type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input onChange={changeHandler} value={state.password} type={visible ? 'text' : 'password'} name='password' className="form-control" id="password"/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="see_password" onChange={() => setVisible(!visible)}/>
                <label className="form-check-label" htmlFor="see_password">See Password</label>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>Submit</button>
        </form>
    )
}