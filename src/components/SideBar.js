// File: SideBar.js
// Last Modfied: July 26, 2024 by aNakashima
// Description: Functional side navigation bar. Need to adjust routes in App.js to match NavLinks

import React from 'react';
import './SideBar.css';

import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

function SideBar({instrumentName }) {

    return (
        <div style={{display: 'flex', overflow: 'scroll initial', height:"100vh"}}>
            <CDBSidebar textColor="#fff" backgroundColor="#333" breakpoint={1}>
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{color: 'inherit'}}>
                        {instrumentName}
                    </a>
                </CDBSidebarHeader>
                {/*  Check out link for icon options  */}
                {/*  https://fontawesome.com/search?s=solid&f=classic&o=r  */}
                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
                            <CDBSidebarMenuItem icon={'th-large'}>
                                Home
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink to="/examplepage" className={({ isActive }) => (isActive ? 'activeClicked' : '')}>
                            <CDBSidebarMenuItem icon={'plus-circle'}>
                                Example Page
                            </CDBSidebarMenuItem>
                        </NavLink>

                    </CDBSidebarMenu>
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    );
}

export default SideBar;