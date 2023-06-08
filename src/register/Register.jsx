// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
// import auth from '../firebase/firebase.config';
import { userContext } from '../provider/AuthProvider';
import app from '../firebase/firebase.config';



const Register = () => {

    const user = useContext(userContext)
    console.log(user)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // const handleName = (e) => {
    //     setName(e.target.value);
    // }
    // const handleEmail = (e) => {
    //     setEmail(e.target.value);
    // }
    // const handlePassword = (e) => {
    //     setPassword(e.target.value);
    // }

    // console.log(name, email, password)

    const auth = getAuth(app)

    const handelRegistration = (e) => {
        e.preventDefault();

        setSuccess("")
        setError("")
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password)

        if (!/(?=.*?[A-Z])/.test(password)) {
            setError("You have to Enter one Uppercase letter in your password")
            return
        }
        else if (!/(?=.*?[@!$#&_])/.test(password)) {
            setError("You have to Enter one Spatial Character in your password. Example = F5sie63f4nd5#1457Ed")
            return
        }
        else if (password.length < 6) {
            setError("Password must be at least 6 characters")
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                setError("")
                e.target.reset()
                setSuccess("successfully registered")
                // ...

                // Email Verification
                sendEmailVerification(userCredential.user)
                    .then(() => {
                        alert("email verification has been sent")
                    })
                // ...

                // Update User
                updateProfile(user, { displayName: name })
                    .then(() => console.log("user name updated"))
                    .catch((error) => {
                        console.log(error.message)
                    })
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                setError(errorMessage)
                // ..
            });
    }



    return (
        <div>
            <form onSubmit={handelRegistration}>
                {
                    success ? <p className='text-green-700 py-4'>{success}</p> : <p className='text-red-700 py-4'>{error}</p>
                }
                <input type="text" name='name' placeholder="Enter your Name" className="input input-bordered input-primary w-full max-w-xs mb-2" /><br />
                <input type="email" name='email' placeholder="Enter your Email" className="input input-bordered input-primary w-full max-w-xs mb-2" required /><br />
                <input type="password" name='password' placeholder="Enter Password" className="input input-bordered input-primary w-full max-w-xs mb-4" required /><br />
                <button className="btn btn-outline btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;