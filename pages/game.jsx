import { Fragment, useState } from "react";
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { portfolioSlider } from "@/src/sliderProps";
import PortfolioModal from "@/src/components/popup/PortfolioModal";

const Game = ( { data } ) => {
  const [modal, setModal] = useState(false);
  return (
    <div >Game</div>
  );
};
export default Game;

