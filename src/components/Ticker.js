import React, { useState, useEffect } from 'react';
import {useWebSocket1} from "../context/WebSocketProviders";

// Define the function to map values to ticker marks based on switch cases
const getTickerMark = (value) => {
    switch (value) {
        case '\\':
            return '|';  // en-dash
        case '|':
            return '/';
        case '/':
            return '-';
        case '-':
            return '\\';
    }
};

const Ticker = ({ keyword }) => {
    const [currentValue, setCurrentValue] = useState('/'); // Initialize with default value
    const {messages} = useWebSocket1();
    const [messageCount, setMessageCount] = useState(0);

    useEffect(() => {
        messages.forEach((msg) => {
            if (msg.key === keyword) {
                setMessageCount((prevCount) => {
                    const newCount = prevCount + 1;

                    // Only update currentValue every 5 messages
                    if (newCount % 10 === 0) {
                        setCurrentValue(getTickerMark(currentValue));
                    }

                    return newCount;
                });
            }
        });
    }, [messages, keyword, currentValue]);

    return (
        <div>
            {currentValue}
        </div>
    );
};

export default Ticker;