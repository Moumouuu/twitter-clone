import Item from "@/components/trends/Item";

const Suggestions = () => {
    return (
        <div className={"bg-[#16181C] rounded-xl m-3"}>
            <h6 className={"font-bold text-xl px-3 pt-3"}>Tendances pour vous</h6>
            <Item text={"#France"} likes={1783} category={"France"}/>
            <Item text={"MangeTonPapa"} likes={3890} category={"France"}/>
            <Item text={"#BalanceTaFrite"} likes={238492} category={"France"}/>
            <Item text={"Madrid"} likes={3898932} category={"France"}/>
            <Item text={"#NextJS"} likes={33902} category={"France"}/>
            <Item text={"#web"} likes={33902} category={"France"}/>

        </div>
    );
};

export default Suggestions;