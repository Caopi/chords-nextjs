import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalStateProvider from "./global_state_provider";
import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linus's Chords Collection",
  description: "Please do not share publicly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalStateProvider>
            <div className="float top-right" >
                {/* {readyState === useWebSocket.ReadyState.OPEN ? "" : <>Disconnected 🔌<br/></>}
                { following ?
                 <>👯 Following {leader?.name ?? ""} <button onClick={() => setFollowing(null)}>🛑</button></>
                 :  */}
                <Link href="/people">
                    <button className="square">😃</button>
                </Link>

                 {/* <button onClick={() => setFocus("people")}>😃</button> */}
                 {/* } */}
            </div>

          {children}
        </GlobalStateProvider>
      </body>
    </html>
  );
}
