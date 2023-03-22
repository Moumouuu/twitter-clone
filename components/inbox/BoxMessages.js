import React from 'react';

const BoxMessages = () => {
    return (
        <div className={"w-full hidden md:block h-screen"}>
            <div className={"w-1/3 m-auto flex flex-col h-full justify-center"}>
                <h6 className={"font-bold text-4xl"}>Sélectionner un message.</h6>
                <p className={"my-2 text-gray-600"}>Faites un choix dans vos conversations existantes, commencez-en une
                    nouvelle ou ne changez rien.</p>
                <button
                    className={"bg-[#1DA1F2] hover:bg-sky-600 duration-300 text-white text-1xl font-bold rounded-full py-3 px-2 "}>
                    Nouveau message
                </button>
            </div>
        </div>

    );
};

export default BoxMessages;