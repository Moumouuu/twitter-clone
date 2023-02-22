import Header from "@/components/feed/Header";
import Message from "@/components/feed/Message";

const Feed = () => {
    return (
        <div className={'w-[50vw] border-r-2 border-gray-800 h-screen'}>
            <Header />
            <Message />
        </div>
    );
};

export default Feed;