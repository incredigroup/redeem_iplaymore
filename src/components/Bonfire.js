import { Fragment, useState } from "react";
import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";
import { portfolioSlider } from "../sliderProps";
import PortfolioModal from "./popup/PortfolioModal";

const Bonfire = ( { data } ) => {
  const [modal, setModal] = useState(false);
  return (
    <Fragment>
      <PortfolioModal open={modal} close={() => setModal(false)} />
      <div className="edrea_tm_section hidden animated" id="bonfire">
        <div className="section_inner">
          <div className="edrea_tm_portfolio swiper-section">
            <div className="edrea_tm_main_title">
              <h3>
                THUNDER! ©<span className="coloring">Bonfire Stories</span>
              </h3>
            </div>
            <div className="portfolio_list gallery_zoom">
              <Swiper {...portfolioSlider} className="swiper-container">
                <ul className="swiper-wrapper">
              {data?.items?.map(( {id, snippet = {} }) => {
                const { title, thumbnails = {}, resourceId = {} } = snippet 
                const { medium  } = thumbnails 
                return (
                  <SwiperSlide key={id} className="swiper-slide">
                    <li className="card" key={id} >
                        <a href={`https://www.youtube.com/embed/${resourceId.videoId}`}>
                          <p>
                            <Image width={medium?.width} height={medium?.height} src={medium?.url} alt="" />
                          </p>
                          <h3>{ title }</h3>
                        </a>
                      </li>
                  </SwiperSlide>
                  )
                  })}
                </ul>
                <div className="edrea_tm_swiper_progress fill">
                  <div className="my_pagination_in">
                    <span className="current" />
                    <span className="pagination_progress">
                      <span className="all">
                        <span />
                      </span>
                    </span>
                    <span className="total" />
                  </div>
                  <div className="my_navigation">
                    <ul>
                      <li>
                        <a className="my_prev" href="#">
                          <i className="icon-left-open-1" />
                        </a>
                      </li>
                      <li>
                        <a className="my_next" href="#">
                          <i className="icon-right-open-1" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Bonfire;

