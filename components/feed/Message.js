import Image from "next/image";
import React, {useEffect, useState} from "react";
import {FaRegComment} from "react-icons/fa";
import {BiRepost} from "react-icons/bi";
import {FiShare} from "react-icons/fi";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import Moment from "react-moment";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import refreshPage from "@/utils/refreshPage";

const Message = ({tweet, userConnectedId}) => {
    const [user, setUser] = useState("");
    const [like, setLike] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const {data: session} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session && userConnectedId !== 0) {
            alreadyLiked();
        } else {
            getUser();
            getNumberOfLikes();
        }

    }, [session, userConnectedId]);
    const getUser = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/getUser/${tweet.authorId}`, {
                method: 'GET', headers: {
                    'Content-Type': 'application/json'
                },
            });
            const {user} = await res.json();
            setUser(user);
        } catch (e) {
            console.log(e);
        }
    }


    const alreadyLiked = async () => {
        try {
            fetch(`http://localhost:3000/api/alreadyLiked/${tweet.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId: userConnectedId}),
            }).then(res => res.json())
                .then(data => {
                    if (data.alreadyLiked.length > 0)
                        setLike(true);
                });
        } catch (e) {
            console.log(e);
        }
    }

    const getNumberOfLikes = async () => {
        try {
            fetch(`http://localhost:3000/api/getNumberOfLikes/${tweet.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .then(data => {
                    setNumberOfLikes(data.numberOfLikes.length);
                });
        } catch (e) {
            console.log(e);
        }
    }

    //use to update the number of likes
    const updateLike = () => {
        if (!like) {
            fetch(`http://localhost:3000/api/addLike/${tweet.id}`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({idPerson: userConnectedId, alreadyLiked: like})
            })
            setNumberOfLikes(numberOfLikes + 1);
        } else {

            fetch(`http://localhost:3000/api/addLike/${tweet.id}`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({idPerson: userConnectedId, alreadyLiked: like})
            })
            setNumberOfLikes(numberOfLikes - 1);
        }
    }

    //use to add a like to a tweet
    const addLike = async () => {
        if (session) {
            try {
                await updateLike();
            } catch (e) {
                console.log(e)
            } finally {
                refreshPage(router);
            }
            changeStateLike();
        }
    }


    const changeStateLike = () => {
        setLike(!like);
    }

    return (
        <div className={"flex border-b-2 border-gray-700 p-3"}>
            <div className={"mx-3"}>
                <Image src={user.picture} alt={"logo profile"} height={60} width={60}
                       className={"rounded-full"}></Image>
            </div>
            <div className={"flex flex-col"}>
                <div className="flex">
                    <span className={"font-semibold mr-2"}>{user.name}</span>
                    <span className={"text-gray-700"}>@{user.name}</span>
                    <span className={"text-gray-700 ml-2"}>
                        <Moment fromNow>{tweet.datePublished}</Moment>
                    </span>
                </div>
                <div className={"my-1"}>
                    <p>{tweet.content}</p>
                </div>
                <div className="flex ">
                    <div className={"flex items-center text-gray-500 mr-6 cursor-pointer"}>
                        <FaRegComment/>
                        <span className={"ml-2 text-gray-500"}>0</span>
                    </div>
                    <div className={"flex items-center text-gray-500 mx-6 cursor-pointer"}>
                        <BiRepost/>
                        <span className={"ml-2 text-gray-500"}>0</span>
                    </div>
                    {like ? (
                        <div onClick={addLike} className={'text-red-800 flex items-center mx-6 cursor-pointer'}>
                            <AiFillHeart/>
                            <span className={"ml-2 text-gray-500"}>{numberOfLikes}</span>
                        </div>
                    ) : (
                        <div onClick={addLike}
                             className={like ? 'text-red-800 flex items-center mx-6 cursor-pointer' : 'text-gray-500 flex items-center mx-6 cursor-pointer'}>
                            <AiOutlineHeart/>
                            <span className={"ml-2 text-gray-500"}>{numberOfLikes}</span>
                        </div>
                    )
                    }
                    <div className={"flex items-center text-gray-500 mx-6 cursor-pointer"}>
                        <FiShare/>
                        <span className={"ml-2 text-gray-500"}>0</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;