import React, { useState, useContext } from 'react';
import { 
    Star, 
    StarFill, 
    Trash3Fill, 
    JournalText} from 'react-bootstrap-icons';
import { NoteModal } from './Modal';
import { DeleteModal } from './DeleteModal';
import { AuthContext } from '../context/auth.context';
import axios from 'axios'

export const Job = ({job, deleteHandler, selectHandler, updateStarred}) => {
    const [notesModal, seeNotes] = useState(false);
    const [confirmModal, seeConfirmModal] = useState(false);
    const [starred, setStarred] = useState(job.starred);
    const {user} = useContext(AuthContext)
    const starredHandler = () => {
        axios
            .put(`https://iapplied-api.herokuapp.com/api/jobs/${job._id}`,
                {starred: !starred}, {
                    headers: {
                        'auth_token': `Bearer ${user.token}`
                    }
                })
            .then(res => {
                if(!res.data.err){
                    updateStarred(res.data.job, job._id)
                    setStarred(res.data.job.starred)
                } else {
                    console.log(res.data.err)
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <tr>
                <td>{job.position}</td>
                <td>{job.company}</td>
                <td>
                    <select 
                        className="form-select form-select-sm" 
                        defaultValue={job.status} 
                        onChange={(e)=>selectHandler(e,job._id)}>
                        <option value="applied">applied</option>
                        <option value="interview">interview</option>
                        <option value="rejected">rejected</option>
                    </select>
                </td>
                <td>
                    <a 
                        onClick={()=>seeNotes(true)} 
                        style={{cursor:'pointer'}}>
                        <JournalText />
                    </a>
                </td>
                <td>
                    <a 
                        onClick={starredHandler} 
                        style={{cursor:'pointer'}}>
                        {starred ? <StarFill color='gold'/> : <Star />}
                    </a>
                </td>
                <td>
                    <a 
                        onClick={() => seeConfirmModal(true)} 
                        style={{cursor:'pointer'}}>
                        <Trash3Fill color='grey'/>
                    </a>
                </td>
            </tr>
            <NoteModal 
                show={notesModal} 
                onHide={()=>seeNotes(false)} 
                job={job} />
            <DeleteModal 
                show={confirmModal} 
                onHide={()=>seeConfirmModal(false)} 
                jobTitle={`${job.position} at ${job.company}`} 
                jobId={job._id} 
                deleteHandler={deleteHandler} />
        </> 
    )
}
