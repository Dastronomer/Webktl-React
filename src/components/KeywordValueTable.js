import React, {useEffect, useState} from 'react';
import {Spinner, Table} from "react-bootstrap";
import {useWebSocket1} from "../context/WebSocketProviders";

function KeywordValueTable({ keywordList, keywordLabelList, title, includeRemarks}) {
    const { messages, metadata } = useWebSocket1();
    const [values, setValues] = useState({});


    useEffect(() => {
        const newValues = {};
        keywordList.forEach(keyword => {

            const message = messages.find(msg => msg.key === keyword);
            newValues[keyword] = message ? message.value : null;
        });
        setValues(newValues);
    }, [messages, keywordList]);

    useEffect(() => {
        const backgroundColors = {
            'NOTICE': 'lemonchiffon',
            'ERROR': 'pink',
            'DISABLED': 'peachpuff',
            'WARNING': 'plum',
        };

        messages.forEach(msg => {
            const span = document.getElementById(msg.key);
            if (span) {
                span.innerText = msg.value;
                span.style.backgroundColor = backgroundColors[msg.value] || 'transparent';
            }
        });
    }, [messages]);

    const getHtmlLabel = (keyword) => {
        if(metadata[keyword]) {
            const parsedRemarks = JSON.parse(metadata[keyword].remarks);
            return parsedRemarks.htmllabel
                ;        }else {
            return <Spinner animation='border' size='sm'/>;
        }
    }
    const getUnits = (keyword) => {
        if(metadata[keyword]) {
            const unit = metadata[keyword].lunits;
            if(unit !== "meaningless units"){
                if (typeof unit === 'string') {
                    return unit.replace(/deg/g, '°').replace(/\s+/g, '');
                }
                return unit;
            }else{
                return null;
            }
        }else {
            return null;
        }
    }


    return (
        <div className='key-value-table'>
            <Table bordered hover >
                {title ? (
                    <thead>
                    <tr>
                        <th colSpan={includeRemarks ? 3 : 2} style={{ backgroundColor: 'whitesmoke' }}>{title}</th>
                    </tr>
                    </thead>
                ) : null}
                <tbody>
                {keywordList.map(((keyword, index) => (
                    <tr key={keyword}>
                        <td style={{width:'30%'}}> {keywordLabelList ? <b>{keywordLabelList[index]}</b> : keyword}</td>
                        {includeRemarks && <td>{getHtmlLabel(keyword)}</td>}
                        {values[keyword] !== null ?
                            <td id={keyword}> {values[keyword]}{getUnits(keyword)}</td>
                            :
                            <td style={{backgroundColor:'pink'}}>ERROR: KEYWORD NOT VALID or VALUE is null</td>}
                    </tr>
                )))}
                </tbody>
            </Table>
        </div>
    );
}

export default KeywordValueTable;