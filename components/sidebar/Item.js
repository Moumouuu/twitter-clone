import Link from "next/link";

const Item = ({icon, text, href}) => {
    return (
        <div>
            <Link href={`${href}`}
                  className={"flex items-center my-3 mr-2 bg-black hover:bg-gray-900 rounded-full p-2"}>
                <span className={"text-3xl mr-4"}>{icon}</span>
                <span className={"text-2xl hidden md:block"}>{text}</span>
            </Link>

        </div>
    );
};

export default Item;