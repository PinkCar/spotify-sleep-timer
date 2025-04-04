import React, { useEffect, useState } from 'react'
import { CLIENT_URL, SERVER_URL } from './const'


const Redirect = () => {
    const [data, setData] = useState([{}])
    const code_verifier = window.localStorage.getItem('code_verifier')
    const urlParams = new URLSearchParams(window.location.search)
    let code = urlParams.get('code')
    useEffect(() => {
    fetch(`${SERVER_URL}/redirect.xyz`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'code': code, 'code_verifier': code_verifier
        })
    })
    .then(
        res => res.json()
    )
    .then(
        data => {
            setData(data)
            console.log(data)
            window.localStorage.setItem('access_token', data.access_token) 
            window.localStorage.setItem('refresh_token', data.refresh_token) 
            window.location.href = `${CLIENT_URL}/sleep-timer-menu`
        }
    )
            
    },[])


    return (
        <div>
            <p>Redirecting.............</p>
        </div>
    )
}

export default Redirect