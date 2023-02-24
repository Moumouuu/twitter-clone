import React, {useEffect, useState} from 'react';
import Header from "@/components/feed/Header";
import Message from "@/components/feed/Message";
import {useSession} from "next-auth/react";
import getIdOfUserConnected from "@/utils/getIdOfUserConnected";
import refreshPage from "@/utils/refreshPage";
import {useRouter} from "next/router";

const Index = () => {
    const {data: session} = useSession();
    const [tweets, setTweets] = useState([]);
    const [userConnectedId, setUserConnectedId] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (session) {
            getIdOfUserConnected(session, setUserConnectedId);
            getUserLikes()
        }
    }, [session, userConnectedId]);

    const getUserLikes = async () => {
        try {
            const response = await fetch('/api/tweetsLiked/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId: userConnectedId}),
            }).then(
                (response) => response.json().then(
                    (data) => {
                        //Permet de récupérer les tweets en fonction de l'id des tweets likés
                        data.tweetsLiked.forEach((tweet) => {
                            getTweetFromId(tweet.tweetId);
                        });
                    }
                ));
        } catch (e) {
            console.log(e)
        }
    }
    const getTweetFromId = async (id) => {
        try {
            const response = await fetch(`/api/getTweet/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(
                (response) => response.json().then(
                    (data) => {
                        tweets.push(data.tweet);
                        refreshPage(router)
                    }
                ));
        } catch (e) {
            console.log(e)
        }
    }

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