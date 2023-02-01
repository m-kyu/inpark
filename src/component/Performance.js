import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { MyContext } from "../context/Context";
import "../scss/Performance.scss";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Performance = () => {
  const { pData } = useContext(MyContext);

  if (pData !== undefined) {
    return (
      <>
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper swiper-wrap"
        >
          {pData.map((obj, key) => {
            return (
              <SwiperSlide className="swiper-content" key={key}>
                <img src={obj.IMGSRC} alt="" />
                <p>{obj.TITLE_KOR}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    );
  }
};

export default Performance;
