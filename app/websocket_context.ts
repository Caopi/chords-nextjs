'use client';
import useWebSocket, { ReadyState, SendMessage } from 'react-use-websocket';
import { createContext, useEffect, useState, useCallback } from 'react';

export interface WebSocket {
    sendMessage: SendMessage,
    lastMessageText: string | null,
    readyState: ReadyState,
}

export default function useChordsWebSocket(): WebSocket {
    const getSocketUrl = useCallback(() => {
        return `ws${window.location.protocol == "https:" ? "s" : ""}://${window.location.host}/api/ws`;
    }, []);
    const { sendMessage, lastMessage, readyState } = useWebSocket(
        getSocketUrl,
        {
            shouldReconnect: () => true,
            heartbeat: {message: 'ping', returnMessage: 'pong', timeout: 15000, interval: 10000},
        });
    
    // const [messageHistory, setMessageHistory] = useState<string[]>([]);
    const [lastMessageText, setLastMessageText] = useState<string>('');

    useEffect(() => {
        async function processMessage(){
            if (lastMessage !== null) {
                const text = await lastMessage.data.text();
                console.log(text);
                setLastMessageText(text);
                // const json = JSON.parse(text);
                // console.log(json);
                // setMessageHistory((prev) => prev.concat(text));
            }
        }
        
        processMessage();
    }, [lastMessage]);

    return { sendMessage, lastMessageText, readyState };
}

export const WebSocketContext = createContext<WebSocket>({
    sendMessage: () => {},
    lastMessageText: '',
    readyState: ReadyState.UNINSTANTIATED,
});
