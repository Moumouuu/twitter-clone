import React from 'react';
import Message from "@/components/feed/Message";

const Tweets = ({tweets, userConnectedId}) => {
    return (
        <div>
            {tweets?.map(tweet => (
                <Message key={tweet.id} tweet={tweet} userConnectedId={userConnectedId}/>
            ))}
        </div>
    );
};

export default Tweets;