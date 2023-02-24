import React from 'react';
import Image from "next/image";
import {FiMoreHorizontal} from "react-icons/fi";

const Profile = ({user}) => {
    return (
        <div
            className={"mb-3 cursor-pointer flex flex-row justify-between items-center duration-300 bg-[#202327] hover:border-[#1DA1F2] border-2 border-[#202327] rounded-full w-full py-1 px-3 relative"}>
            <div className="flex">
                <div>
                    <Image
                        src={user ? user.picture : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"}
                        alt={"profile picture"} width={50} height={50} className={"rounded-full mr-3"}></Image>
                </div>
                <div className="flex flex-row hidden md:block">
                    <p className={"font-semibold"}>{user?.name}</p>
                    <p className={"text-gray-600"}>@{user?.name}</p>
                </div>
            </div>
            <div className="hidden md:block">
                <FiMoreHorizontal/>
            </div>
        </div>
    );
};

export default Profile;