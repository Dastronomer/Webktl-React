import React, {useEffect, useState} from 'react';
import {useWebSocket1} from "../context/WebSocketProviders";

function AttrKeywordDisplay({keyword}) {
    const { messages, metadata } = useWebSocket1();
    const getRemarks = (keyword) => {
        if(metadata[keyword]) {
            return metadata[keyword].remarks;
            ;        }else {
            return "Keyword not found";
        }
    }
    return (
        <>
            {getRemarks(keyword)}
        </>
    );
}

export default AttrKeywordDisplay;