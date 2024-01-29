"use client"; // This is a client component
import React from 'react';
import Link from 'next/link'
import { useContext, useEffect, useState, useCallback } from 'react';
import { UserPreferencesContext } from '../user_preferences_context';
import useChordsWebSocket, { WebSocketContext, NetworkMessage } from '../websocket_context';

export default function PeopleView(
    // {
    // handleFollow, 
    // people, 
    // ownUuid, 
    // setAllowLead, 
    // lead, 
    // setFollowTransposition}: {
    //     handleUpdateName: (newName: string) => void,
    //     handleFollow: (who: string) => void, 
    //     ownName: string, 
    //     people: PersonList, 
    //     ownUuid: string, 
    //     setAllowLead: React.Dispatch<React.SetStateAction<boolean>>, 
    //     lead: (uuid: string) => void, 
    //     setFollowTransposition: React.Dispatch<React.SetStateAction<boolean>>
    // }
    ) {
        const userPreferences = useContext(UserPreferencesContext);
        const webSocket = useContext(WebSocketContext);

        let i=0;
        const handleClickSendMessage = useCallback(() => webSocket.sendMessage('Hello' + i++), []);

    
        /* 
        * pro user:
        * name + uuid, aktueller "ort" (lied oder nichts), allowLead flag, ob und wem following
        * effekt:
        * - sofort navigieren zu dem was der leader gerade macht
        * - wenn leader navigiert (liste / lied) navigiert user mit
        * - wenn leader autoscroll anmacht wird es beim follower auch angemacht
        * - autoscroll speed wird gesynct
        * - problem: speed bleibt auch nach unfollowing
        * - problem bei autoscroll: unterschiedliche schriftgrößen sind unterschiedlich schnell
        * - problem bei autoscroll: unterschiedliche auflösungen können umbrüche verursachen und dadurch die vertikale platznutzung verzerren
        * - schriftgröße nicht gesynct
        * - transpose wird gesynct wenn das setting an ist (keine ahnung warums dafür ein setting gibt)
        */

        /* protokoll ideen:
        1. discovery message -> ich bin hier, ich bin der, bei initial connection
        2. wenn discovery empfangen -> jeder antwortet mit seinem current full state
        3. wenn navigation -> partial update
        4. wenn autoscroll -> partial update 

        */
        // const peopleView = Object.keys(people).map((uuid) => {
            // const person = people[uuid]
            // const followee = people[person.following];
            // return (
            //     <li className="person" key={uuid}>
            //         <button onClick={() => handleFollow(uuid)} disabled={!!person.following || uuid == ownUuid}>Follow</button>
            //         <button onClick={() => lead(uuid)} disabled={uuid == ownUuid || !person.allowLead}>Lead</button>
            //         <span>{person.name} {uuid == ownUuid ? <i>(You)</i> : null}</span>
            //         {person.following ? <i>Following {followee.name || "someone else"}...</i> : null}
            //         {person.currentSheet ? (
            //             <a className="chordlink" onClick={() => loadSheet(person.currentSheet)}>
            //                 {person.currentSheet.replace(".txt", "")}
            //             </a>
            //         ) : <i>Perusing the list...</i>}
            //     </li>
            // );
        // });
    return (
        <div className="focusable">
            <Link className="block" href="/">
                <button className="square">☰</button>
            </Link>
            <input id="allowLead"
                    checked={userPreferences.allowLead}
                    onChange={(e) => userPreferences.setAllowLead(e.target.checked)}
                    type="checkbox"/>
            <label htmlFor="allowLead">Allow others to take the lead</label>
            <br/>
            <input id="followTransposition"
                    checked={userPreferences.followTransposition}
                    onChange={(e) => userPreferences.setFollowTransposition(e.target.checked)}
                    type="checkbox" />
            <label htmlFor="followTransposition">Follow leader&apos;s transposition</label>
            <br/>
            <label htmlFor="name">Your name:</label>
            <input type="text"
                    id="name"
                    value={userPreferences.username}
                    onChange={(e) => userPreferences.setUsername(e.target.value)} />
            {/* <ul>
                {peopleView}
            </ul> */}
            <br />
            <button onClick={handleClickSendMessage}>
                Click Me to send &apos;Hello&apos;
            </button>
            <span>The WebSocket is currently {webSocket.readyState.toString()}</span>
            {webSocket.lastMessageText ? <span>Last message: {webSocket.lastMessageText}</span> : null}
            {/* <ul>
                {messageHistory.map((message, idx) => (
                    <li key={idx}>{message ? message : null}</li>
                ))}
            </ul> */}
        </div>);
}
