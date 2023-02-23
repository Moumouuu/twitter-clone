import {HiOutlineMagnifyingGlass} from "react-icons/hi2";

const Input = () => {
    return (
        <div className={"mx-4 mt-2 mb-4"}>
            <div className={"relative flex items-center"}>
                <div className={"absolute left-2 text-gray-600 text-xl mr-3"}>
                    <HiOutlineMagnifyingGlass/>
                </div>
                <input type="text"
                       className={"pl-10 w-full rounded-full bg-gray-800 px-3 py-2 outline-none bg-transparent text-white focus:outline-[#1DA1F2]"}
                       placeholder={"Recherche Twitter "}/>
            </div>
        </div>
    );
};

export default Input;