import React from 'react';
import Image from "next/image";
import {AiOutlineCalendar} from "react-icons/ai";
import Navigation from "@/components/account/Navigation";

const Banner = ({user}) => {
    return (
        <div className={"flex flex-col"}>
            <div className={"w-full h-[15vh] bg-gray-600"}></div>
            <div className={"relative flex flex-col mx-6 my-3"}>
                <div className={"text-end w-full"}>
                    <button
                        className={"font-semibold border border-gray-600 hover:border-[#1DA1F2] duration-300 ease rounded-full px-4 py-2"}>Éditer
                        le profil
                    </button>
                </div>
                <div className={"absolute -bottom-3"}>
                    <Image
                        src={user ? user.picture : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"}
                        alt={"logo picture"} width={120} height={120} className={"rounded-full"}/>
                </div>
            </div>
            <div className={"flex flex-col mx-6 mt-1 mb-10"}>
                <div className={"flex flex-col"}>
                    <span className={"font-bold text-xl"}>{user.name}</span>
                    <span className={"text-gray-600"}>@{user.name}</span>
                </div>
                <div className={"flex text-gray-600 items-center my-4"}>
                    <div className={"pr-2 text-xl"}>
                        <AiOutlineCalendar/>
                    </div>
                    <span>À rejoint TwiTwit en Novembre 2023</span>
                </div>
                <div className={"flex"}>
                    <span className={"font-semibold mr-2"}>101</span>
                    <span className={"text-gray-600 mr-6"}>abonnements</span>
                    <span className={"font-semibold mr-2"}>32</span>
                    <span className={"text-gray-600 mr-6"}>abonnés</span>
                </div>
            </div>
            <Navigation user={user}/>
        </div>
    );
};

export default Banner;