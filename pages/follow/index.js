import React, {useEffect, useState} from 'react';
import Header from "@/components/feed/Header";
import Message from "@/components/feed/Message";
import {useSession} from "next-auth/react";
import getIdOfUserConnected from "@/utils/getIdOfUserConnected";
import getUserLikes from "@/utils/getUserLikes";
import {useRouter} from "next/router";

const Index = () => {
    const {data: session} = useSession();
    const [tweets, setTweets] = useState([]);
    const [userConnectedId, setUserConnectedId] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (session) {
            getIdOfUserConnected(session, setUserConnectedId);
            getUserLikes(router, tweets, userConnectedId)
        }
    }, [session, userConnectedId]);


    return (
        <div className={"w-full border-r-2 border-gray-800 h-screen"}>
            <Header/>
            <div className={"overflow-y-scroll overflow-hidden h-[80vh]"}>
                {tweets?.map((tweet) => (
                    <Message key={tweet.id} tweet={tweet} userConnectedId={userConnectedId}/>
                ))}
            </div>
        </div>
    );
};

export default Index;