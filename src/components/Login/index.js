import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar'
import "./index.css"

const Login = () => (
    <>
        <Navbar />
        <div className="login-container">
            <div className='log-container'>
                <h1 className='loginHeading'>Login</h1>
                <form>
                    <input className='input' type="text" placeholder='Username' required />
                    <input className='input' type="password" placeholder='Password' required />
                    <button className='loginButton' type="submit">Login</button>
                </form>
            </div>
            <Link to="/signup" className='homeLink'>
            <p className='createAccount'>New to My Store? Create an account</p>
            </Link>
        </div>
    </>
)

export default Login

