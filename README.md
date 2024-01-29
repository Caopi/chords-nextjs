# Chord sheet viewer for little jam groups

## Features

- Transposition
- Autoscrolling
- Clients share where they are with each other, and can "follow" each other (i.e. scrolling will be synced and if the leader opens a given chord sheet the follower will open it too)

## Running locally

0. Collect some chord sheets as plain text files with the extension `.txt`. The file names will be shown`in-app` and are recommended to be of the form `[Artist] - [Title]`. Place these in the directory `/chords`.
0. `npm install`
0. `npm run dev`

## Deploying

Some familiarity with systems administration is assumed.

0. Collect cord sheets, same as for running locally
0. `npm install` and `npm run build`
0. `npm run start`. If port 3000 isn't available, edit `server.js`.
0. Have a look at `deploy.sh` and take some inspiration on it
0. Set up a reverse proxy which provides TLS, serves static files (from `build/` as produced by `npm run build`) on its root, and proxies `/api` to the `server.js` script.
0. Jam!

## Scalability

Short answer: No.

Longer answer: This is intended to be used by small groups (<10 people), and it is assumed that if multiple groups want to use this they will each deploy their own instance.

## Security

Clients trust each other blindly.
Remote code execution shouldn't be possible, but DoS attacks and impersonating other users are trivial.
I intend to add authentication at some point, so that only authenticated clients can send and receive messages, but haven't started on that yet.
