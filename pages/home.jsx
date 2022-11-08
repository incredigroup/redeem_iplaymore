import { useContext , useEffect} from "react";
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
    <div className="edrea_tm_section animated" id="home">
      <div className="section_inner">
        <div className="edrea_tm_home">
          <h3 className="name">
            <span className="coloring">{homeData.lastName}</span>
          </h3>
          <h3 className="job">
            <AnimatedText />
          </h3>
        </div>
      </div>
    </div>
  );
};
export default Home;
