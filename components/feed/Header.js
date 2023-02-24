import Link from "next/link";
import {useRouter} from "next/router";

const Header = () => {
    const router = useRouter();
    return (
        <div className={'sticky top-0 bg-black z-10 h-[15vh]'}>
            <h3 class={"font-semibold text-2xl mt-3 ml-4"}>Accueil</h3>
            <div class={"flex justify-center w-full text-center mt-4"}>
                <Link href={"/"} className={"relative font-semibold w-1/2 px-4 py-4 bg-black hover:bg-gray-900 "}>
                    Pour vous
                    {router.pathname === "/" &&
                        <div
                            className={'absolute bottom-0 left-[50%] translate-x-[-50%] bg-[#1DA1F2] h-1 w-[20%] rounded-full'}></div>
                    }
                </Link>
                <Link href={"/follow"}
                      className={"relative font-semibold w-1/2 px-4 py-4 bg-black hover:bg-gray-900"}>Follow
                    {router.pathname === "/follow" &&
                        <div
                            className={'absolute bottom-0 left-[50%] translate-x-[-50%] bg-[#1DA1F2] h-1 w-[20%] rounded-full'}></div>
                    }
                </Link>
            </div>
        </div>
    );
};

export default Header;