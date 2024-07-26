// File: Ticker.js
// Last Modified: July 26, 2024 by aNakashima
// Description: When given DISPCLK keyword, as long as the keyword does not remain
// dormant for more than 5 seconds, ticker will continue to turn.

import React, { useState, useEffect } from 'react';
import {useWebSocket1} from "../context/WebSocketProviders";

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
    const [currentValue, setCurrentValue] = useState('/');
    const {messages} = useWebSocket1();
    const [messageCount, setMessageCount] = useState(0);

    useEffect(() => {
        messages.forEach((msg) => {
            if (msg.key === keyword) {
                setMessageCount((prevCount) => {
                    const newCount = prevCount + 1;
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