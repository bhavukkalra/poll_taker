import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import auth from '../store/reducers/auth';

import { logout } from '../store/actions'

const Navbar = ({ auth, logout }) => (
    <div>
        <ul>
            <li>
                <Link to = "/register">Register </Link>
            </li>
            <li>
                <Link to = "login">login </Link>
            </li>
            <li>
                {/* ()=> arrow function not used for onClick as logout came from store*/}
                <a onClick= {logout}>Logout</a>
            </li>

        </ul>
        {auth.isAuthenticated && (<p>Logged in as {auth.user.username}</p>)}

    </div>
)


export default connect(store => ({
    auth: store.auth,
}),
{ logout },
)(Navbar);