import React, {useEffect, useState} from 'react';
import Inbox from "@/components/inbox/Inbox";
import {useSession} from "next-auth/react";
import getIdOfUserConnected from "@/utils/getIdOfUserConnected";
import BoxMessages from "@/components/inbox/BoxMessages";

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
        <div className={"flex w-full"}>
            <Inbox userConnectedId={userConnectedId} users={users} setUsers={setUsers}/>
            <BoxMessages/>
        </div>
    );
};

export default Index;


