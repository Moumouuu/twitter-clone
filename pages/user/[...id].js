import React, {useEffect, useState} from 'react';
import Header from "@/components/account/Header";
import prisma from "@/lib/prisma";
import Banner from "@/components/account/Banner";
import Tweets from "@/components/account/Tweets";
import {useSession} from "next-auth/react";
import getIdOfUserConnected from "@/utils/getIdOfUserConnected";
import {useRouter} from "next/router";
import Likes from "@/components/account/Likes";

const User = ({user, tweets}) => {
    const [idUserConnected, setUserConnectedId] = useState(0);
    const {data: session} = useSession();
    const paramsQuery = useRouter().query.id[1];

    useEffect(() => {
        getIdOfUserConnected(session, setUserConnectedId);
        console.log(paramsQuery)
    }, [session]);

    return (
        <div className={"w-full border-r-2 border-gray-800 h-screen overflow-x-scroll"}>
            <Header user={user}/>
            <Banner user={user}/>
            {paramsQuery === undefined &&
                <Tweets tweets={tweets} userConnectedId={idUserConnected}/>
            }
            {paramsQuery === "responses" &&
                <span>Yollo</span>
            }
            {paramsQuery === "likes" &&
                <Likes userConnectedId={idUserConnected} setUserConnectedId={setUserConnectedId}/>
            }
        </div>
    );
};

export default User;

export async function getServerSideProps(context) {
    const {id} = context.params;
    let user = await prisma.user.findUnique({
        where: {
            id: Number(id[0])
        }
    });
    let tweets = await prisma.tweet.findMany({
        where: {
            authorId: Number(id[0])
        },
    });
    tweets = JSON.parse(JSON.stringify(tweets));
    user = JSON.parse(JSON.stringify(user));
    return {
        props: {
            user: user,
            tweets: tweets
        }
    };
}