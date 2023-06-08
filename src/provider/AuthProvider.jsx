// eslint-disable-next-line no-unused-vars
import { getAuth } from 'firebase/auth';
// eslint-disable-next-line no-unused-vars
import React, { createContext } from 'react';
import app from './../firebase/firebase.config';
import { useState } from 'react';


// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext(null)

const auth = getAuth(app)

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const authUser = {
        user
    }

    // const user = { displayName: "Azmain" }

    return (
        <userContext.Provider value={authUser}>
            {children}
        </userContext.Provider>
    );
};

export default AuthProvider;