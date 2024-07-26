// File DisplayKeywordValue.js
// Last Modified: July 26, 2024 by aNakashima
// Description: Given any valid keyword, the corresponding value is displayed in real-time.
// Label can be adjusted as needed, or left off for no additional text displayed.

import React, {useEffect, useState} from 'react';
import {useWebSocket1} from "../context/WebSocketProviders";
import {Spinner} from "react-bootstrap";

function DisplayKeywordValue({keyword, label}) {
    const {messages} = useWebSocket1();
    const [value, setValue] = useState(null);

    useEffect(() => {
        // console.log(`length : ${Object.keys(messages).length}`)
        messages.forEach(msg => {
            if(msg.key === keyword){
                setValue(msg.value);
            }
        })
    }, [messages, keyword])

    return (
        <div style={{margin:2}}>
            {value !== null ? (
                <div>{ label ? <div><b>{label}</b>: {value} </div>: value } </div>
            ) : (
                <div>{label ? <span><b>{label}</b>: <Spinner animation="border" size='sm'/> </span> : <Spinner animation="border" size='sm'/> } </div>
            )
            }
        </div>
    );
}

export default DisplayKeywordValue;