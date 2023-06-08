// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { userContext } from '../provider/AuthProvider';

const Home = () => {
    const {user} = useContext(userContext)

    return (
        <div>
            <h2 className='text-3xl font-mono font-bold'> Welcome {user && <span>{user.displayName}</span>} </h2>
        </div>
    );
};

export default Home;