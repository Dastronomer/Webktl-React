// File KeywordHistoryPlot.js
// Last Modified: July 26, 2024 by aNakashima
// Description: Given a WebSocket URL, service name, and keywords, this component
// generates a line graph displaying the values of the specified keywords over time
// using open source library Plotly. Provides the url connection to PlotCommand.js

import React, { useEffect, useState} from 'react';
import {handlePlotKeywords, WebSocketProvider2} from "../context/WebSocketProviders";
import PlotCommand from "./PlotCommand";

function KeywordHistoryPlot({url, serviceName, keywords, fromArray, toArray, intervalArray, title, mode}) {

    const plotKeywords = keywords;
    const [fromOption, setFromOption] = useState(fromArray && fromArray.length > 0 ? fromArray[0] : "12 hours ago");
    const [toOption, setToOption] = useState(toArray && toArray.length > 0 ? toArray[0] : "now");
    const [intervals, setIntervals] = useState(intervalArray && intervalArray.length > 0 ? intervalArray[0] : "1min");
    const [command, setCommand] = useState('');

    useEffect(() => {
        let newCommand = `-s&${serviceName}&${handlePlotKeywords(plotKeywords)}&-date&${fromOption}`;

        if (toOption !== 'now') {
            newCommand += `&-date&${toOption}`;
        }else{
            newCommand += '&-c';
        }

        newCommand += `&-interval&${intervals}&-jsonrows`;

        setCommand(newCommand)
    }, [fromOption, toOption, intervals, plotKeywords, serviceName]);

    return (
        <WebSocketProvider2 url={url} command={command}>
            <PlotCommand
                onFromOption={setFromOption}
                onToOption={setToOption}
                onIntervals={setIntervals}
                fromArray={fromArray}
                toArray={toArray}
                intervalArray={intervalArray}
                title={title}
                mode={mode}/>
        </WebSocketProvider2>
    );
}

export default KeywordHistoryPlot;