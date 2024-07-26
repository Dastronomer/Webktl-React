// File DataContainer2Cols.js
// Last Modified: July 26, 2024 by aNakashima
// Description: Enables the user to create nicely formatted web pages using React
// Bootstrap’s grid system. By passing in contents which might contain the essential
// components, user’s can mix and match to create a versatile site.

import React from 'react';
import {Col , Row} from "react-bootstrap";

function DataContainer2Cols({header, contentTop, contentLeft, contentRight, contentBottom}) {
    const displayContent = () => {
        if(contentLeft && contentRight){
            return (
                <div style={{fontSize:10}}>
                    {contentTop}
                    <Row>
                        <Col>{contentLeft}</Col>
                        <Col> {contentRight}</Col>
                    </Row>
                    {contentBottom}
                </div>
            )
        }else{
            return (
                <div style={{fontSize:10}}>
                    {contentTop}
                    <Row>
                        <Col>{contentLeft}</Col>
                    </Row>
                    {contentBottom}
                </div>
            )
        }
    }

    return (
        <div className='card' style={{margin:10, padding:5}}>
            {header ? <div className='header'>{header} </div> : " "}
            {displayContent()}
        </div>
    );
}

export default DataContainer2Cols;