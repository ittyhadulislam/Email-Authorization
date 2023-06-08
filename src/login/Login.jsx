/* eslint-disable no-unused-vars */
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../firebase/firebase.config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const emailRef = useRef()

    const navigate = useNavigate()

    const handelLogin = (e) => {
        e.preventDefault()

        setError("")
        setSuccess("")

        const email = e.target.email.value
        const password = e.target.password.value

        console.log(email, password)

        signInWithEmailAndPassword(auth, email, password)
            .then((userDetails) => {
                const user = userDetails.user
                console.log(user)

                if (!user.emailVerified) {
                    alert("Please verify your email first")
                    return
                }

                setError("")
                setSuccess("User Login Successfully")
            })
            .catch((error) => {
                const errorMessage = error.Message
                setError(errorMessage)
            })

    }

    const resetPass = () => {
        const email = emailRef.current.value
        if (!email) {
            alert("Please enter your email first")
            return
        }

        sendPasswordResetEmail(auth, email)
            .then(() => alert(" please check your email"))
            .catch((error) => {
                console.log(error.message)
                setError(error.message)
            })
    }

    const redirectHome = () => {
        navigate("/home")
    }

    return (
        <div>
            <form onSubmit={handelLogin}>
                {
                    success ? <p className='text-green-700 py-4'>{success}</p> : <p className='text-red-700 py-4'>{error}</p>
                }
                <input type="email" ref={emailRef} name='email' placeholder="Enter your Email" className="input input-bordered input-primary w-full max-w-xs mb-2" /><br />
                <input type="password" name='password' placeholder="Enter Password" className="input input-bordered input-primary w-full max-w-xs mb-4" /><br />
                <button className="btn btn-outline btn-primary mb-4" onClick={redirectHome}>Login</button>
            </form>
            <p>Forget Password? <a onClick={resetPass} className='link link-primary link-hover'>Reset Here</a></p>
        </div>
    );
};

export default Login;