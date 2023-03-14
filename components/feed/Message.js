import React, {useEffect, useState} from "react";
import {FaRegComment} from "react-icons/fa";
import {BiRepost} from "react-icons/bi";
import {FiShare} from "react-icons/fi";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import Moment from "react-moment";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import refreshPage from "@/utils/refreshPage";
import Link from "next/link";
import NextImage from "next/image";

const Message = ({tweet, userConnectedId}) => {
    const [user, setUser] = useState("");
    const [like, setLike] = useState(false);
    const [numberOfLikes, setNumberOfLikes] = useState(0);
    const [numberOfComments, setNumberOfComments] = useState(0);
    const [image, setImage] = useState(null);
    const {data: session} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session && userConnectedId !== 0) {
            alreadyLiked();
            getUser();
            getNumberOfLikes();
            getNumberOfComments().then((numberOfComments) => setNumberOfComments(numberOfComments));
            getImageFromBlog();
        }

    }, [session, userConnectedId]);

    const getNumberOfComments = async () => {
        const res = await fetch(`/api/getNumberOfComments/${tweet?.id}`, {
            method: 'GET', headers: {
                'Content-Type': 'application/json'
            },
        });
        const {numberOfComments} = await res.json();
        return numberOfComments;
    }

    const getUser = async () => {
        try {
            const res = await fetch(`/api/getUser/${tweet.authorId}`, {
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
            fetch(`/api/alreadyLiked/${tweet.id}`, {
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
            fetch(`/api/getNumberOfLikes/${tweet.id}`, {
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
            fetch(`/api/addLike/${tweet.id}`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({idPerson: userConnectedId, alreadyLiked: like})
            })
            setNumberOfLikes(numberOfLikes + 1);
        } else {

            fetch(`/api/addLike/${tweet.id}`, {
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

    const getImageFromBlog = async () => {
        if (tweet?.image !== "") {
            let img = new Image();
            img.src = tweet?.image;
            setImage(img)
        }
    }


    const changeStateLike = () => {
        setLike(!like);
    }

    return (
        <div className={"flex border-b-2 border-gray-700 p-3"}>
            <div className={"mx-3"}>
                <NextImage
                    src={user ? user.picture : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"}
                    alt={"logo profile"} height={60} width={60}
                    className={"rounded-full hidden md:block min-h-[60px] min-w-[60px]"}></NextImage>
            </div>
            <div className={"flex flex-col"}>
                <div className="flex">
                    <Link href={`/user/${tweet?.authorId}`} className={"hover:underline"}><span
                        className={"font-semibold mr-2"}>{user.name}</span> </Link>
                    <span className={"text-gray-700"}>@{user.name}</span>
                    <span className={"text-gray-700 ml-2"}>
                        <Moment fromNow>{tweet?.datePublished}</Moment>
                    </span>
                </div>
                <div className={"my-1"}>
                    <p>{tweet?.content}</p>
                    {image && <img src={image?.src} className={"my-3"}></img>}
                </div>
                <div className="flex ">
                    <Link href={`/comments/${tweet?.id}`}
                          className={"flex items-center text-gray-500 mr-6 cursor-pointer bg-black hover:bg-blue-300 hover:opacity-50 rounded-full px-2 py-1 duration-300"}>
                        <FaRegComment/>
                        <span className={"ml-2 text-gray-500"}>{numberOfComments}</span>
                    </Link>
                    <div
                        className={"flex items-center text-gray-500 mx-6 cursor-pointer bg-black hover:bg-green-300 hover:opacity-50 rounded-full px-2 py-1 duration-300"}>
                        <BiRepost/>
                        <span className={"ml-2 text-gray-500"}>0</span>
                    </div>
                    {like ? (
                        <div onClick={addLike}
                             className={'text-red-600 flex items-center mx-6 cursor-pointer bg-black hover:bg-red-300 hover:opacity-50 rounded-full px-2 py-1 duration-300'}>
                            <AiFillHeart/>
                            <span className={"ml-2 text-gray-500"}>{numberOfLikes}</span>
                        </div>
                    ) : (
                        <div onClick={addLike}
                             className={like ? 'text-red-600 flex items-center mx-6 cursor-pointer' : 'text-gray-500 flex items-center mx-6 cursor-pointer bg-black hover:bg-red-300 hover:opacity-50 rounded-full px-2 py-1 duration-300'}>
                            <AiOutlineHeart/>
                            <span className={"ml-2 text-gray-500"}>{numberOfLikes}</span>
                        </div>
                    )
                    }
                    <div
                        className={"flex items-center text-gray-500 mx-6 cursor-pointer bg-black hover:bg-yellow-300 hover:opacity-50 rounded-full px-2 py-1 duration-300"}>
                        <FiShare/>
                        <span className={"ml-2 text-gray-500"}>0</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;