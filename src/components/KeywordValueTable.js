import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {useWebSocket1} from "../context/WebSocketProviders";

function KeywordValueTable({ keywordList, keywordLabelList, title }) {
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

    const getRemarks = (keyword) => {
        if(metadata[keyword]) {
            return metadata[keyword].remarks;
;        }else {
            return "Keyword not found";
        }
    }


    return (
        <div className='key-value-table'>
            <Table bordered hover >
                {title ? (
                    <thead>
                    <tr>
                        <th colSpan={2} style={{ backgroundColor: 'whitesmoke' }}>{title}</th>
                    </tr>
                    </thead>
                ) : null}
                <tbody>
                {keywordList.map(((keyword, index) => (
                    <tr key={keyword}>
                        <td style={{width:'35%'}}>{keywordLabelList ? <b>{keywordLabelList[index]}</b> : keyword}</td>
                        {values[keyword] !== null ?
                            <td> {values[keyword]} </td>
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