import {HiOutlineMagnifyingGlass} from "react-icons/hi2";
import {useState} from "react";
import Profile from "@/components/trends/Profile";

const Input = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);


    const getUsersFromSearch = async (e) => {
        setSearch(e.target.value);
        try {
            const res = await fetch(`/api/users/search/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({search}),
            });
            const data = await res.json();
            setUsers(data.users);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={"mx-4 mt-2 mb-4"}>
            <div className={"relative flex items-center"}>
                <div className={"absolute left-2 text-gray-600 text-xl mr-3"}>
                    <HiOutlineMagnifyingGlass/>
                </div>
                <input type="text"
                       value={search}
                       onChange={(e) => getUsersFromSearch(e)}
                       className={"pl-10 w-full rounded-full bg-[#202327] px-4 py-2 outline-none bg-transparent text-white focus:outline-[#1DA1F2]"}
                       placeholder={"Recherche Twitter "}/>
                {search.length > 0 && (
                    <div onClick={() => setSearch("")}
                         className={"absolute top-12 w-full bg-[#202327] rounded-xl p-3 m-h-[50vh] overflow-x-scroll"}>
                        {users?.map(user => (
                            <Profile key={user.email} user={user}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;
