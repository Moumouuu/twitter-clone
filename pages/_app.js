import '../styles/global.css'
import Sidebar from "@/components/sidebar/Sidebar";
import {SessionProvider} from "next-auth/react"
import Trends from "@/components/trends/trends";

export default function App({Component, pageProps: {session, ...pageProps}}) {
    return (
        <SessionProvider session={session}>
            <div className={"flex"}>
                <Sidebar/>
                <Component {...pageProps} />
                <Trends/>
            </div>
        </SessionProvider>
    )
}
