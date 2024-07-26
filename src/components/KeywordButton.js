// File KeywordButton.js
// Last Modified: July 26, 2024 by aNakashima
// Description: Functional buttons can be created with a valid keyword.

import React from 'react';
import {Button} from "react-bootstrap";
import {useWebSocket1} from "../context/WebSocketProviders";

function KeywordButton({keyword, variant, label, buttonValue, makeConfirm}) {

    const {sendMessage} = useWebSocket1();


    const keyArray = keyword.split(".");
    let key = keyArray[1];

    const handleClick = () => {
        const userConfirmed = !makeConfirm || window.confirm(`Confirm ${key} button click`);
        if(userConfirmed){
            const message = { "type": "modify", "request_id": null, "key": keyword, "value": buttonValue};
            sendMessage(message);
        }

    }

    return (
        <div style={{margin:5}}>
            <Button
                style={{fontSize: 8, margin: 2}}
                variant={variant ? variant : "secondary"}
                id={`${keyword}-button`}
                size="sm"
                onClick={handleClick}
                type="button"
            >
                {label ? label : key }
            </Button>






        </div>
    );
}

export default KeywordButton;