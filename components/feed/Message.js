import Image from "next/image";
import {useSession} from "next-auth/react";
import {AiOutlinePicture, AiOutlineGif, AiOutlineCalendar} from "react-icons/ai";
import {BsListUl} from "react-icons/bs";
import {VscSmiley} from "react-icons/vsc";


const Message = () => {
    const {data: session} = useSession();
    return (
        <div className={"flex border-y-2 border-gray-800 "}>
            <div className={"mx-4 my-auto"}>
                <Image src={session?.user.image} alt={"user picture"} height={60} width={60}
                       className={"rounded-full"}></Image>
            </div>
            <div className={"flex flex-col w-full p-3"}>
                <input className={"bg-transparent outline-none text-2xl mt-3 mb-5 "} type="text" placeholder={"Quoi de neuf ?"}/>
                <div className={"flex items-center w-full justify-between"}>
                    <div className="flex">
                        <div className={"text-[#1DA1F2] text-xl cursor-pointer mx-1 p-1"}>
                            <AiOutlinePicture/>
                        </div>
                        <div className={"text-[#1DA1F2] text-xl cursor-pointer mx-1 p-1"}>
                            <AiOutlineGif/>
                        </div>
                        <div className={"text-[#1DA1F2] text-xl cursor-pointer mx-1 p-1"}>
                            <BsListUl/>
                        </div>
                        <div className={"text-[#1DA1F2] text-xl cursor-pointer mx-1 p-1"}>
                            <VscSmiley/>
                        </div>
                        <div className={"text-[#1DA1F2] text-xl cursor-pointer mx-1 p-1"}>
                            <AiOutlineCalendar/>
                        </div>
                    </div>
                    <div>
                        <button
                            className={"bg-[#1DA1F2] hover:bg-sky-600 duration-300 text-white font-bold rounded-full py-2 px-5 "}>Tweeter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;