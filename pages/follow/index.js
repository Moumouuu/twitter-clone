import React, {useEffect, useState} from 'react';
import Header from "@/components/feed/Header";
import Message from "@/components/feed/Message";
import {useSession} from "next-auth/react";
import getIdOfUserConnected from "@/utils/getIdOfUserConnected";

const Index = () => {
    const {data: session} = useSession();
    const [tweets, setTweets] = useState([]);
    const [userConnectedId, setUserConnectedId] = useState(0);

    useEffect(() => {
        setTweets([])
        if (session) {
            getIdOfUserConnected(session, setUserConnectedId);
            getTweetsFollowers();
        }
    }, [session, userConnectedId]);

    const getTweetsFollowers = async () => {
        getIdFollowers().then((followers) => {
            followers.forEach((follower) => {
                getTweetsFromId(follower.followedId).then((tweets) => {
                    tweets.forEach((tweet) => {
                        setTweets((tweets) => [...tweets, tweet]);
                    });
                });
            });
        });
    }

    const getTweetsFromId = async (id) => {
        try {
            const res = await fetch(`api/follow/tweets/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json();
            return data.tweets;
        } catch (e) {
            console.log(e)
        }
    }

    const getIdFollowers = async () => {
        try {
            const res = await fetch(`api/follow/getIdFollowers/${userConnectedId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json();
            return data.followers;
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