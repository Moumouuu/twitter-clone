import '../styles/global.css'
import Sidebar from "@/components/sidebar/Sidebar";
import {SessionProvider} from "next-auth/react"
import Trends from "@/components/trends/trends";
import {useRouter} from "next/router";
import BoxMessages from "@/components/inbox/BoxMessages";

export default function App({Component, pageProps: {session, ...pageProps}}) {
    const paramsQuery = useRouter();
    console.log("params " + paramsQuery.pathname)
    return (
        <SessionProvider session={session}>
            <div className={"flex"}>
                <Sidebar/>
                <Component {...pageProps} />
                {paramsQuery.pathname !== '/inbox' ?
                    <Trends/>
                    :
                    <BoxMessages/>
                }
            </div>
        </SessionProvider>
    )
}
