import React from 'react'
import Navbar from '../Navbar'
import { Link } from 'react-router-dom'
import "./index.css"

const CreateAccount = () => (
    <>
        <Navbar />
        <div className="signUp-container">
            <div className='sign-container'>
            <h1 className='createAccountHeading'>Create Account</h1>
            <form action="action_page.php" method="post">
                <label className='label' for="username">Username:</label>
                <input className='signUpInput' type="text" id="username" name="username" required />
                <label for="email">Email:</label>
                <input className='signUpInput' type="email" id="email" name="email" required />
                <label for="password">Password:</label>
                <input className='signUpInput' type="password" id="password" name="password" required />
                <button className='signUpSubmitButton' type="submit">Sign Up</button>
            </form>
        </div>
        <Link to="/login" className='homeLink'>
        <p className='loginLink'>Existing user? Log in</p>
        </Link>
        </div>
    </>
)

export default CreateAccount


