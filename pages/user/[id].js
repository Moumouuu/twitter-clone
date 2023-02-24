import React from 'react';
import Header from "@/components/account/Header";
import prisma from "@/lib/prisma";

const User = ({user}) => {
    return (
        <div className={"w-full border-r-2 border-gray-800 h-screen"}>
            <Header user={user}/>
        </div>
    );
};

export default User;

export async function getServerSideProps(context) {
    const {id} = context.params;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    });
    return {
        props: {
            user: user
        }
    };
}