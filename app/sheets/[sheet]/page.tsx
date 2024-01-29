import React from 'react';
import SheetViewClientSide from "./sheet";
import { promises as fs } from 'fs';

const chunkRegex = /[ \n]+|[^ \n]+/g;

export default async function SheetViewServerSide({ params }: { params: { sheet: string }}) {
    const sheetName = decodeURIComponent(params.sheet);
    const sheetText = await fs.readFile(process.cwd() + `/chords/${sheetName}`, 'utf8');
    const matches = sheetText.matchAll(chunkRegex);
    const chunks = [...matches].map((match) => match[0]);

    return <SheetViewClientSide sheetName={sheetName} chunks={chunks} />
}