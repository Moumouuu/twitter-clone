import React from 'react';
import Link from "next/link";
import {useRouter} from "next/router";

const Navigation = ({user}) => {
    const router = useRouter().query.id[1];
    return (<div className={"flex w-full justify-evenly border-b border-gray-600"}>
        <Link href={`/user/${user.id}`}
              className={"relative text-center font-semibold w-1/2 p-3 bg-black hover:bg-gray-900"}>
            Tweets
            {router === undefined && <div
                className={'absolute bottom-0 left-[50%] translate-x-[-50%] bg-[#1DA1F2] h-1 w-[30%] rounded-full'}></div>}
        </Link>
        <Link href={`${user.id}/responses`}
              className={"relative text-center font-semibold w-1/2 p-3 bg-black hover:bg-gray-900"}>
            Réponses
            {router === "responses" && <div
                className={'absolute bottom-0 left-[50%] translate-x-[-50%] bg-[#1DA1F2] h-1 w-[30%] rounded-full'}></div>}
        </Link>
        <Link href={`${user.id}/likes`}
              className={"relative text-center font-semibold w-1/2 p-3 bg-black hover:bg-gray-900"}>
            J aime
            {router === "likes" && <div
                className={'absolute bottom-0 left-[50%] translate-x-[-50%] bg-[#1DA1F2] h-1 w-[30%] rounded-full'}></div>}
        </Link>
    </div>);
};

export default Navigation;