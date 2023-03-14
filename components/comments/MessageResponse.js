import NextImage from "next/image";
import React, {useEffect, useState} from "react";
import Moment from "react-moment";
import {useSession} from "next-auth/react";
import Link from "next/link";

const MessageResponse = ({tweet, userConnectedId, originalTweet}) => {
    const [user, setUser] = useState("");
    const {data: session} = useSession();
    const [originalUser, setOriginalUser] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (session && userConnectedId !== 0) {
            getUser(tweet.authorId).then((user) => setUser(user));
            getUser(originalTweet.authorId).then((user) => setOriginalUser(user));
            getImageFromBlog();
        }
    }, [session, userConnectedId]);

    const getImageFromBlog = async () => {
        if (tweet?.image !== "") {
            let img = new Image();
            img.src = tweet.image;
            setImage(img)
        }
    }

    const getUser = async (id) => {
        try {
            const res = await fetch(`/api/getUser/${id}`, {
                method: 'GET', headers: {
                    'Content-Type': 'application/json'
                },
            });
            const {user} = await res.json();
            return user;
        } catch (e) {
            console.log(e);
        }
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
                <span className={"text-gray-600"}>En réponse à <span
                    className={"text-[#1DA1F2]"}>@{originalUser.name}</span></span>
                <div className={"my-1"}>
                    <p>{tweet?.content}</p>
                    <div className={"my-1"}>
                        {image && <img src={image?.src} className={"my-3"}></img>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageResponse;