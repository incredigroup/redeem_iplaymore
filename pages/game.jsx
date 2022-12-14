import { Fragment, useState } from "react";
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { portfolioSlider } from "@/src/sliderProps";
import PortfolioModal from "@/src/components/popup/PortfolioModal";

const Game = ( { data } ) => {
  const [modal, setModal] = useState(false);
  return (
    <Fragment >
        <div className="flex md:flex-row" >
            <div className="flex-[0.5] md:flex-[0.5]">
                <h1 className="h1-text-responsive">Game</h1>
                <p className="descri-text">Welcome, pick a username before anyone else, acquire gears and devices <br className="hidden xl:block"/>early and get ready to play!
                </p>
            </div>
            <div className="flex-[0.4] md:flex-[0.4] pt-12 ">
               
            </div>
        </div>
    </Fragment>
  );
};
export default Game;

