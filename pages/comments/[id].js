import React, {useEffect, useState} from 'react';
import Header from "@/components/comments/Header";
import Message from "@/components/feed/Message";
import {useSession} from "next-auth/react";
import getIdOfUserConnected from "@/utils/getIdOfUserConnected";
import InputMessageResponse from "@/components/comments/InputMessageResponse";
import MessageResponse from "@/components/comments/MessageResponse";


const Comments = ({tweet, tweets}) => {
    const {data: session} = useSession();
    const [userConnectedId, setUserConnectedId] = useState(0);

    useEffect(() => {
        if (session) {
            getIdOfUserConnected(session, setUserConnectedId);
        }
    }, [session, userConnectedId]);

    return (
        <div className={"w-full border-r-2 border-gray-800 h-screen"}>
            <Header/>
            <Message tweet={tweet} userConnectedId={userConnectedId}/>
            <InputMessageResponse tweet={tweet}/>
            {tweets?.map((tweet) => (
                <MessageResponse key={tweet.id} tweet={tweet} userConnectedId={userConnectedId}/>
            ))}
        </div>
    );
};

export default Comments;

export async function getStaticPaths() {
    return {
        paths: [{params: {id: '1'}}],
        fallback: true, // can also be true or 'blocking'
    }
}

export async function getStaticProps(context) {
    const {params} = context;

    let tweet = await prisma.tweet.findUnique({
        where: {
            id: Number(params.id),
        },
    });
    tweet = JSON.parse(JSON.stringify(tweet));

    //find all comments of the tweet
    let tweets = await prisma.response.findMany({
        where: {
            tweetId: Number(params.id),
        },
        orderBy: {
            datePublished: 'desc',
        }
    });
    tweets = JSON.parse(JSON.stringify(tweets));
    return {
        props: {
            tweet,
            tweets
        }, // will be passed to the page component as props
    }
}