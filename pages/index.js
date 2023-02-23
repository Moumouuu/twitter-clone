import Feed from "@/components/feed/feed";
import {prisma} from "@/lib/prisma";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";

export default function Home({tweets}) {

    const {data: session} = useSession();
    const [userConnectedId, setUserConnectedId] = useState(0);

    useEffect(() => {
        if (session) {
            getIdOfUserConnected();
            console.log("id: " + userConnectedId);
        } else {
            console.log("no session");
        }
    }, [session, userConnectedId]);
    const getIdOfUserConnected = async () => {
        console.log(session?.user.email);
        try {
            const res = await fetch(`http://localhost:3000/api/getIdOfUserConnected/`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: session?.user.email}),
            });
            const {user} = await res.json();
            setUserConnectedId(user.id);
        } catch (e) {
            console.log(e);
        }
    }

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