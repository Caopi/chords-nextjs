import { SetStateAction, createContext } from 'react';

export interface UserPreferences {
    username: string,
    setUsername: React.Dispatch<string>,
    autoscrolling: boolean,
    setAutoscrolling: React.Dispatch<boolean>,
    autoscrollSpeed: number,
    setAutoscrollSpeed: React.Dispatch<number>,
    fontSizeModifier: number,
    setFontSizeModifier: React.Dispatch<number>,
    allowLead: boolean,
    setAllowLead: React.Dispatch<boolean>,
    followTransposition: boolean,
    setFollowTransposition: React.Dispatch<boolean>,
}

export const PresetNames = [
    "Gandalf",
    "Frodo",
    "Bilbo",
    "Samwise",
    "Sauron",
    "Gollum",
    "Pippin",
    "Merry",
    "Aragorn",
    "Legolas",
    "Saruman",
    "Tom Bombadil",
    "Shadowfax",
    "Galadriel",
    "Gimli",
    "Arwen",
    "Elrond",
    "Boromir",
];

// default values here are only needed for initial server-side rendering
export const UserPreferencesContext = createContext<UserPreferences>({
    username: PresetNames[Math.floor(Math.random() * PresetNames.length)],
    autoscrolling: false,
    autoscrollSpeed: 1.0,
    fontSizeModifier: 0,
    allowLead: false,
    followTransposition: false,
    setUsername: () => {},
    setAutoscrolling: () => {},
    setAutoscrollSpeed: () => {},
    setFontSizeModifier: () => {},
    setAllowLead: () => {},
    setFollowTransposition: () => {}
});
