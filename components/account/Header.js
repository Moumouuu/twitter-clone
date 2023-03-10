import React, {useEffect, useState} from 'react';
import {AiOutlineArrowLeft} from "react-icons/ai";
import Link from "next/link";
import {useRouter} from "next/router";

const Header = ({user}) => {
    const [tweets, setTweets] = useState(0);
    const router = useRouter();
    useEffect(() => {
        getTweets();
    }, [tweets, router]);

    const getTweets = async () => {
        const res = await fetch(`/api/getTweetsOfUser/${user.id}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            }
        });
        const {tweets} = await res.json();
        console.log(tweets);
        setTweets(tweets)
    }


    return (
        <div className={"flex items-center p-3 bg-black"}>
            <Link href={'/'} className="p-3 cursor-pointer text-2xl">
                <AiOutlineArrowLeft/>
            </Link>
            <div className={"flex flex-col"}>
                <span className={"font-bold text-xl"}>{user?.name}</span>
                <span className={"text-gray-600"}>{tweets} Tweets</span>
            </div>
        </div>
    );
};

export default Header;
