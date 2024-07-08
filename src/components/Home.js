import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import EssentialFeatures from "./EssentialFeatures";
import Alarms2 from "./Alarms2";

function Home() {
    return (
        <div>
            <EssentialFeatures />
            <Alarms2/>
        </div>
    );
}

export default Home;