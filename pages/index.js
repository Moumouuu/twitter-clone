import Feed from "@/components/feed/feed";
import {prisma} from "@/lib/prisma";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import getIdOfUserConnected from "@/utils/getIdOfUserConnected";

export default function Home({tweets}) {

    const {data: session} = useSession();
    const [userConnectedId, setUserConnectedId] = useState(0);

    useEffect(() => {
        if (session) {
            getIdOfUserConnected(session, setUserConnectedId);
            console.log("id: " + userConnectedId);
        } else {
            console.log("no session");
        }
    }, [session, userConnectedId]);

    return (
        <div className={"text-[#E6E9EA] w-[100vw]"}>
            <Feed tweets={tweets} userConnectedId={userConnectedId}/>
        </div>
    )
}

export async function getStaticProps() {
    let tweets = await prisma.tweet.findMany({
        orderBy: [
            {
                id: 'desc',
            },
        ],
    });
    tweets = JSON.parse(JSON.stringify(tweets));
    return {
        props: {
            tweets,
        }
    }
}