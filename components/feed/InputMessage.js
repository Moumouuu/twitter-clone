import Image from "next/image";
import {useSession} from "next-auth/react";
import {AiOutlineCalendar, AiOutlineGif} from "react-icons/ai";
import {BsListUl} from "react-icons/bs";
import {VscSmiley} from "react-icons/vsc";
import React, {useState} from "react";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {useRouter} from "next/router";
import refreshPage from "@/utils/refreshPage";
import {ImageUpload} from "@/components/feed/ImageUpload";

const InputMessage = () => {
    const {data: session} = useSession();
    const [message, setMessage] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const router = useRouter();
    const sendMessage = async () => {
        let fileBlog;
        if (selectedFile) {
            const file = document.querySelector('#upload').files[0];
            fileBlog = await toBase64(file)
        }
        try {
            await fetch("/api/sendMessage/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message,
                    user: session?.user,
                    image: selectedFile ? fileBlog : ""
                })
            })
        } catch (e) {
            console.log(e);
        } finally {
            setMessage("");
            setPreview(undefined)
            setSelectedFile(undefined)
            refreshPage(router);
        }
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    return (
        <div className={"flex border-y-2 border-gray-800 "}>
            <div className={"mx-4 pt-2 w-15"}>
                <Image
                    src={session ? session?.user.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'}
                    alt={"user picture"} height={100} width={100}
                    className={"rounded-full hidden md:block"}></Image>
            </div>
            <div className={"flex flex-col w-full p-3"}>
                <input value={message} onChange={(e) => setMessage(e.target.value)}
                       className={"bg-transparent outline-none text-2xl mt-3 mb-5 "} type="text"
                       placeholder={"Quoi de neuf ?"}/>
                <div className={"flex items-center w-full justify-between"}>
                    <div className="flex">
                        <div className={"text-[#1DA1F2] text-xl cursor-pointer mr-4"}>
                            <ImageUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile}
                                         preview={preview} setPreview={setPreview}/>
                        </div>
                        <div className={"text-[#1DA1F2] text-xl cursor-pointer mr-4 "}>
                            <AiOutlineGif/>
                        </div>
                        <div className={"text-[#1DA1F2] text-xl cursor-pointer mr-4 "}>
                            <BsListUl/>
                        </div>
                        <div
                            className={"relative text-[#1DA1F2] text-xl cursor-pointer mr-4 "}>
                            <div onClick={() => setShowEmoji(!showEmoji)}>
                                <VscSmiley/>
                            </div>
                            {showEmoji &&
                                <div className={"absolute top-10"}>
                                    <Picker data={data} onEmojiSelect={(e) => setMessage(message + e.native)}/>
                                </div>
                            }
                        </div>
                        <div className={"text-[#1DA1F2] text-xl cursor-pointer mr-4"}>
                            <AiOutlineCalendar/>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={message.length > 0 ? sendMessage : null}
                            className={message.length === 0 ? "bg-[#226E9D] text-white font-bold rounded-full py-2 px-5 " : "bg-[#1DA1F2] hover:bg-sky-600 duration-300 text-white font-bold rounded-full py-2 px-5 "}>Tweeter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputMessage;