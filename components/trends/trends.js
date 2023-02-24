import Input from "@/components/trends/input";
import Suggestions from "@/components/trends/Suggestions";

const Trends = () => {

    return (
        <div className={"w-1/2 hidden md:block h-screen overflow-y-scroll"}>
            <Input/>
            <Suggestions/>
            <div className="ml-10">
            <span className={"text-gray-600 text-sm text-center"}>
                Conditions d’utilisation <br/>
                de Confidentialité <br/>
                Politique relative aux cookies
                Accessibilité <br/>
                Informations sur les publicités <br/>
                © 2023 Twit - Robin Pluviaux.
            </span>
            </div>
        </div>
    );
};

export default Trends;