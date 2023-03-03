import React, {useEffect, useState} from 'react';
import Tweets from "@/components/account/Tweets";
import getIdOfUserConnected from "@/utils/getIdOfUserConnected";
import getUserLikes from "@/utils/getUserLikes";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

const Likes = ({userConnectedId, setUserConnectedId}) => {
    const {data: session} = useSession();
    const router = useRouter();
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        setTweets([])
        //bug double appel
        if (session) {
            getIdOfUserConnected(session, setUserConnectedId);
            getUserLikes(router, tweets, setTweets, parseInt(router.query.id[0]))
        }
        console.log(tweets)
    }, [session, userConnectedId]);

    return (
        <div>
            <Tweets tweets={tweets} userConnectedId={userConnectedId}/>
        </div>
    );
};

export default Likes;
