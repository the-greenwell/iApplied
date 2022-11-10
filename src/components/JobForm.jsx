import axios from 'axios';
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ValidatorError } from './ValidatorError';
import { AuthContext } from '../context/auth.context';

export const JobForm = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const [state,setState] = useState({
        formData: {
            company: {value:'', error: false},
            position: {value:'', error: false},
            link: {value:'', error: false},
            notes: {value:'', error: false},
            status: 'applied',
            starred: false
        }
    })
    const [error, setError] = useState(null)
    const changeHandler = (e) => {
        setError(null)
        const {name, value} = e.target;
        const valid = formValidation(name, value)
        setState({...state, 
            formData: {...state.formData, 
                [name]: {value: value, error: valid}
            }
        })

    }

    const submitHandler = (e) => {
        e.preventDefault();
        const {company,position,link,notes,status,starred} = state.formData;
        const body = {
            company: company.value,
            position: position.value,
            link: link.value,
            notes: notes.value,
            status: status,
            starred: starred
        }
        if(!company.error && !position.error && !link.error && !notes.error){
            setError(null)
            axios.post('https://iapplied-api.herokuapp.com/api/jobs/', body, {
                headers: {
                    auth_token: `Bearer ${user.token}`
                }
            })
                .then((res)=>{
                    if(res.data.err){
                        const {err} = res.data;
                        const errors = {}
                        for(let r in err){
                            errors[r] = err[r].message
                        }
                        setError(errors)
                    } else {
                        navigate('/');
                    }
                })
                .catch((err) => {console.log(err.message)})
        }
    }

    const formValidation = (name, value) => {
        const linkRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
        switch (name) {
            case 'company':
                if (value.length < 1) return true;
                break;
            case 'position':
                if (value.length < 1) return true;
                break;
            case 'link':
                if (!linkRegex.test(value) && value) return true;
                break;
            case 'notes':
                if (value.length > 250) return true;
                break;
            default:
                break;
        }
        return false
    }
    return (
        <div className='mx-5 px-5'>
            <form onSubmit={(e) => submitHandler(e,state)}>
                <div className="mb-3">
                    <label 
                        htmlFor="position" 
                        className="form-label">Job Title</label>
                    <input
                        onChange={changeHandler} 
                        value={state.formData.position.value} 
                        name="position" type="text" 
                        className="form-control" 
                        id="position"/>
                    {state.formData.position.error && (<ValidatorError message='Please Enter a Job Title'/>)}
                    {error?.position && (<ValidatorError message={error.position}/>)}
                </div>
                <div className="mb-3">
                    <label 
                        htmlFor="company" 
                        className="form-label">Company Name</label>
                    <input 
                        onChange={changeHandler} 
                        value={state.formData.company.value} 
                        name="company" 
                        type="text" 
                        className="form-control" 
                        id="company"/>
                    {state.formData.company.error && (<ValidatorError message='Please Enter a Company Name'/>)}
                    {error?.company && (<ValidatorError message={error.company}/>)}
                </div>
                <div className="mb-3">
                    <label 
                        htmlFor="link" 
                        className="form-label">Link to Job Posting <small className='text-muted'>(Copy/Paste for best results)</small></label>
                    <input 
                        onChange={changeHandler} 
                        value={state.formData.link.value} 
                        name="link" 
                        type='text' 
                        className="form-control" 
                        id="link"/>
                    {state.formData.link.error && (<ValidatorError message='Please Use a Valid Link'/>)}
                </div>
                <div className="mb-3">
                    <label 
                        htmlFor="notes" 
                        className="form-label">Additional Notes</label>
                    <textarea 
                        onChange={changeHandler} 
                        value={state.formData.notes.value} 
                        name="notes" 
                        className="form-control" 
                        id="notes" 
                        maxLength='250' 
                        rows='3'/>
                    <small>{state.formData.notes.value.length}/250</small>
                    {state.formData.notes.error && (<ValidatorError message='Notes Must Be Less Than 250 Characters'/>)}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
