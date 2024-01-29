"use client"; // This is a client component
import React from 'react';
import Link from 'next/link'
import { useContext } from 'react';
import { UserPreferencesContext } from '../../user_preferences_context';

import { useState, useEffect, useRef } from 'react';

import * as Chord from "@tonaljs/chord";
import * as Note from "@tonaljs/note";
import * as Interval from "@tonaljs/interval";
import { transpose as transposeNote } from "@tonaljs/pitch-distance";

function Chunk({original, transpositionInterval}: {original: string, transpositionInterval: string}) {
    const split = original.split("/");
    const parsed = Chord.get(split[0]);
    if (split.length <= 2 && original.match(/^[A-G]/) && parsed.tonic && parsed.quality) {
        let originalRoot: string|undefined = undefined;
        if (split[1]) {
            originalRoot = Note.get(split[1]).name;
        }
        const root = originalRoot ? transposeNote(originalRoot, transpositionInterval) : undefined;
        const type = parsed.type == "major" ? "" : parsed.type;
        const tonic = transposeNote(parsed.tonic, transpositionInterval);
        const chord = Chord.getChord(type, tonic);
        return <span className="chord">{chord.symbol + (root ? ("/" + root) : "")}</span>
    } else {
        return original;
    }
}

export default function SheetView({ sheetName, chunks }: { sheetName: string, chunks: string[] }) {
    const userPreferences = useContext(UserPreferencesContext);

    // react to upstream changes in userpreferences
    useEffect(() => {
        setFontSize(getFontSizeFor(userPreferences.fontSizeModifier));
        if (userPreferences.autoscrolling) {
            const timer: NodeJS.Timeout = setInterval(() => scrollDown(timer), 5000/(60*userPreferences.autoscrollSpeed));
            return () => {
                clearInterval(timer);
            };
        }
    }, [userPreferences]);

    /* Transposition */
    const [transposition, setTransposition] = useState(0);
    const transpositionInterval = Interval.fromSemitones(transposition);

    function adjustTransposition(i: number) {
        setTransposition(((transposition + 18 + i) % 12) - 6);
    }

    /* Font Sizing */
    const [fontSize, setFontSize] = useState("10pt");

    function getFontSizeFor(i: number) {
        return `${10 * Math.pow(1.05, i)}pt`;
    }

    function adjustSize(i: number) {
        userPreferences.setFontSizeModifier(userPreferences.fontSizeModifier + i);
    }

    /* Auto scrolling */
    const chordsheetRef = useRef<HTMLDivElement>(null);
    function adjustAutoscrollSpeed(i: number) {
        userPreferences.setAutoscrollSpeed(userPreferences.autoscrollSpeed * Math.pow(1.1, i));
    }
    function toggleAutoscroll() {
        userPreferences.setAutoscrolling(!userPreferences.autoscrolling);
    }

    function scrollDown(timer: NodeJS.Timeout) {
        if(chordsheetRef.current) chordsheetRef.current.scrollTop += 1;
    }

    /*
const [lastScrollPos, setLastScrollPos] = useState(0);

useEffect(() => {
    if (forceScrollPos !== null && chordsheetRef.current !== null) {
        chordsheetRef.current.scrollTop = (chordsheetRef.current.scrollHeight - chordsheetRef.current.clientHeight) * forceScrollPos;
        setForceScrollPos(0);
    }
}, [forceScrollPos]);


function reportScroll() {
    if(chordsheetRef.current) {
        reportScrollPos(chordsheetRef.current.scrollTop / (chordsheetRef.current.scrollHeight - chordsheetRef.current.clientHeight));
    }
}

function onScroll(e: React.UIEvent<HTMLElement>) {
    setLastScrollPos(e.currentTarget.scrollTop);
    if (Math.abs(lastScrollPos - e.currentTarget.scrollTop) > 1 || e.currentTarget.scrollTop == 0) {
        reportScroll();
    }
}
*/

return <div className="chords-box focusable">
    <div className="controls">
        <div className="controlgroup">
            <Link href="/">
                <button className="square">☰</button>
            </Link>
        </div>
        <div className="controlgroup">
            <button className="square transpose transpose-down" onClick={() => adjustTransposition(-1)}>🔽</button>
            <button className="square transposition">{transposition}</button>
            <button className="square transpose transpose-up" onClick={() => adjustTransposition(1)}>🔼</button>
        </div>
        <div className="controlgroup">
            <button className="square fontsize-down" onClick={() => adjustSize(-1)}>ᴀ</button>
            <button className="square fontsize-up" onClick={() => adjustSize(1)}>A</button>
        </div>
        <div className="controlgroup">
            <button className="square autoscroll-slower" onClick={() => adjustAutoscrollSpeed(-1)}>🐢</button>
            <button className="square autoscroll" onClick={toggleAutoscroll}>{userPreferences.autoscrolling ? "⏸" : "⏵"}</button>
            <button className="square autoscroll-faster" onClick={() => adjustAutoscrollSpeed(1)}>🐇</button>
        </div>
    </div>
    <div 
        ref={chordsheetRef}
        className="chordsheet"
        style={{fontSize}} 
        // onScroll={onScroll}
    >
        <h3>{sheetName}</h3>
        {chunks.length > 0 ? (
            chunks.map((chunk, idx) =>
                <Chunk key={idx} original={chunk} transpositionInterval={transpositionInterval}></Chunk>
            )
        ) : (
            <p>Loading...</p>
        )}
    </div>
</div>;
}
