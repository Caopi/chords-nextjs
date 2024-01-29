"use client";
import React from 'react';
import { useReducer } from 'react';

import { UserPreferencesContext, PresetNames } from "./user_preferences_context";
import useChordsWebSocket, { WebSocketContext } from "./websocket_context";
import uuid4 from "uuid4";

/** Handles global user state. User preferences get automatically synced to localStorage on every change. */
export default function GlobalStateProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    /* User preferences */
    function updateUsername(currentUsername: string, updatedUsername: string){
        localStorage.setItem("name", updatedUsername);
        return updatedUsername;
    }
    const [username, setUsername] = useReducer(updateUsername, localStorage.getItem("name") || PresetNames[Math.floor(Math.random() * PresetNames.length)]);

    function updateAutoscrolling(currentAutoscrolling: boolean, updatedAutoscrolling: boolean){
        localStorage.setItem("autoscrolling", updatedAutoscrolling + "");
        return updatedAutoscrolling;
    }
    const [autoscrolling, setAutoscrolling] = useReducer(updateAutoscrolling, localStorage?.getItem("autoscrolling") === "true" || false);

    function updateAutoscrollSpeed(currentAutoscrollSpeed: number, updatedAutoscrollSpeed: number){
        localStorage.setItem("autoscrollspeed", updatedAutoscrollSpeed + "");
        return updatedAutoscrollSpeed;
    }
    const [autoscrollSpeed, setAutoscrollSpeed] = useReducer(updateAutoscrollSpeed, parseFloat(localStorage?.getItem("autoscrollspeed") || "1.0"));

    function updateFontSizeModifier(currentFontSizeModifier: number, updatedFontSizeModifier: number){
        localStorage.setItem("fontsizemodifier", updatedFontSizeModifier + "");
        return updatedFontSizeModifier;
    }
    const [fontSizeModifier, setFontSizeModifier] = useReducer(updateFontSizeModifier, parseInt(localStorage?.getItem("fontsizemodifier") || "0"));

    function updateAllowLead(currentAllowLead: boolean, updatedAllowLead: boolean){
        localStorage.setItem("allowLead", updatedAllowLead + "");
        return updatedAllowLead;
    }
    const [allowLead, setAllowLead] = useReducer(updateAllowLead, localStorage?.getItem("allowLead") === "true" || false);

    function updateFollowTransposition(currentFollowTransposition: boolean, updatedFollowTransposition: boolean){
        localStorage.setItem("followTransposition", updatedFollowTransposition + "");
        return updatedFollowTransposition;
    }
    const [followTransposition, setFollowTransposition] = useReducer(updateFollowTransposition, localStorage?.getItem("followTransposition") === "true" || false);

    function updateOwnUuid(currentOwnUuid: string, updatedOwnUuid: string){
        localStorage.setItem("uuid", updatedOwnUuid);
        return updatedOwnUuid;
    }
    const [ownUuid, setOwnUuid] = useReducer(updateOwnUuid, localStorage?.getItem("uuid") || uuid4());

    /* WebSocket */
    const webSocketContext = useChordsWebSocket();

  return <>
    <UserPreferencesContext.Provider value={{
        username: username,
        setUsername: setUsername,
        uuid: ownUuid,
        autoscrolling: autoscrolling,
        setAutoscrolling: setAutoscrolling,
        autoscrollSpeed: autoscrollSpeed,
        setAutoscrollSpeed: setAutoscrollSpeed,
        fontSizeModifier: fontSizeModifier,
        setFontSizeModifier: setFontSizeModifier,
        allowLead: allowLead,
        setAllowLead: setAllowLead,
        followTransposition: followTransposition,
        setFollowTransposition: setFollowTransposition,
    }}>
        <WebSocketContext.Provider value={webSocketContext}>
            {children}
        </WebSocketContext.Provider>
    </UserPreferencesContext.Provider>
  </>;
}