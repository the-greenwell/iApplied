import React from 'react'

export const Welcome = () => {
    const classes = 'col-12 col-md-3 align-self-stretch d-flex align-items-center justify-content-start border flex-column px-2'
    return (
        <div className='mx-5 text-center'>
            <h1>Welcome to iApplied!</h1>
            <div className='d-flex gap-3 mt-5 flex-wrap justify-content-center align-items-center'>
                <div className={classes}>
                    <h5 className='my-3'>
                        Log Applications
                    </h5>
                    <p>
                        Keep track of your job applications by saving the position, company, and link to the position!
                    </p>
                </div>
                <div className={classes}>
                    <h5 className='my-3'>
                        Keep Notes
                    </h5>
                    <p>
                        Save info about the job, the company, or the interview to look back on.
                    </p>
                </div>
                <div className={classes}>
                    <h5 className='my-3'>
                        Organize Your Job Hunt
                    </h5>
                    <p>
                        You can search your job applications by company or position, and even favorite the ones that mean the most to you.
                    </p>
                </div>
            </div>
            <div className="mt-5">
                <p className="lead">This Full-Stack MERN App was developed so users can keep track of their job applications from multiple sources, in one centralized place.</p>
                <p>To get started, create an account or login using the link in the Navbar!</p>
            </div>
        </div>
    )
}
