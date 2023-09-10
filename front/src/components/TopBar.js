import React from 'react'
import Profile from '../assets/images/profile-user.jpeg'

const domain = process.env.REACT_APP_BACK_NAME
const port = process.env.REACT_APP_BACK_PORT
const baseUrl = `http://${domain}:${port}/admin`;

function TopBar() {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars text-dark"></i>
                </button>
                <ul className="navbar-nav ml-auto">
                    <div className="topbar-divider d-none d-sm-block"></div>
                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href={baseUrl} id="userDropdown">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">ADMIN</span>
                            <img className="img-profile rounded-circle" src={Profile} alt="ADMIN - Creador de React" width="60" />
                        </a>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    )
}

export default TopBar;