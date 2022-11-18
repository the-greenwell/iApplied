import React, { useEffect, useState } from 'react';
import { ValidatorError } from './ValidatorError';
import { useSignup } from '../hooks/useSignup.hook'

export const Register = () => {
    const { signup, isLoading, error, setError } = useSignup();
    const [state,setState] = useState({
        formData: {
            first_name: {value:'', error: false},
            last_name: {value:'', error: false},
            email: {value:'', error: false},
            password: {value:'', error: false},
            conf_password: {value:'', error: false}
        }
    })
    const [visible,setVisible] = useState(false)

    const changeHandler = (e) => {
        setError(null)
        const {name, value} = e.target;
        const valid = formValidation(name,value);
        setState({...state, formData: {...state.formData, [name]: {value: value, error: valid}}})
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        const body = {
            first_name: state.formData.first_name.value,
            last_name: state.formData.last_name.value,
            email: state.formData.email.value,
            password: state.formData.password.value
        }
        await signup(body)
    }


    
    const formValidation = (name, value) => {
        const passwordRegex = null
        switch (name) {
            case 'first_name':
                if (value.length < 2) return true;
                break;
            case 'last_name':
                if (value.length < 2) return true;
                break;
            case 'email':
                const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                if (!emailRegex.test(value)) return true;
                if (value.length < 3) return true;
                break;
            case 'password':
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                if (!passwordRegex.test(value)) return true;
                break;
            case 'conf_password':
                if (value !== state.formData.password.value) return true;
                break;
            default:
                break;
        }
        return false
    }

    console.log(error)
    return (
        <form onSubmit={submitHandler}>
            <div className="mb-3">
                <label htmlFor="first_name" className="form-label">First Name</label>
                <input onChange={changeHandler} value={state.first_name} name="first_name" type="text" className="form-control" id="first_name" aria-describedby="emailHelp"/>
                {state.formData.first_name.error && (<ValidatorError message='First Name Must Be At Least 2 Characters'/>)}
                {error?.first_name && (<ValidatorError message={error.first_name}/>)}
            </div>
            <div className="mb-3">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input onChange={changeHandler} value={state.last_name} name="last_name" type="text" className="form-control" id="last_name" aria-describedby="emailHelp"/>
                {state.formData.last_name.error && (<ValidatorError message='Last Name Must Be At Least 2 Characters'/>)}
                {error?.last_name && (<ValidatorError message={error.last_name}/>)}
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input onChange={changeHandler} value={state.email} name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
                {state.formData.email.error && (<ValidatorError message='Valid Email is Required'/>)}
                {error?.email && (<ValidatorError message={error.email}/>)}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input onChange={changeHandler} value={state.password} name="password" type={visible ? 'text' : 'password'} className="form-control" id="password"/>
                {state.formData.password.error && (<ValidatorError message='Password is Invalid. Must Be At Least 8 Characters Long, Include a Capitol Letter and a Number'/>)}
                {error?.password && (<ValidatorError message={error.password}/>)}
            </div>
            <div className="mb-3">
                <label htmlFor="conf_password" className="form-label">Confirm Password</label>
                <input onChange={changeHandler} value={state.conf_password} name="conf_password" type={visible ? 'text' : 'password'} className="form-control" id="conf_password"/>
                {state.formData.conf_password.error && (<ValidatorError message='Passwords Do Not Match'/>)}
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="see_password" onChange={() => setVisible(!visible)}/>
                <label className="form-check-label" htmlFor="see_password">See Password</label>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>Submit</button>
        </form>
    )
}
