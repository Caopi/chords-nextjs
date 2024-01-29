import React from 'react';
import PeopleViewClientSide from './people';

// // TODO: same as state?
// export interface Person {
//     focus: string,
//     currentSheet: string,
//     autoscrollSpeed: number,
//     autoscrolling: boolean,
//     transposition: number,
//     name: string,
//     uuid: string,
//     following: string,
//     scrollPos: number,
//     allowLead: boolean,
// }

// export type PersonList = {
//     [key: string]: Person
// }

export default function PeopleViewServerSide(
    // {
    // handleUpdateName,
    // handleFollow, 
    // ownName, 
    // people, 
    // loadSheet, 
    // switchToListing, 
    // ownUuid, 
    // setAllowLead, 
    // lead, 
    // setFollowTransposition}: {
    //     handleUpdateName: (newName: string) => void,
    //     handleFollow: (who: string) => void, 
    //     ownName: string, 
    //     people: PersonList, 
    //     loadSheet: (title: string) => void, 
    //     switchToListing: () => void, 
    //     ownUuid: string, 
    //     setAllowLead: React.Dispatch<React.SetStateAction<boolean>>, 
    //     lead: (uuid: string) => void, 
    //     setFollowTransposition: React.Dispatch<React.SetStateAction<boolean>>
    // }
    ) {
    // const peopleView = Object.keys(people).map((uuid) => {
    //     const person = people[uuid]
    //     const followee = people[person.following];
    //     return (
    //         <li className="person" key={uuid}>
    //             <button onClick={() => handleFollow(uuid)} disabled={!!person.following || uuid == ownUuid}>Follow</button>
    //             <button onClick={() => lead(uuid)} disabled={uuid == ownUuid || !person.allowLead}>Lead</button>
    //             <span>{person.name} {uuid == ownUuid ? <i>(You)</i> : null}</span>
    //             {person.following ? <i>Following {followee.name || "someone else"}...</i> : null}
    //             {person.currentSheet ? (
    //                 <a className="chordlink" onClick={() => loadSheet(person.currentSheet)}>
    //                     {person.currentSheet.replace(".txt", "")}
    //                 </a>
    //             ) : <i>Perusing the list...</i>}
    //         </li>
    //     );
    // });
    return <PeopleViewClientSide />
}
