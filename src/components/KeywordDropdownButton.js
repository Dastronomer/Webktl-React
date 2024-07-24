import React, {useEffect, useState} from 'react';
import {useWebSocket1} from "../context/WebSocketProviders";

function KeywordDropdownButton({label, keyword, options, makeConfirm, optionsKeyword}) {
    const {sendMessage, messages} = useWebSocket1();
    const [selectedOption, setSelectedOption] = useState('');
    const [initialOption, setInitialOption] = useState('');
    const [optionsArray, setOptionsArray] = useState(Array.isArray(options) ? options : []);

    useEffect(() => {
        const message = messages.find((msg) => msg.key === keyword);
        if(message){
            setInitialOption(message.value);
            setSelectedOption(message.value);
        }
    }, [keyword, messages]);

    useEffect(() => {
        if (optionsKeyword) {
            const message = messages.find((msg) => msg.key === optionsKeyword);
            if (message) {
                const messageValue = message.value;
                setOptionsArray(messageValue.split(" "));
            } else {
                setOptionsArray(Array.isArray(options) ? options : []);
            }
        } else {
            setOptionsArray(Array.isArray(options) ? options : []);
        }
    }, [optionsKeyword, messages, options]);

    const keyArray = keyword.split(".");
    let key = keyArray[1];
    const handleSelectChange = (e) => {
        const value = e.target.value;
        const userConfirmed = !makeConfirm || window.confirm(`Confirm dropdown selection ${value} for ${key}: `);
        if(userConfirmed){
            setSelectedOption(value);
            const message = { "type": "modify", "request_id": null, "key":keyword, "value":value};
            sendMessage(message);
        }
    }

    return (
        <div  style={{fontSize:10, display:'block', margin:3}}>

            <label>
                {label ? label : `${key}: ` }
                <select
                    // style={{display:'block'}}
                    onChange={handleSelectChange}
                    id={`${keyword}-dropdown`}
                    value={selectedOption}
                >
                    {optionsArray.map((value, index) => {
                            if (value === initialOption) {
                                return (
                                    <option key={index} value={value} selected>{value} </option>
                                )
                            } else {
                                return (
                                    <option key={index} value={value}>{value}</option>

                                )
                            }
                        }
                    )}
                </select>
            </label>

        </div>
    );
}

export default KeywordDropdownButton;