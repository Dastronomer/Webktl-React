import React, {useEffect, useState} from 'react';
import {useWebSocket} from "../context/WebSocketContext";
import {Form, FormLabel} from "react-bootstrap";

function KeywordBoolSwitch({keyword, label, makeConfirm}) {
    const {sendMessage, messages} = useWebSocket();
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    useEffect(() => {
        const message = messages.find((msg) => msg.key === keyword);
        if(message){
            let newVal = message.value;
            newVal = newVal.toLowerCase();
            setIsSwitchOn(newVal === 'true' || newVal === 'on' || newVal === 'yes' || newVal === '1');
        }else{
            setIsSwitchOn(false);
        }
    }, [messages, keyword]);

    const keyArray = keyword.split(".");
    let key = keyArray[1];

    const handleSwitched = () => {
        const userConfirmed = !makeConfirm || window.confirm(`Confirm {${key}} switch change: `);
        if(userConfirmed){
            const newSwich = !isSwitchOn;
            setIsSwitchOn(newSwich);
            const message = { "type": "modify", "request_id": null, "key":keyword, "value":newSwich ? '1' : '0'};
            sendMessage(message);

        }
    }

    return (
        <Form >

            <FormLabel style={{display:"inline"}} >
                {label ? label : `${key}: `}
                <Form.Check
                    type="switch"
                    id={`${keyword}-switch`}
                    onChange={handleSwitched}
                    checked={isSwitchOn}
                    style={{display:"inline"}}
                />
            </FormLabel>


        </Form>
    );
}

export default KeywordBoolSwitch;