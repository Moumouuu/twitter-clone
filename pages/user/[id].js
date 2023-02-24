import React, {useEffect, useState} from 'react';
import Header from "@/components/account/Header";
import prisma from "@/lib/prisma";
import Banner from "@/components/account/Banner";
import Tweets from "@/components/account/Tweets";
import {useSession} from "next-auth/react";
import getIdOfUserConnected from "@/utils/getIdOfUserConnected";

const User = ({user, tweets}) => {
    const [idUserConnected, setIdUserConnected] = useState(0);
    const {data: session} = useSession();

    useEffect(() => {
        getIdOfUserConnected(session, setIdUserConnected);
        console.log(idUserConnected);
    }, [session]);

    return (
        <div className={"w-full border-r-2 border-gray-800 h-screen overflow-x-scroll"}>
            <Header user={user}/>
            <Banner user={user}/>
            <Tweets tweets={tweets} userConnectedId={idUserConnected}/>
        </div>
    );
};

export default User;

export async function getServerSideProps(context) {
    const {id} = context.params;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    });
    let tweets = await prisma.tweet.findMany({
        where: {
            authorId: Number(id)
        },
        orderBy: {
            datePublished: "desc"
        }
    });
    tweets = JSON.parse(JSON.stringify(tweets));
    return {
        props: {
            user: user,
            tweets: tweets
        }
    };
}