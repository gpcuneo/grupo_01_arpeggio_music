import React from 'react'
import logo from '../assets/images/logo-arpeggio.JPG';

function SideBar() {
    return (
        <React.Fragment>
            <ul className="navbar-nav  sidebar sidebar-light accordion" id="accordionSidebar" style={{backgroundColor:'black'}} >
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon ">
                        <img className="w-100 p-md-5" src={logo} alt="Digital House" />
                    </div>
                </a>
                <hr className="sidebar-divider my-0" />
                <li className="nav-item ">
                    <a className="nav-link" href="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - Arpeggio Music </span></a>
                </li>
                {/* <hr className="sidebar-divider" />
                <div className="sidebar-heading">Actions</div>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="/">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Pages</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tables</span></a>
                </li>
                <hr className="sidebar-divider d-none d-md-block" /> */}
            </ul>
        </React.Fragment>
    )
}

export default SideBar