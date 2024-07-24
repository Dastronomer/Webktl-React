import React, {useEffect, useState} from 'react';
import Plot from "react-plotly.js";
import {useWebSocket2} from "../context/WebSocketProviders";
import {Col, Container, Form, FormLabel, Row} from "react-bootstrap";
import {autosize} from "plotly.js/src/plots/layout_attributes";

function PlotCommand(
    {
        onFromOption, onToOption, onIntervals,
        fromArray= ['4 days ago', '3 days ago', '2 days ago', '24 hours ago', '12 hours ago', '8 hours ago', '4 hours ago', '2 hours ago'],
        toArray = ['4 days ago', '3 days ago', '2 days ago', '24 hours ago', '12 hours ago', '8 hours ago', '4 hours ago', '2 hours ago', 'now'],
        intervalArray = ['1h', '30min', '10min', '1min', '20s', '10s'],
        title
    }) {

    const [useDropdown, setUseDropdown] = useState(true);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [interval, setInterval] = useState('');
    const [plotData, setPlotData] = useState([]);

    const {messages} = useWebSocket2();
    const handlePlotData = () => {
        const colors = ['red', 'blue', 'green', 'goldenrod', 'teal', 'orange', 'pink', 'brown', 'purple', 'grey', 'cyan', 'violet'];
        return messages.map((message, index) => ({
            x: message.x,
            y: message.y,
            type: 'scatter',
            mode: 'lines',
            name: message.keyword,
            marker: { color: colors[index % colors.length]},
        }));
    }

    useEffect(() => {
        setPlotData(handlePlotData(messages));
    }, [messages]);

    const generateOptions = (optionsArray, selectedValue) => {
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
                                        <select onChange={(e) => onFromOption(e.target.value)} defaultValue={'12 hours ago'} >
                                            {generateOptions(fromArray, '12 hours ago')}
                                        </select>
                                    </label>
                                    <label>
                                        To:
                                        <select onChange={(e) => onToOption(e.target.value)} defaultValue={'now'}>
                                            {generateOptions(toArray, 'now')}
                                        </select>
                                    </label>
                                    <label>
                                        Sampling Interval:
                                        <select onChange={(e) => onIntervals(e.target.value)} defaultValue={'1min'}>
                                            {generateOptions(intervalArray, '1min')}
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
                                            placeholder="1min"
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
            <div>
                <Plot
                    data={plotData}
                    layout={{
                        title: title ?? 'Fancy Plot',
                        autosize
                    }}
                />
            </div>
        </div>
    );
}

export default PlotCommand;