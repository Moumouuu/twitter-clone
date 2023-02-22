import '../styles/global.css'
import Sidebar from "@/components/sidebar/Sidebar";
import {SessionProvider} from "next-auth/react"

export default function App({Component, pageProps: {session, ...pageProps}})
{
    return (
        <SessionProvider session={session}>
            <Sidebar/>
            <Component {...pageProps} />
        </SessionProvider>
    )
}
