import React from 'react';
import {Link} from "react-router-dom";
import DataContainer2Cols from "../components/DataContainer2Cols";

function NotFound(props) {
    return (
        <DataContainer2Cols contentTop={<div style={{margin:20}}>
            <h1> Sorry, page not found </h1>
            <Link to="/"> Back to homepage </Link>
        </div>} />
    );
}

export default NotFound;