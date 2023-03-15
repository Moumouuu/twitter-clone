import React, {useEffect, useState} from 'react';
import Inbox from "@/components/inbox/Inbox";
import {useSession} from "next-auth/react";
import getIdOfUserConnected from "@/utils/getIdOfUserConnected";

const Index = () => {
    const [users, setUsers] = useState([]);
    const {data: session} = useSession();
    const [userConnectedId, setUserConnectedId] = useState(null);

    useEffect(() => {
        if (session) {
            getIdOfUserConnected(session, setUserConnectedId).then(() => {
                getAllUsers().then((users) => {
                    setUsers(users)
                });
            });
        }
    }, [session, userConnectedId]);

    const getAllUsers = async () => {
        if (userConnectedId === null) return;
        const response = await fetch(`/api/user/getAllUsers/${userConnectedId}`, {
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
            <Inbox users={users} setUsers={setUsers}/>
        </div>
    );
};

export default Index;


