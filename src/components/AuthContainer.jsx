import React, { useState, use } from 'react'
import { LogIn } from './Login';
import { Register } from './Register';

export const AuthContainer = () => {
    const [visible, setVisible] = useState(false)
    const [loginForm, setFormType] = useState(true)

    return (
        <div className='mx-5 px-5'>
            <div className="d-flex my-switch align-items-center gap-2 justify-content-center">
                <div className="form-text m-0">Logging In</div>
                <div className="form-check form-switch form-check-inline m-0 p-0 align-items-center d-flex">
                    <input id="revenue" className="form-check-input m-0" type="checkbox" onChange={() => setFormType(!loginForm)}/>
                </div>
                <div className="form-text m-0">Signing Up</div>
            </div>
            {loginForm ? (<LogIn visible={visible} setVisible={setVisible} />) : (<Register visible={visible} setVisible={setVisible} />)}
        </div>
    )
}
