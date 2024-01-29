"use client"; // This is a client component

import React, { useEffect } from 'react';
import Link from 'next/link'

import { useState } from 'react';

import Fuse from "fuse.js";

export function ListingView({ titles }: { titles: string[] }) {
    const fuse = new Fuse(titles);
    const [filteredTitles, setFilteredTitles] = useState(titles);
     
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch("/list.json");
    //         const json = await response.json();
    //         if (Array.isArray(json)) {
    //             setTitles(json);
    //             setFuse(new Fuse(json));
    //             setFilteredTitles(json);
    //         }
    //     }

    //     fetchData();
    // }, []);

    function searchTextChanged(event: React.ChangeEvent<HTMLInputElement>){
        const searchText = event.target.value;
        const searchResults = fuse?.search(searchText).map((result) => result.item);
        setFilteredTitles(searchResults ?? titles);
    }

    return (
        <div className="listing focusable">
            <h1>Linus&apos;s Chords Collection</h1>
            <p>Please do not share publicly.</p>
            <label htmlFor="search">Search</label>
            <input type="text" value="" onChange={searchTextChanged} id="search"/>
            {titles.length > 0 ? (
                <ul>
                    {filteredTitles.map((title) =>
                        <li className="chordlink" key={title}>
                            <Link href={`/sheets/${title}`}>
                                {title.replace(".txt", "")}
                            </Link>
                        </li>
                    )}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}