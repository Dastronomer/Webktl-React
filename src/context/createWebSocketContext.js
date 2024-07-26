import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';

const createWebSocketContext = (messageHandler, plotUpdate) => {
    const WebSocketContext = createContext(null);

    const WebSocketProvider = ({url, children, command}) => {
        const [messages, setMessages] = useState([]);
        const [ws, setWs] = useState(null);
        const [reqIdCounter, setReqIdCounter] = useState(0);
        const [metadata, setMetadata] = useState({});

        const closeConnection = useCallback(() => {
            if(ws){
                ws.close();
            }
        }, [ws]);

        useEffect(() => {
            const wsClient = new WebSocket(url);

            wsClient.onopen = () => {
                console.log(`Connected to WebSocket server at ${url}`);
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
                console.log(`WebSocket connection closed at ${url}. Code: ${event.code}, Reason: ${event.reason}`);
            };

            wsClient.onerror = (error) => {
                console.error(`WebSocket error at ${url}: `, error);
            };

            setWs(wsClient);

            return () => {
                if (wsClient.readyState === WebSocket.OPEN) {
                    wsClient.close();
                }
            };
        }, [command, url]);

        const sendMessage = useCallback((message) => {
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
        }, [ws, url]);

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