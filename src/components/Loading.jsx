import React from 'react'

export const Loading = () => {
    return (
        <div className='row align-items-center justify-content-center my-5'>
            <img style={{width: '5em'}} src={process.env.PUBLIC_URL + '/loading.gif'} alt="Loading" />
        </div>
    )
}
