import Header from "@/components/feed/Header";
import InputMessage from "@/components/feed/InputMessage";

const Feed = () => {
    return (
        <div className={'w-[50vw] border-r-2 border-gray-800 h-screen'}>
            <Header />
            <InputMessage />
        </div>
    );
};

export default Feed;