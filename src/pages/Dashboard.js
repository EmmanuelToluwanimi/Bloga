import React from 'react';
// import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
// import Blogposts from '../components/Blogposts';
// import Nav from "../components/Nav";
import './dashboard.css';
import bloglp from "../assets/image/bloglp.jpg";
import Writeblogs from '../components/Writeblogs';
// import Dashblogs from '../components/Dashblogs';
// import Dashlogs from '../components/Dashlogs';





export default function Dashboard() {
    // let { path, url } = useRouteMatch();


    return (
        <>
            {/* <h1>Dashboard</h1>
            <ul>
                <li>
                    <Link to={`${url}/nav`}>dashnav</Link>
                </li>
                <li>
                    <Link to={`${url}/blogs`}>Blogs</Link>
                </li>
                
            </ul>
            <hr />
            <Switch>
                <Route exact path={`${path}/blogs`} component={Blogposts} />
                <Route path={`${path}/nav`} component={Nav} />
            </Switch> */}

            <section id="dashboard">
                <div className="container-fluid dashboard-holder">
                    <div className="sd shadow">
                        <div className="sidebar border">
                            <div className="user-card border-bottom">

                                <div className="img-holder ">
                                    {/* <Image src={bloglp} fluid roundedCircle /> */}
                                    <img src={bloglp} alt="useravatar" className="userimg avatar" />
                                </div>
                                <h5 className="username">Adekunle Ajasin</h5>

                            </div>
                            <div className="sidebar-menu">
                                <div className="menu border-top border-bottom">
                                    Dashboard
                                </div>
                                <div className="menu border-top border-bottom mt-2">
                                    Blogs
                                </div>
                                <div className="menu border-top border-bottom mt-2">
                                    Write
                                </div>
                                <div className="menu border-top border-bottom mt-2">
                                    Account
                                </div>
                                <div className="menu border-top border-bottom mt-2">
                                    Notification
                                </div>
                                <div className="menu border-top border-bottom mt-2">
                                    Sign Out
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="platform">
                        <div className="platform-holder">
                            <div className="container breadcrumb">dashboard</div>

                            <div className="dash-content">
                                All content goes here
                                {/* <Dashlogs /> */}
                                {/* <Dashblogs/> */}
                                <Writeblogs/>
                            </div>
                        </div>

                    </div>
                </div>
            </section>



        </>
    )
}
