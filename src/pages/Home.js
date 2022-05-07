import React from 'react'
import Blogposts from '../components/Blogposts';
// import Nav from '../components/Nav';
// import bloglp from "../assets/image/bloglp.jpg";
import './Home.css';


export default function Home() {
    return (
        <>
            
            <section id="home">
                <div className="container-fluid p-0">

                    <div className="hero-section">
                        {/* <img src={bloglp} alt="notes" /> */}
                        <div className="hero-caption">
                            <h2>Bloga</h2>
                            <div>Get Latest News Update from our blog</div>
                        </div>
                    </div>

                    <Blogposts />

                </div>
            </section>
        </>
    )
}
