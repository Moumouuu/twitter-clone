import Item from "@/components/sidebar/Item";
import {HiHome} from "react-icons/hi";
import {FaTwitter} from "react-icons/fa";
import {BiHash, BiEnvelope} from "react-icons/bi";
import {BsBookmark, BsPersonFill} from "react-icons/bs";
import {CgMoreO} from "react-icons/cg";
import {GiBirdTwitter} from "react-icons/gi";
import {IoMdNotificationsOutline} from "react-icons/io";
import Link from "next/link";
import Profil from "@/components/sidebar/Profil";


const Sidebar = () => {
    return (
        <div className={"ml-10 pt-4 text-[#E6E9EA] w-1/5 border-r-2 border-white overflow-hidden h-screen flex flex-col justify-between"}>
            <div>
                <div className={"text-4xl"}>
                    <FaTwitter/>
                </div>
                <div className={"mt-5"}>
                    <Item icon={<HiHome/>} text={"Accueil"}/>
                    <Item icon={<BiHash/>} text={"Explorer"}/>
                    <Item icon={<IoMdNotificationsOutline/>} text={"Notifications"}/>
                    <Item icon={<BiEnvelope/>} text={"Messages"}/>
                    <Item icon={<BsBookmark/>} text={"Signets"}/>
                    <Item icon={<GiBirdTwitter/>} text={"Twitter Blue"}/>
                    <Item icon={<BsPersonFill/>} text={"Profil"}/>
                    <Item icon={<CgMoreO/>} text={"Plus"}/>
                </div>
                <div>
                    <Link href={""}>
                        <button
                            className={"bg-[#1DA1F2] hover:bg-sky-600 duration-300 text-white text-1xl font-bold rounded-full w-2/3 py-3 "}>
                            Tweeter
                        </button>
                    </Link>
                </div>
            </div>
            <div>
                <Profil/>
            </div>

        </div>
    );
};

export default Sidebar;