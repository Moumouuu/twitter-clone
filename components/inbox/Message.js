import React from 'react';
import Image from "next/image";

const Message = ({user}) => {
    console.log(user)
    return (
        <div className={"px-2 flex items-center bg-transparent hover:bg-gray-900 duration-300"}>
            <div>
                <Image src={user?.picture} alt={"user picture"} className={"min-w-[60px] min-h-[60px] rounded-full"}
                       width={60} height={60}></Image>
            </div>
            <div className={"flex flex-col px-2 py-4 "}>
                <div className={"flex"}>
                    <span className={"font-semibold mr-2"}>{user.name}</span>
                    <span className={"text-gray-600"}>@{user.name}</span>
                </div>
                <p className={"text-gray-600"}>Text me plzzz !</p>
            </div>
        </div>
    );
};

export default Message;