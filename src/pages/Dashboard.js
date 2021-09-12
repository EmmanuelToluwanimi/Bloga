import React from 'react';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
// import Blogposts from '../components/Blogposts';
// import Nav from "../components/Nav";
import './dashboard.css';
import bloglp from "../assets/image/bloglp.jpg";
import Writeblogs from '../components/Writeblogs';
import Dashblogs from '../components/Dashblogs';
import Dashlogs from '../components/Dashlogs';
import Profile from '../components/Profile';
import { CgLoadbarSound, CgNotes, CgProfile, CgArrowLeftR } from "react-icons/cg";
import { RiQuillPenFill, RiNotification2Fill } from "react-icons/ri";





export default function Dashboard() {
    let { path, url } = useRouteMatch();


    return (
        <>

            <section id="dashboard">
                <div className="container-fluid dashboard-holder">
                    <div className="sd shadow bg-secondary text-white">
                        <div className="sidebar shadow">
                            <div className="user-card border-bottom">

                                <div className="img-holder ">
                                    {/* <Image src={bloglp} fluid roundedCircle /> */}
                                    <img src={bloglp} alt="useravatar" className="userimg avatar" />
                                </div>
                                <h5 className="username">Adekunle Ajasin</h5>

                            </div>
                            <div className="sidebar-menu">
                                <Link to={`${url}`} className="menu btn w-100 text-white d-flex align-items-center gap-3  d-block">
                                   <CgLoadbarSound/> Dashboard
                                </Link>
                                <Link to={`${url}/userblogs`} className="menu btn w-100 text-white d-flex align-items-center gap-3  mt-2 d-block">
                                   <CgNotes/> Blogs
                                </Link>
                                <Link to={`${url}/write`} className="menu btn w-100 text-white d-flex align-items-center gap-3  mt-2 d-block">
                                   <RiQuillPenFill/> Write
                                </Link>
                                <Link to={`${url}/profile`} className="menu btn w-100 text-white d-flex align-items-center gap-3  mt-2 d-block">
                                   <CgProfile/> Profile
                                </Link>
                                <div className="menu btn w-100 text-white d-flex align-items-center gap-3 border-0 mt-2">
                                   <RiNotification2Fill/> Notification
                                </div>
                                <div className="menu btn w-100 text-white d-flex align-items-center gap-3  mt-2">
                                   <CgArrowLeftR/> Sign Out
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="platform">
                        <div className="platform-holder">
                            <div className="container breadcrumb">dashboard</div>

                            <div className="dash-content">
                                <Switch>
                                    All content goes here
                                    <Route exact path={`${path}`} component={Dashlogs} />
                                    <Route path={`${path}/userblogs`} component={Dashblogs} />
                                    <Route path={`${path}/write`} component={Writeblogs} />
                                    <Route path={`${path}/profile`} component={Profile} />
                                </Switch>


                            </div>
                        </div>

                    </div>
                </div>
            </section>



        </>
    )
}
