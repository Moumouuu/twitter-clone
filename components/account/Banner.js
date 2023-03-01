import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {AiOutlineCalendar} from "react-icons/ai";
import Navigation from "@/components/account/Navigation";
import {useSession} from "next-auth/react";

const Banner = ({user}) => {
    const [follow, setFollow] = useState(false);
    const {data: session} = useSession();

    useEffect(() => {
        if (session) {
            alreadyFollow();
        }
    }, [session])

    const alreadyFollow = async () => {
        const follower = await getUserId();
        try {
            const res = await fetch("/api/follow/alreadyFollow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({idFollower: follower.id, idFollowed: user.id}),
            })
            const follow = await res.json();
            setFollow(follow.alreadyFollow[0].id ? true : false);
        } catch (e) {
            console.log(e);
        }
    }

    const addFollow = async (follower) => {
        if (follower !== null) {
            try {
                await fetch("/api/follow/addFollow", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({idFollower: follower.id, idFollowed: user.id}),
                })
            } catch (e) {
                console.log(e);
            }
        }
    }

    const removeFollow = async (follower) => {

    }

    const getUserId = async () => {
        try {
            const res = await fetch(`/api/getIdOfUserConnected/`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: session?.user.email}),
            });
            const {user} = await res.json();
            return user;
        } catch (e) {
            console.log(e);
        }
    }

    const handleFollower = async () => {
        const follower = await getUserId();
        switch (follow) {
            case true:
                await removeFollow(follower);
                setFollow(!follow);
                break;
            case false:
                await addFollow(follower);
                setFollow(!follow);
                break;
        }
    }

    return (
        <div className={"flex flex-col"}>
            <div className={"w-full h-[15vh] bg-gray-600"}></div>
            <div className={"relative flex flex-col mx-6 my-3"}>
                <div className={"text-end w-full"}>
                    {session && session.user.email !== user.email ? (
                        follow ? (
                                <button onClick={handleFollower}
                                        className={"mx-1 font-semibold border border-gray-600 bg-[#1DA1F2] hover:bg-black duration-300 ease rounded-full px-4 py-2"}>Ne
                                    plus suivre
                                </button>
                            ) :
                            (
                                <button onClick={handleFollower}
                                        className={"mx-1 font-semibold border border-gray-600 bg-[#1DA1F2] hover:bg-black duration-300 ease rounded-full px-4 py-2"}>Suivre
                                </button>
                            )
                    ) : null
                    }
                    {session && session.user.name === user.name && (
                        <button
                            className={"mx-1 font-semibold border border-gray-600 hover:border-[#1DA1F2] duration-300 ease rounded-full px-4 py-2"}>Éditer
                            le profil
                        </button>
                    )

                    }


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
                    <span>À rejoint TwiTwit le {user.dateCreatingAccount}</span>
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