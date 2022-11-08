import { Fragment, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { portfolioSlider } from "@/src/sliderProps";
import PortfolioModal from "@/src/components/popup/PortfolioModal";
import Image from 'next/image'
import State from "@/src/hooks/context";

const Videos = ( { data } ) => {
  const [modal, setModal] = useState(false);
  return (
    <div>I am video</div>
  );
};
export default Videos;
