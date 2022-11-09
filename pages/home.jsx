import { useContext , useEffect, Fragment} from "react";
import { context } from "@/src/hooks/context";
import AnimatedText from "@/src/components/AnimatedText";
import State from "@/src/hooks/context";


const homeData = {
  lastName: "THUNDER! ©",
};

const Home = ({ activeWithBtn, route }) => {
  const navContext = useContext(context);
  const { changeNav } = navContext;

  return (
    <Fragment >
        <div className="flex md:flex-row" >
            <div className="flex-[0.5] md:flex-[0.5]">
                <h1 className="h1-text-responsive">Home</h1>
                <p className="descri-text">Welcome to Iplaymore about Thunder Game <br className="hidden xl:block"/>early and get ready to play!
                </p>
            </div>
            <div className="flex-[0.4] md:flex-[0.4] pt-12 ">
              
            </div>
        </div>
    </Fragment>
  );
};
export default Home;
