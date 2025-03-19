import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import "./home.scss"
const Home = () => {
  return (
    <>
    <div className="home-parent parent">

        {/* <!-- Home Section Hero --> */}
    <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
      </Swiper>
    
   
        </div>

         {/* //Second Section Home Page  */}
         <div className="about-section-parent parent">
            <div className="about-section-cont cont">
                <div className="card-box">
                    <div className="card">
                        <div className="card-img bg-img-cover"></div>
                        <h5>Lorem, ipsum.</h5>
                    </div>
                    <div className="card">
                        <div className="card-img bg-img-cover"></div>
                        <h5>Lorem, ipsum.</h5>
                    </div>
                    <div className="card">
                        <div className="card-img bg-img-cover"></div>
                        <h5>Lorem, ipsum.</h5>
                    </div>
                    <div className="card">
                        <div className="card-img bg-img-cover"></div>
                        <h5>Lorem, ipsum.</h5>
                    </div>

                </div>
            </div>
         </div>
   
  </>
  )
}

export default Home
