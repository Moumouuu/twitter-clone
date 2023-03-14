import React from 'react';
import {AiOutlineSetting} from "react-icons/ai";
import {BiMessageAdd} from "react-icons/bi";
import Link from "next/link";
import InputInbox from "@/components/inbox/InputInbox";
import Message from "@/components/inbox/Message";

const Inbox = ({users}) => {
    return (
        <div>
            <div className={"m-3 mb-7 flex items-center justify-between"}>
                <span className={"font-bold text-xl"}>Messages</span>
                <div className={"flex"}>
                    <Link href={"/"} className={"p-2 rounded-full bg-transparent hover:bg-gray-700 duration-300"}>
                        <AiOutlineSetting className={"text-xl"}/>
                    </Link>
                    <Link href={"/"} className={"p-2 rounded-full bg-transparent hover:bg-gray-700 duration-300"}>
                        <BiMessageAdd className={"text-xl"}/>
                    </Link>
                </div>
            </div>
            <InputInbox/>
            <div>
                {users?.map(user => (
                    <Message key={user.email} user={user}/>
                ))}
            </div>
        </div>
    );
};

export default Inbox;