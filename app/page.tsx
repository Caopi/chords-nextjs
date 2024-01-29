import React from 'react';

import { ListingView as ListingViewClientSide } from './listing';
import { promises as fs } from 'fs';

interface State {
  uuid: string,
  name: string,
  currentSheet: string|null,
  focus: string,
  following: string|null,
  autoscrolling: boolean,
  autoscrollSpeed: number,
  allowLead: boolean,
  transposition: number,
}

export default async function Home() {
//   const [ownUuid, _] = useState(
//     // localStorage.getItem("uuid") || 
//     uuid4());
// localStorage.setItem("uuid", ownUuid);
//   const [focus, setFocus] = useState("listing");
//   const [people, setPeople] = useState<PersonList>({});

//   const [forceScrollPos, setForceScrollPos] = useState(0);

  // const { sendMessage, lastMessage, readyState } = useWebSocket(
  //     `ws${window.location.protocol == "https:" ? "s" : ""}://${window.location.host}/api/ws`,
  //     {
  //     shouldReconnect: () => true,
  //     heartbeat: {message: 'ping', returnMessage: 'pong', timeout: 15000, interval: 10000},
  // });
//   const [lastSentUpdate, setLastSentUpdate] = useState<State|null>();
//   const [following, setFollowing] = useState<string|null>(null);
//   const leader = following != null ? people[following] : null;

//   const currentSharedState: State = {
//       uuid: ownUuid,
//       name: ownName,
//       currentSheet,
//       focus,
//       following,
//       autoscrolling,
//       autoscrollSpeed,
//       allowLead,
//       transposition,
//   };
//   const remoteStateUpToDate = Object.keys(currentSharedState).every((keyString) => {
//       const key = keyString as keyof State;
//       if(!lastSentUpdate) return false;
//       if (currentSharedState[key] !== lastSentUpdate[key]) {
//           console.log(`${key}: ${lastSentUpdate[key]} -> ${currentSharedState[key]}`);
//           return false;
//       }
//       return true;
//   });
  // if (readyState !== ReadyState.OPEN && remoteStateUpToDate) {
  //     setLastSentUpdate(null);
  // }
  // if (readyState === ReadyState.OPEN && !remoteStateUpToDate) {
  //     sendMessage(JSON.stringify(currentSharedState));
  //     setLastSentUpdate(currentSharedState);
  // }

//   function updateFollow(leader: Person) {
//       if (leader) {
//           if (leader.focus)
//               setFocus(leader.focus)
//           if (leader.currentSheet)
//               loadSheet(leader.currentSheet);
//           if (leader.autoscrollSpeed)
//               setAutoscrollSpeed(leader.autoscrollSpeed)
//           if (leader.autoscrolling !== undefined) {
//               setAutoscrolling(leader.autoscrolling);
//           }
//           if (leader.transposition !== undefined) {
//               setTransposition(leader.transposition);
//           }
//       }
//   }

//   function handleFollow(who: string) {
//       setFollowing(who);
//       updateFollow(people[who]);
//   }

  // useEffect(() => {
  //     if (!lastMessage)
  //         return;
  //     lastMessage.data.text()
  //         .then(JSON.parse)
  //         .then((update: Person) => {
  //             if (!update.uuid || !uuid4.valid(update.uuid)) {
  //                 console.error("Received update without UUID");
  //                 return;
  //             }
  //             if (update.uuid == ownUuid && update.following && allowLead) {
  //                 console.log(update.following);
  //                 handleFollow(update.following);
  //             }
  //             const newPeople = {...people};
  //             // if(!newPeople[update.uuid]) {
  //             //     newPeople[update.uuid] = {};
  //             // }
  //             newPeople[update.uuid] = {...people[update.uuid], ...update};
  //             setPeople(newPeople);
  //             if (following == update.uuid) {
  //                 updateFollow(update);
  //                 if (update.scrollPos) {
  //                     setForceScrollPos(update.scrollPos);
  //                 }
  //             }
  //         });
  // }, [lastMessage]);

//   function lead(uuid: string) {
//       // sendMessage(JSON.stringify({uuid, following: ownUuid}));
//   }

//   function reportScrollPos(pos: number) {
//       // sendMessage(JSON.stringify({uuid: ownUuid, scrollPos: pos}));
//   }

    const titles = await fs.readdir(process.cwd() + '/chords');

    return (
        <ListingViewClientSide titles={titles} />
    );
}
