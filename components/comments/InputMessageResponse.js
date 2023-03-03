import Image from "next/image";
import {useSession} from "next-auth/react";
import {AiOutlineCalendar, AiOutlineGif, AiOutlinePicture} from "react-icons/ai";
import {BsListUl} from "react-icons/bs";
import {VscSmiley} from "react-icons/vsc";
import {useState} from "react";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {useRouter} from "next/router";
import refreshPage from "@/utils/refreshPage";

const InputMessage = () => {
    const {data: session} = useSession();
    const [message, setMessage] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const router = useRouter();
    const sendMessage = async () => {
        try {
            await fetch("/api/sendResponse/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message,
                    user: session?.user,
                })
            })
        } catch (e) {
            console.log(e);
        } finally {
            setMessage("");
            refreshPage(router);
        }
    }

    return (
        <div className={"flex border-y-2 border-gray-800 "}>
            <div className={"mx-4 pt-2 w-15"}>
                <Image
                    src={session ? session?.user.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'}
                    alt={"user picture"} height={80} width={80}
                    className={"rounded-full hidden md:block"}></Image>
            </div>
            <div className={"flex flex-col w-full p-3"}>
                <input value={message} onChange={(e) => setMessage(e.target.value)}
                       onFocus={() => setShowOptions(true)}
                       className={"bg-transparent outline-none text-2xl mt-3 mb-5 "} type="text"
                       placeholder={"Tweeter votre réponse."}/>
                {showOptions && (
                    <div className={"flex items-center w-full justify-between"}>
                        <div className="flex">
                            <div className={"text-[#1DA1F2] text-xl cursor-pointer mr-4"}>
                                <AiOutlinePicture/>
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
                                className={message.length === 0 ? "bg-[#226E9D] text-white font-bold rounded-full py-2 px-5 " : "bg-[#1DA1F2] hover:bg-sky-600 duration-300 text-white font-bold rounded-full py-2 px-5 "}>Répondre
                            </button>
                        </div>
                    </div>
                )
                }


            </div>
        </div>
    );
};

export default InputMessage;