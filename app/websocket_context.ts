'use client';
import useWebSocket, { ReadyState, SendMessage } from 'react-use-websocket';
import { createContext, useEffect, useState, useCallback, useContext } from 'react';
import uuid4 from "uuid4";
import { UserPreferencesContext, UserPreferences } from './user_preferences_context';

export interface WebSocket {
    sendNetworkMessage: (message: NetworkMessage) => void,
    lastMessageText: string | null,
    allUsers: AllUsers
}

export interface NetworkMessageContainer {
    sender: string,
    // target?: string,
    data: NetworkMessage,
}

export interface NetworkMessage {
    uuid: string,
    focus?: string, // current view
    currentSheet?: string, // which file
    autoscrollSpeed?: number,
    autoscrolling?: boolean,
    transposition?: number,
    name?: string,
    following?: string,
    scrollPos?: number,
    allowLead?: boolean,
}

export type AllUsers = {
    [key: string]: NetworkMessage
}

export default function useChordsWebSocket(): WebSocket {
    // const userPreferences = useContext(UserPreferencesContext);

    const getSocketUrl = useCallback(() => {
        return `ws${window.location.protocol == "https:" ? "s" : ""}://${window.location.host}/api/ws`;
    }, []);
    const { sendMessage, lastMessage, readyState } = useWebSocket(
        getSocketUrl,
        {
            shouldReconnect: () => true,
            heartbeat: {message: 'ping', returnMessage: 'pong', timeout: 15000, interval: 10000},
        });
    
    const [allUsers, setAllUsers] = useState<AllUsers>({});
    const [lastMessageText, setLastMessageText] = useState<string>('');

    useEffect(() => {
        async function processMessage(){
            if (lastMessage !== null) {
                const text = await lastMessage.data.text();
                try{
                    const message: NetworkMessage = JSON.parse(text);
                    if (!message.uuid || !uuid4.valid(message.uuid)) {
                        console.error("Received update without UUID");
                        return;
                    }
                }
                console.log(text);
                // const json = JSON.parse(text);
                // console.log(json);
                // setMessageHistory((prev) => prev.concat(text));
            }
        }
        
        processMessage();
    }, [lastMessage]);

    function sendNetworkMessage(toSend: NetworkMessage){
        sendMessage(JSON.stringify(toSend));
    }

    return { sendNetworkMessage, lastMessageText, allUsers };
}

export const WebSocketContext = createContext<WebSocket>({
    sendNetworkMessage: () => {},
    lastMessageText: '',
    allUsers: {},
});
