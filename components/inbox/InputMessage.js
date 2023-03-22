import React from 'react';
import {AiOutlineGif, AiOutlinePicture, AiOutlineSend} from "react-icons/ai";
import {VscSmiley} from "react-icons/vsc";

const InputMessage = ({input, setInput, handleSubmit}) => {

    const submit = async () => {
        if (input !== "") {
            handleSubmit();
            setInput("")
        }
    }

    return (
        <div className={"flex p-3 bg-[#2F3336] rounded-full items-center justify-between fixed bottom-1"}>
            <div className={"flex w-[600px]"}>
                <div className="text-[#1DA1F2] text-xl mr-4 flex">
                    <div className={"cursor-pointer mr-4"}>
                        <AiOutlinePicture/>
                    </div>
                    <div className={"cursor-pointer mr-4 "}>
                        <AiOutlineGif/>
                    </div>
                    <div className={"cursor-pointer"}>
                        <VscSmiley/>
                    </div>
                </div>
                <input type="text" className={"outline-none bg-transparent w-full"}
                       placeholder={"Démarrer un nouveau message"}
                       onChange={(e) => setInput(e.target.value)}
                       value={input}
                />
            </div>
            <div className={"text-[#1DA1F2] text-xl cursor-pointer mr-4 "}
                 onClick={submit}
            >
                <AiOutlineSend/>
            </div>
        </div>
    );
};

export default InputMessage;