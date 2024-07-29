// File KeywordForm.js
// Last Modified: July 26, 2024 by aNakashima
// Description: Functional input forms can be created with a valid keyword.

import React, {useCallback, useEffect} from 'react';
import {useState} from "react";
import {useWebSocket1} from "../context/WebSocketProviders";

function KeywordForm({keyword, label, makeConfirm}) {
    const {sendMessage, messages} = useWebSocket1();
    const defaultInput = "";
    const[bgColor, setBgColor] = useState("transparent");
    const [input, setInput] = useState("");
    const [initialInput, setInitialInput] = useState('');


    useEffect(() => {
        const message = messages.find((msg) => msg.key === keyword);
        if(message){
            setInitialInput(message.value);
        }
    }, [keyword, messages]);




    const handleInput = (e) => {
        setInput(e.target.value)
        setBgColor(e.target.value ? "pink" : "transparent");
    }


    // On enter -> window prompts user confirmation
    // if user not confirm, reverts input back to default
    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            const userConfirmed = !makeConfirm || window.confirm(`Are you sure you want to adjust data?`);
            if(userConfirmed) {
                performAction();
            }else{
                setBgColor('transparent');
                setInput(defaultInput);
            }
        }
    }

    const performAction = useCallback(() => {
        setBgColor('transparent');
        const message = { "type": "modify", "request_id": null, "key":keyword, "value":input};
        sendMessage(message);
        // put code for modifying here
    }, [input, keyword, sendMessage])

    const keyArray = keyword.split(".");
    let key = keyArray[1];



    return (
        <div style={{fontSize:10, margin:5}}>
            <form>
                <label id={`${keyword}-input`}> {label ? label : `${key}: ${initialInput} ` }
                    <input
                        id={`${keyword}-form`}
                        type="text"
                        value={input}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        style={{
                            backgroundColor:bgColor,
                            width: '60px'}}
                    />
                </label>
            </form>

        </div>
    );
}

export default KeywordForm;