import {FiMoreHorizontal} from "react-icons/fi";

const Item = ({text, likes, category}) => {
    return (
        <div className={"flex flex-col my-3 bg-transparent hover:bg-gray-900 w-full px-3 pb-2 rounded-xl "}>
            <div className={"flex w-full justify-between text-gray-600 items-center "}>
                <span className={"text-sm"}>Tendance dans la catégorie {category}</span>
                <div
                    className={"bg-transparent hover:bg-[#1DA1F2] opacity-60 duration-300 ease cursor-pointer p-2 rounded-full"}>
                    <FiMoreHorizontal/>
                </div>
            </div>
            <span className={"font-bold"}>{text}</span>
            <span className={"text-gray-600 text-sm"}>{likes} Likes</span>
        </div>
    );
};

export default Item;