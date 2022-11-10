import React, {useState} from 'react'

export const Search = ({searchHandler,categoryHandler}) => {
    return (
        <div className="row g-3 px-5 mt-2 mb-3">
            <div className='col-sm d-flex align-items-center justify-content-center'>
                <p className='m-0'>Search By</p>
            </div>
            <div className="col-sm">
                <select className="form-select" name='category' onChange={(e) => categoryHandler(e.target.value)}>
                    <option value="company" defaultChecked>Company</option>
                    <option value="position">Position</option>
                    <option value="status">Status</option>
                </select>
            </div>
            <div className="col-sm-9">
                <input type="text" className="form-control" placeholder="Search" name='input' onChange={searchHandler}/>
            </div>
        </div>
    )
}
