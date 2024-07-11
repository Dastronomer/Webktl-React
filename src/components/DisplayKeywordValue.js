import React, {useEffect, useState} from 'react';
import {useWebSocket} from "../context/WebSocketContext";

function DisplayKeywordValue({keyword}) {
    const {messages} = useWebSocket();
    const [value, setValue] = useState(null);

    useEffect(() => {
        // console.log(`length : ${Object.keys(messages).length}`)
        messages.forEach(msg => {
            if(msg.key === keyword){
                console.log(`key33: ${msg.key} : value ${msg.value}`)
                setValue(msg.value);
            }
        })
    }, [messages, keyword])



    return (
        <div style={{fontSize:10, margin:5}}>
            {value !== null ? (
                    <p>{`${keyword} : ${value}`}</p>
                ) : (
                    <p> {`${keyword} : notfound`}</p>
                )
            }
        </div>
    );
}

export default DisplayKeywordValue;