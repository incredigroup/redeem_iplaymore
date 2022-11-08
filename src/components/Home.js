import { useContext , useEffect} from "react";
import { context } from "../context/context";
import AnimatedText from "./AnimatedText";
// import { useRouter } from "next/router";
import State from "../context/context";


const homeData = {
  lastName: "THUNDER! ©",
};

const Home = ({ activeWithBtn, route }) => {
  // const router = useRouter()
  const navContext = useContext(context);
  const { changeNav } = navContext;

  useEffect(() => {
    if (route === 'bonfire') {
      changeNav('bonfire');
      console.log('route from header = ', route);

      // set href to bonfire

      // activeSection('bonfire');


    }
  }, []);

  console.log('route from home = ', route);

  return (
    <State>
      <div className="edrea_tm_section animated" id="home">
        <div className="section_inner">
          <div className="edrea_tm_home">
            <h3 className="name">
              <span className="coloring">{homeData.lastName}</span>
            </h3>
            <h3 className="job">
              <AnimatedText />
            </h3>
            {/* <div className="edrea_tm_button transition_link">
              <a href="#contact" onClick={() => changeNav("contact")}>
              Get in Touch
              </a>
            </div> */}
            <div className="edrea_tm_button"> 
              <a href='#register' className="a" style={{width:'50%', marginTop: '20px'}} onClick={() => changeNav('register')}>Sign Up Play Early!</a>
            </div>
          </div>
        </div>
      </div>
    </State>
  );
};
export default Home;
