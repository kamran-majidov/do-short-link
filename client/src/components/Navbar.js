import React, {useEffect} from 'react';
import {useAuth} from "../hooks/auth.hook";
import {NavLink, useHistory} from "react-router-dom";
import M from  'materialize-css/dist/js/materialize.min.js';

const Navbar = () => {
    const history = useHistory()
    const auth = useAuth()

    useEffect(() => {
        let sidenav = document.querySelector('#slide-out');
        M.Sidenav.init(sidenav, {});
    })

    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
        history.go('/')
    }
    return (
        <header>
            <nav className="teal">
                <div className="container">
                    <div className="nav-wrapper navbar">
                        <span className="brand-logo">ShortLink</span>
                        <a href="#" data-target="slide-out" className="sidenav-trigger show-on-small">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li>
                                <NavLink to="/create">
                                    Create
                                    <i className="material-icons left">add_box</i>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/links">
                                    Links
                                    <i className="material-icons left">list</i>
                                </NavLink>
                            </li>
                            <li>
                                <a onClick={logoutHandler} href="/">
                                    Logout
                                    <i className="material-icons left">exit_to_app</i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>

            <ul id="slide-out" className="sidenav">
                <li>
                    <NavLink to="/create">
                        Create <i className="material-icons right">add_box</i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/links">
                        Links <i className="material-icons right">list</i>
                    </NavLink>
                </li>
                <li>
                    <a onClick={logoutHandler} href="/">Logout
                        <i className="material-icons right">exit_to_app</i>
                    </a>
                </li>
            </ul>
        </header>
    );
};

export default Navbar;
