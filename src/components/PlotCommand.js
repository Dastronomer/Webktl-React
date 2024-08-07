// File PlotCommand.js
// Last Modified: July 30, 2024 by aNakashima
// Description: Works with KeywordHistoryPlot to create the plot graph in app.

import React, {useEffect, useState} from 'react';
import Plot from "react-plotly.js";
import {useWebSocket2} from "../context/WebSocketProviders";
import {Col, Container, Form, FormLabel, Row} from "react-bootstrap";
import autosize from "plotly.js/src/plots/layout_attributes";


function PlotCommand(
    {
        initalFrom,
        initalTo,
        initialInterval,
        onFromOption,
        onToOption,
        onIntervals,
        fromArray= ['4 days ago', '3 days ago', '2 days ago', '24 hours ago', '12 hours ago', '8 hours ago', '4 hours ago', '2 hours ago'],
        toArray = ['4 days ago', '3 days ago', '2 days ago', '24 hours ago', '12 hours ago', '8 hours ago', '4 hours ago', '2 hours ago', 'now'],
        intervalArray = ['1h', '30min', '10min', '1min', '20s', '10s'],
        title, mode, xKey, yKeys
    }) {

    const [useDropdown, setUseDropdown] = useState(true);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [interval, setInterval] = useState('');
    const [plotData, setPlotData] = useState([]);
    const [xValues, setXValues] = useState([]);
    const [yValues, setYValues] = useState([]);
    const colors = ['red', 'blue', 'green', 'goldenrod', 'teal', 'orange', 'pink', 'brown', 'purple', 'grey', 'cyan', 'violet'];


    const {messages} = useWebSocket2();

    useEffect(() => {
        if (xKey) {
            let newXValues = [];
            let newYValues = {};
            yKeys.forEach(yKey => newYValues[yKey] = []);

            messages.forEach(msg => {
                if (msg.keyword === xKey) {
                    newXValues = msg.y;
                } else if (yKeys.includes(msg.keyword)) {
                    newYValues[msg.keyword] = msg.y;
                }
            });

            setXValues(newXValues);
            setYValues(newYValues);

            const newPlotData = yKeys.map((yKey, index) => ({
                x: newXValues,
                y: newYValues[yKey],
                type: 'scatter',
                mode: 'markers',
                name: yKey,
                marker: {  color: colors[index % colors.length] }, // Replace with desired colors
            }));

            setPlotData(newPlotData);
        }else{
            const newPlotData = messages.map((message, index) => ({
                x: message.x,
                y: message.y,
                type: 'scatter',
                mode: mode ?? 'lines',
                name: message.keyword,
                marker: { color: colors[index % colors.length] },
            }));
            setPlotData(newPlotData);
        }
    }, [messages, mode, xKey, yKeys]);


    const generateOptions = (optionsArray) => {
        return optionsArray.map((option, index) => (
            <option key={index} value={option}>
                {option}
            </option>
        ));
    };

    const handleChangeFrom = (e) => {
        setFrom(e.target.value);
    };

    const handleKeyDownFrom = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onFromOption(from);
        }
    };

    const handleChangeTo = (e) => {
        setTo(e.target.value);
    };

    const handleKeyDownTo = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onToOption(to);
        }
    };

    const handleChangeInterval = (e) => {
        setInterval(e.target.value);
    };

    const handleKeyDownInterval = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onIntervals(interval);
        }
    };

    return (
        <div className="card" style={{margin: 10, padding: 5}}>
            <Container>
                <Row>
                    <Col xs={11}>
                        <div className="select-container" align="left"
                             style={{margin: 10, justifyContent: 'space-evenly'}}>
                            {useDropdown ? (
                                <>
                                    <label>
                                        From:
                                        <select id={'plot-from-date'} onChange={(e) => onFromOption(e.target.value)} defaultValue={initalFrom} >
                                            {generateOptions(fromArray, fromArray[0])}
                                        </select>
                                    </label>
                                    <label>
                                        To:
                                        <select id={'plot-to-date'} onChange={(e) => onToOption(e.target.value)} defaultValue={initalTo}>
                                            {generateOptions(toArray, toArray[0])}
                                        </select>
                                    </label>
                                    <label>
                                        Sampling Interval:
                                        <select id={'plot-sampling-interval'} onChange={(e) => onIntervals(e.target.value)} defaultValue={initialInterval}>
                                            {generateOptions(intervalArray, intervalArray[0])}
                                        </select>
                                    </label>
                                </>
                            ) : (
                                <>
                                    <label>
                                        From:
                                        <input
                                            type="text"
                                            value={from}
                                            onChange={handleChangeFrom}
                                            onKeyDown={handleKeyDownFrom}
                                            placeholder="12 hours ago"
                                        />
                                    </label>
                                    <label>
                                        To:
                                        <input
                                            type="text"
                                            value={to}
                                            onChange={handleChangeTo}
                                            onKeyDown={handleKeyDownTo}
                                            placeholder="now"
                                        />
                                    </label>
                                    <label>
                                        Sampling Interval:
                                        <input
                                            type="text"
                                            value={interval}
                                            onChange={handleChangeInterval}
                                            onKeyDown={handleKeyDownInterval}
                                            placeholder="1h"
                                        />
                                    </label>
                                </>
                            )}
                        </div>
                    </Col>
                    <Col>
                        <div className="toggle-container" align="right"
                             style={{marginRight: 10, justifyContent: "space-evenly"}}>
                            <Form>
                                <FormLabel style={{display: "inline"}}>
                                    <Form.Check
                                        type="switch"
                                        id={`bool-switch`}
                                        onChange={() => setUseDropdown(!useDropdown)}
                                        style={{display: "inline"}}
                                    />
                                </FormLabel>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
            {xKey && yKeys.length > 0 ? (
                <Plot
                    data={plotData}
                    layout={{
                        title: title ?? 'Fancy Plot',
                        xaxis: { title: xKey },
                        yaxis: {title: 'Values' },
                        autosize,
                    }}
                />
            ) : (
                <Plot
                    data={plotData}
                    layout={{
                        title: title ?? 'Fancy Plot',
                        xaxis: { title: 'Time' },
                        yaxis: { title: 'Value' },
                        autosize,
                    }}
                />
            )}
        </div>
    );
}

export default PlotCommand;