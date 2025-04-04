import React from 'react'
import { useState } from 'react'
import {SERVER_URL} from './const'

const Home = () => {
    const [data, setData] = useState([{}])

    const onLogin = () => {
        fetch(`${SERVER_URL}/login.xyz`)
            .then(res => res.json())
            .then(
                data => {
                    setData(data)
                    console.log(data.url)
                    console.log(data.code_verifier)
                    window.localStorage.setItem('code_verifier', data.code_verifier)
                    window.location.href = data.url
                }
                ,
            )
    }

    return (
        <div className="App-header">
            <a href="/">Home</a>
            <button onClick={onLogin}>Login</button>
        </div>
    )
}

export default Home