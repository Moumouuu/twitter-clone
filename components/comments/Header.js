import {AiOutlineArrowLeft} from "react-icons/ai";
import Link from "next/link";

const Header = () => {

    return (
        <div className={"flex items-center p-3 bg-black h-[10vh]"}>
            <Link href={'/'} className="p-3 cursor-pointer text-2xl">
                <AiOutlineArrowLeft/>
            </Link>
            <span className={"font-bold text-xl"}>Tweet</span>
        </div>
    );
};

export default Header;
