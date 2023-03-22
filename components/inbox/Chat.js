import React, {useEffect, useState} from 'react';
import {io} from "socket.io-client";
import InputMessage from "@/components/inbox/InputMessage";
import {useRouter} from "next/router";

const Chat = ({userConnectedId}) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const router = useRouter();
    let socket;

    useEffect(() => {
        //socketInitializer();
        if (router.query.id === undefined) return;
        getMyMessages().then((m) => {
            setMessages(m);
        });


        return () => {
            socket?.disconnect();
        };
    }, [input, router.query.id]);

    const getMyMessages = async () => {
        setMessages([]);
        const response = await fetch(`/api/message/getMyMessages/${router.query.id[0]}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: userConnectedId
            })
        });
        const data = await response.json();
        return data;
    }

    async function socketInitializer() {
        await fetch("/api/socket/socketHandler");

        socket = io();

        socket.on("receive-message", (data) => {
            // todo: we get the data here
        });
    }

    const handleSubmit = async (e) => {
        const res = await fetch("/api/message/sendMessage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: input,
                senderId: userConnectedId,
                receiverId: router.query.id[0]
            })
        })
        setInput("");
        const data = await res.json();
        console.log(data);
    }

    return (
        <div className={"mx-3 w-full h-screen overflow-y-scroll flex flex-col justify-between"}>
            <div className={"flex flex-col my-3"}>
                {
                    messages?.map((message) =>
                        userConnectedId === message.senderId ? (
                                <div key={message.id} className={"flex flex-col w-full"}>
                                    <div className={"my-2 flex justify-end"}>
                                        <span className={"p-3 rounded-full bg-[#1DA1F2]"}>{message.content}</span>
                                    </div>
                                    <span
                                        className={"text-gray-600 text-sm flex justify-end"}>{message.datePublished}</span>
                                </div>
                            ) :
                            (
                                <div key={message.id} className={"flex flex-col w-full"}>
                                    <div className={"my-2 flex justify-start"}>
                                        <span className={"p-3 rounded-full bg-[#2F3336]"}>{message.content}</span>
                                    </div>
                                    <span
                                        className={"text-gray-600 text-sm flex justify-start"}>{message.datePublished}</span>
                                </div>
                            )
                    )
                }
            </div>
            <InputMessage input={input} setInput={setInput} handleSubmit={handleSubmit}/>
        </div>
    );
};

export default Chat;