// File: createWebSocketContext.js
// Last Modified: July 31, 2024 by aNakashima
// Description: Establishes handshake with WebSocket server. WebSocket handshake enables
// dual communication between server and client, ultimately enabling messages to be
// received and requests to be sent

import React, {createContext, useCallback, useContext, useEffect, useRef, useState} from 'react';

// 8/5/24 - aNakashima
// Expect WebSocket connection errors prior to successful connection.
// Don't know where errors are coming from, but appears harmless

const createWebSocketContext = (messageHandler) => {
    const WebSocketContext = createContext(null);

    const WebSocketProvider = ({url, children, command}) => {
        const [messages, setMessages] = useState([]);
        const [reqIdCounter, setReqIdCounter] = useState(0);
        const [metadata, setMetadata] = useState({});
        const wsRef = useRef(null);


        const closeConnection = useCallback(() => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        }, []);

        useEffect(() => {
            if (wsRef.current) {
                wsRef.current.close();
            }

            const wsClient = new WebSocket(url);
            wsRef.current = wsClient;

            wsClient.onopen = () => {
                console.log(`-- Connected to WebSocket server at ${url}`);
                try {
                    if (command) {
                        wsClient.send(command);
                    }
                } catch (e) {
                    console.error(`Error sending command: `, e);
                }
            };

            wsClient.onmessage = (message) => {
                try {
                    messageHandler(message, setMessages, setMetadata);
                } catch (error) {
                    console.error(`Error parsing JSON from ${url}: `, error);
                }
            };

            wsClient.onclose = (event) => {
                console.log(`== WebSocket connection closed at ${url}. Code: ${event.code}`);
            };

            wsClient.onerror = (error) => {
                console.error(`WebSocket error at ${url}: `, error);
            };

            return () => {
                if (wsClient.readyState === WebSocket.OPEN) {
                    wsClient.close();
                }
            };
        }, [command, url]);

        const sendMessage = useCallback((message) => {
            const ws = wsRef.current;
            if (ws && ws.readyState === WebSocket.OPEN) {
                setReqIdCounter(prevCounter => {
                    const newCounter = prevCounter + 1;
                    message.request_id = newCounter;
                    console.log(`Sending message to ${url}: ${JSON.stringify(message)}`);
                    ws.send(JSON.stringify(message));
                    return newCounter;
                });
            } else {
                console.error(`WebSocket is not open at ${url}`);
            }
        }, [ url]);

        return (
            <WebSocketContext.Provider value={{ messages, sendMessage, closeConnection, metadata }}>
                {children}
            </WebSocketContext.Provider>
        );
    };
    const useWebSocket = () => useContext(WebSocketContext);

    return { WebSocketProvider, useWebSocket };
}

export default createWebSocketContext;