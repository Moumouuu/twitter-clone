import React, {useEffect, useState} from 'react';
import Inbox from "@/components/inbox/Inbox";

const Index = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then((users) => {
            setUsers(users)
        });
    }, []);

    const getAllUsers = async () => {
        const response = await fetch('/api/user/getAllUsers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data;
    }

    return (
        <div className={"w-1/2 border-r-2 border-gray-800 h-screen"}>
            <Inbox users={users}/>
        </div>
    );
};

export default Index;


