// File KeywordCheckbox.js
// Last Modified: July 26, 2024 by aNakashima
// Description: Functional checkboxes can be created with a valid keyword. Sends modify request.

import React, {useState} from 'react';
import {useWebSocket1} from "../context/WebSocketProviders";

function KeywordCheckbox({keyword, label, options}){

    const [checkedList, setCheckedList] = useState([]);
    const {sendMessage} = useWebSocket1();


    // checkedHandler function
    // gets the value of checkbox that triggered teh event
    // checks if value is already in 'checkedList'
    const handleChecked = (e) => {
        const value = e.target.value;
        const updatedList = checkedList.includes(value)
            ? checkedList.filter((item) => item !== value)
            : [...checkedList, value];
            setCheckedList(updatedList);
        const message = { "type": "modify", "request_id": null, "key":keyword, "value":updatedList};
        sendMessage(message);
    };
    const keyArray = keyword.split(".");
    let key = keyArray[1];

    return (
        <div style={{fontSize:10}}>
            {label ? label : `${key}: ` }
            {options.map((option, index) => {
                return(
                    <div key={index} style={{display:'block'}}>
                        <label id={keyword + index}> {option}
                            <input
                                id={keyword + index}
                                type="checkbox"
                                value={option}
                                checked={checkedList.includes(option)}
                                onChange={handleChecked}
                            />
                        </label>
                    </div>
                );
            })}
            {checkedList}

        </div>
    );
}

export default KeywordCheckbox;