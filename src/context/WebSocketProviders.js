// File: WebSocketProviders.js
// Last Modified: August 1, 2024 by aNakashima
// Description: defines two custom handlers for different WebSocket contexts.
// Handlers determine how message from WebSocket are filtered and used by children
// components. Exports the created WebSocket Providers and hooks.

import createWebSocketContext from './createWebSocketContext';

// Custom handler for WebSocket at URL type gather messages and metadata
const handleMessageSocket1 = (message, setMessages, setMetadata) => {
    let parsedMessage;
    try {
        const oneMessage = message.data;
        const processedData = oneMessage.replace(/\binf\b/g, '"inf"');
        parsedMessage = JSON.parse(processedData);
        function convertParsedData(obj){
            for(const key in obj){
                if(obj[key] === "Infinity"){
                    obj[key] = Infinity;
                }else if(obj[key] === 0){
                    obj[key] = '0';
                }else if(obj[key] === ""){
                    obj[key] = " ";
                } else if(typeof obj[key] === 'object' && obj[key] !== null){
                    convertParsedData(obj[key]);
                }
            }
        }
        convertParsedData(parsedMessage);

        if(parsedMessage.type && parsedMessage.request_id) {
            if(parsedMessage.errcode !== "SUCCESS"){
                alert(`ERROR: ${parsedMessage.msg}`)
                // console.log(`request: ${parsedMessage.request_id}  error: ${parsedMessage.msg}`)
            }else(
                // alert(`${parsedMessage.errcode}`)
                console.log(`request: ${parsedMessage.request_id} was a ${parsedMessage.errcode}`)
            )

        }
        else if(parsedMessage.key && parsedMessage.value){
            setMessages((prevMessages) => {
                // Check if parsedMessage is already in prevMessages
                const existingMessage = prevMessages.find(msg => msg.key === parsedMessage.key);

                if (existingMessage) {
                    // If the message already exists, update its value
                    return prevMessages.map(msg =>
                        msg.key === parsedMessage.key ? { ...msg, value: parsedMessage.value } : msg
                    );
                } else {
                    // Otherwise, add the new message to the array
                    return [...prevMessages, parsedMessage];
                }
            });
        }else if(parsedMessage.metadata){
            setMetadata(parsedMessage.metadata);
        }

    } catch(error) {
        console.error(`Error parsing JSON: `, error);
    }
};


// Custom handler for WebSocket at URL type gather data for history plot
const handleMessageSocket2 = (message, setMessages, setMetadata) => {
    let newStr;
    let newData = [];

    const isValidJSON = str => {
        try {
            if(str.trim().startsWith('{ "time":')){
                newStr = str.trim().replace(/,\s*$/, "");
            }else{
                newStr = str;
            }
            JSON.parse(newStr);
            return true;
        } catch (e) {
            return false;
        }
    };
    const isAbsurdValue = (value) => {
        // You can adjust this logic for what constitutes an absurd value
        const absurdThreshold = 1e37;
        return Math.abs(value) >= absurdThreshold;
    };

    const isError = (message) => {
        try{
            const errorMessage = JSON.parse(message);
            return Boolean(errorMessage.error)
        }catch(e){
            return false;
        }
    }

    const gatherPlotData = (data) => {
        data.forEach(entry => {
            const time = entry.time;
            const values = entry.values;
            setMessages(prevMessages => {
                const updatedMessages = prevMessages.map((item, idx) => {
                    if (idx < values.length) {
                        const value = parseFloat(values[idx]);

                        if (!isAbsurdValue(value) && (value != null)) {
                            return {
                                ...item,
                                x: [...item.x, time],
                                y: [...item.y, value]
                            };
                        }
                    }
                    return item;
                });

                return updatedMessages.filter(item => item.x.length > 0 && item.y.length > 0); // Filter out empty x or y arrays
            });
        })
    }

    let parsedMessage;
    try {
        const oneMessage = message.data;
        if(isError(oneMessage)){
            alert(`Error: ${JSON.parse(oneMessage).error}`)
        }

        if(isValidJSON(oneMessage)){
            parsedMessage = JSON.parse(newStr);
            if(parsedMessage.keywords){
                newData = parsedMessage.keywords.map((key, index) => ({
                    keyword : key,
                    x : [],
                    y: []
                }))
                setMessages(newData);
           }else if(parsedMessage.data){
               gatherPlotData(parsedMessage.data)
           }else if(parsedMessage.history){
                gatherPlotData(parsedMessage.history)
           }else if(parsedMessage.time){
                setMessages(prevMessages => [...prevMessages, parsedMessage]);
            }
            else{
            }
        }
    }catch (e){
        console.error(`error: `, e);
    }
};

const handlePlotKeywords = (plotKeywords) => {
    return plotKeywords.replace(/\s+/g, '&');
}

// Create specific WebSocket providers
const { WebSocketProvider: WebSocketProvider1, useWebSocket: useWebSocket1 } = createWebSocketContext(handleMessageSocket1);
const { WebSocketProvider: WebSocketProvider2, useWebSocket: useWebSocket2 } = createWebSocketContext(handleMessageSocket2);

export { WebSocketProvider1, useWebSocket1, WebSocketProvider2, useWebSocket2, handlePlotKeywords};