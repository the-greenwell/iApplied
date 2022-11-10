import React, { useEffect, useState, useContext } from 'react';
import { Search } from './Search';
import { Job } from './Job';
import { Loading } from './Loading';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

export const JobsContainer = () => {
    const [jobs, setJobs] = useState([])
    const [viewJobs, setResults] = useState([])
    const [searchCategory, setCategory] = useState('company')
    const [loading, setLoading] = useState(true)
    const { user } = useContext(AuthContext)

    useEffect(()=> {
        const getJobs = () => {axios.get('https://iapplied-api.herokuapp.com/api/jobs', {
            headers: {
                auth_token: `Bearer ${user.token}`
            }
        }).then(res => {
                if(!res.data.err){
                    setJobs(res.data.jobs);
                } else {
                    console.log(res.data.err)
                }
            })
        }
        if(user){
            getJobs()
        }
    },[user])

    useEffect(()=>{
        const timer = setTimeout(() => {
            setLoading(false)
            setResults(jobs.sort((a, b) => Number(b.starred) - Number(a.starred)))
        }, 400);
        return () => clearTimeout(timer);
    },[jobs])

    const deleteHandler = (id) => {
        axios.delete(`https://iapplied-api.herokuapp.com/api/jobs/${id}`, {
            headers: {
                auth_token: `Bearer ${user.token}`
            }
        })
            .then(res => {
                if(!res.data.err){
                    setJobs(jobs.filter(job=>job._id !== id));
                } else {
                    console.log(res.data.err)
                }
            })
    }
    const searchHandler = (e) => {
        const {value} = e.target;
        value.length > 0 ? 
            setResults(
                jobs.filter(
                    job=>~job[searchCategory]
                            .toLowerCase()
                            .indexOf(value.toLowerCase()))) 
            : setResults(jobs)
    }
    const selectHandler = (e,id) => {
        axios.put(
            `https://iapplied-api.herokuapp.com/api/jobs/${id}`,
            {status: e.target.value}, {
                headers: {
                    auth_token: `Bearer ${user.token}`
                }
            })
            .then(res => {
                if(!res.data.err){
                    const newState = jobs.map(obj => {
                        if(obj._id == id){
                            return res.data.job
                        }
                        return obj
                    })
                    setJobs(newState)
                } else {
                    console.log(res.data.err)
                }
            })
    }
    const updateStarred = (job,id) => {
        console.log(job,id)
        const newState = jobs.map(obj => {
            if(obj._id == id){
                return job
            }
            return obj
        })
        setJobs(newState)
    }
    return (
        <div className='px-5' id='job-container'>
            <div className='d-flex gap-5'>
                <h1 
                    className='my-0' 
                    id='dashboard-title'>
                        Welcome, {user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}!
                </h1>
            </div>
            <Search 
                searchHandler={searchHandler} 
                categoryHandler={setCategory}/>
            {loading ?
                ( <Loading />)
            :(<table className="table table-striped text-center">
                <thead>
                    <tr>
                        <th scope="col">Position</th>
                        <th scope="col">Company</th>
                        <th scope="col">Status</th>
                        <th scope="col">Details</th>
                        <th scope="col">Favorite</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody className='border'>
                    {viewJobs?.map((job)=>{
                        return <Job
                                    key={job._id} 
                                    job={job} 
                                    deleteHandler={deleteHandler} 
                                    selectHandler={selectHandler}
                                    updateStarred={updateStarred} />
                    })}
                </tbody>
            </table>)}
            { !viewJobs.length && !loading && (
                <div className='text-center my-5'>
                    <p className='text-muted'>Add a New Application...</p>
                </div>)}
        </div>
    )
}
