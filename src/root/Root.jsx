// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./root.css"

const Root = () => {
    return (
        <div>
            <h1 className='font-mono text-3xl'>Email Authorization</h1>
            <nav className='py-4'>
                <Link className='px-4 link link-primary link-hover' to={"/login"}>Login</Link>
                <Link className='px-4 link link-primary link-hover' to={"/register"}>Register</Link>
            </nav>
            <Outlet></Outlet>
        </div >
    );
};

export default Root;