import Header from "@/components/feed/Header";
import InputMessage from "@/components/feed/InputMessage";
import Message from "@/components/feed/Message";

const Feed = ({tweets, userConnectedId}) => {

    return (
        <div className={'w-[50vw] border-r-2 border-gray-800 h-screen'}>
            <Header/>
            <div className={"overflow-y-scroll overflow-hidden h-[80vh]"}>
                <InputMessage/>
                {tweets?.map((tweet) => (
                    <Message key={tweet.id} tweet={tweet} userConnectedId={userConnectedId}/>
                ))}
            </div>
        </div>
    );
};

export default Feed;

