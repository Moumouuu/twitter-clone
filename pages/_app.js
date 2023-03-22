import '../styles/global.css'
import Sidebar from "@/components/sidebar/Sidebar";
import {SessionProvider} from "next-auth/react"
import Trends from "@/components/trends/trends";
import {useRouter} from "next/router";

export default function App({Component, pageProps: {session, ...pageProps}}) {
    const paramsQuery = useRouter();
    console.log("params " + paramsQuery.pathname)
    return (
        <SessionProvider session={session}>
            <div className={"flex w-full"}>
                <Sidebar/>
                <Component {...pageProps} />
                {paramsQuery.pathname !== '/inbox' && paramsQuery.pathname !== '/inbox/[...id]' &&
                    <Trends/>
                }
            </div>
        </SessionProvider>
    )
}
