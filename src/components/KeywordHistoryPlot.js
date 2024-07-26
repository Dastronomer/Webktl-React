import React, { useEffect, useState} from 'react';
import {handlePlotKeywords, WebSocketProvider2} from "../context/WebSocketProviders";
import PlotCommand from "./PlotCommand";

function KeywordHistoryPlot({url, serviceName, keywords, fromArray, toArray, intervalArray, title}) {

    const plotKeywords = keywords;
    const [fromOption, setFromOption] = useState("12 hours ago");
    const [toOption, setToOption] = useState("now");
    const [intervals, setIntervals] = useState("1min");
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
            <PlotCommand onFromOption={setFromOption} onToOption={setToOption} onIntervals={setIntervals} fromArray={fromArray} toArray={toArray} intervalArray={intervalArray} title={title}/>
        </WebSocketProvider2>
    );
}

export default KeywordHistoryPlot;