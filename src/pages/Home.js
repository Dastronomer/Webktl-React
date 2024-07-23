import React from 'react';
import DataContainer2Cols from "../components/DataContainer2Cols";

function Home() {
    const welcomeTop =
        <div style={{display: "block"}}>
            <img className="teleSpin" src="https://cdn-icons-png.flaticon.com/512/196/196689.png" alt="telescope icon"
                 style={{width: 200, height: 200, margin: 20}}/>
            <p> Edit src/pages/Home.js and reload. </p>
            <a href="https://docs.google.com/document/d/1ZXb-GyRgDWFwtJJuHYQp73xIFHthu4LSulk-I-0lolg/edit?usp=sharing">
                Learn React-WebKTL
            </a>
        </div>

    return (
        <div>
            <DataContainer2Cols header={'WELCOME TO YOUR OWN REACT-WEBKTL PAGE'} contentTop={welcomeTop}/>
        </div>
    );
}

export default Home;