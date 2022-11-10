import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import { Link45deg } from 'react-bootstrap-icons';
import { ValidatorError } from './ValidatorError';

export const NoteModal = ({show,onHide,job}) => {
    const {user} = useContext(AuthContext)
    const [edit, setEdit] = useState(false)
    const [state,setState] = useState({
        notes: {value: job.notes, error: false},
        link: {value: job.link, error: false}
    })
    const changeHandler = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: {value: value, error: formValidation(name,value)}})
    }
    const editNotes = () => {
        setEdit(false);
        axios.put(`https://iapplied-api.herokuapp.com/api/jobs/${job._id}`, {notes: state.notes.value, link: state.link.value}, {
            headers: {
                auth_token: `Bearer ${user.token}`
            }
        }).then(res => {
            const {notes, link} = res.data.job
            if(!res.data.err){
                setState({notes: {value: notes, error: false}, link: {value:link,error:false}})
            } else {
                console.log(res.data.err)
            }})
    }
    const formValidation = (name, value) => {
        const linkRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
        switch (name) {
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
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                scrollable={true}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton className='d-flex flex-column align-items-start'>
                    <Modal.Title id="contained-modal-title-vcenter" >
                        {job.position} at {job.company}
                    </Modal.Title>
                    {edit ? 
                        (
                        <div>
                            <input onChange={changeHandler} value={state.link.value} name='link' className="form-control m-0" placeholder='Edit Link'/>
                            {state.link.error && (<ValidatorError message='Please Use a Valid Link'/>)}
                        </div>)
                        : 
                        state.link.value 
                        ?(<a href={state.link.value} target='_blank'>
                            <Link45deg/><span style={{textDecoration: 'none'}}>- Link to job posting</span>
                        </a>)
                        :(<small className='text-muted mb-0'>
                            Click edit to add a link
                        </small>)
                    }
                </Modal.Header>
                {edit ? 
                (
                <div className="px-3 py-3">
                    <label htmlFor="notes" className="form-label mt-1">Editing Notes</label>
                    {state.notes.error && (<ValidatorError message='Notes must be less than 250 characters'/>)}
                    <textarea onChange={changeHandler} value={state.notes.value} name="notes" className="form-control" id="notes" maxLength='250' rows='12'/>
                    <small>{state.notes.value?.length}/250</small>
                </div>)
                : 
                (<Modal.Body>
                    {state.notes.value?.length > 0
                        ? ( <>
                                <h6 className='pb-4'>Notes:</h6>
                                <p className='ms-2 text-break' style={{whiteSpace: 'pre-line'}}>{state.notes.value}</p>
                            </>
                            )
                        : <p className='text-muted text-center'>No notes to display...</p>
                    }
                </Modal.Body>)
                }   
                <Modal.Footer>
                    {edit ? <Button onClick={editNotes}>Save</Button> : <Button onClick={()=>setEdit(true)}>Edit</Button>}
                    <Button onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
}
