import Image from "next/image";
import {FiMoreHorizontal} from "react-icons/fi";
import {useState} from "react";
import {signIn, signOut, useSession} from "next-auth/react";

const Profil = () => {
    const {data: session} = useSession();
    const [showInfo, setShowInfo] = useState(false);
    if (session) {
        return (
            <div onClick={() => setShowInfo(!showInfo)}
                 className={"cursor-pointer flex flex-row justify-between items-center bg-black hover:bg-gray-900 rounded-full w-full py-1 px-3 relative"}>
                {showInfo &&
                    <div onClick={() => signOut()}
                         className={"absolute bottom-14 w-full h-auto bg-black border-2 border-white shadow rounded-lg"}>
                        <p className={"font-semibold bg-black hover:bg-gray-800 p-3 rounded-lg duration-300"}>Se
                            déconnecter
                            du
                            compte {session?.user.name}</p>
                    </div>}
                <div className="flex">
                    <div>
                        <Image
                            src={session?.user.image}
                            alt={"profile picture"} width={50} height={50} className={"rounded-full mr-3"}></Image>
                    </div>
                    <div className="flex flex-row hidden md:block">
                        <p className={"font-semibold"}>{session?.user.name}</p>
                        <p className={"text-gray-600"}>@{session?.user.name}</p>
                    </div>
                </div>
                <div className="hidden md:block">
                    <FiMoreHorizontal/>
                </div>
            </div>
        );
    } else {
        return (
            <div onClick={() => setShowInfo(!showInfo)}
                 className={"cursor-pointer flex flex-row justify-between items-center bg-black hover:bg-gray-900 rounded-full py-1 px-3 mr-4 relative"}>
                {showInfo &&
                    <div onClick={() => signIn('Google')}
                         className={"absolute bottom-14 w-full h-auto bg-black border-2 border-white shadow rounded-lg"}>
                        <p className={"font-semibold bg-black hover:bg-gray-800 p-3 rounded-lg duration-300"}>
                            Connexion
                        </p>
                    </div>}
                <div className="flex">
                    <div>
                        <Image
                            src={"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"}
                            alt={"profile picture"} width={50} height={50} className={"rounded-full mr-3"}></Image>
                    </div>
                    <div className="flex flex-row hidden md:block">
                        <p className={"font-semibold"}>MisterX</p>
                        <p className={"text-gray-600"}>@misterx39202</p>
                    </div>
                </div>
                <div className="hidden md:block">
                    <FiMoreHorizontal/>
                </div>
            </div>
        )
    }
};

export default Profil;