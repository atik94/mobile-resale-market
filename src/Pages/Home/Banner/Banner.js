import React from "react";
import image1 from "../../../assets/Images/Banner/gh11-banner.jpg";
import image2 from "../../../assets/Images/Banner/h10-slider.jpg";
import image3 from "../../../assets/Images/Banner/nx6-slider.jpg";
import image4 from "../../../assets/Images/Banner/primo-r10.jpg";

const Banner = () => {
  return (
    // <div className="hero  bg-base-200">
    //   <div className="hero-content flex-col lg:flex-row">
    //     <img
    //       src="https://www.intel.com/content/dam/www/central-libraries/us/en/images/2022-05/laptop-marquee-16x9.png.rendition.intel.web.864.486.png"
    //       className="rounded-lg lg:w-1/2 shadow-2xl"
    //       alt=""
    //     />
    //     <div>
    //       <h1 className="text-5xl font-bold">Used laptop are resale here!</h1>
    //       <p className="py-6">
    //         laptop computer, sometimes called a notebook computer by manufacturers, is a battery- or AC-powered personal
    //         computer generally smaller than a briefcase that can easily be transported and conveniently used in
    //         temporary spaces such as on airplanes, in libraries, temporary offices, and at meetings.
    //       </p>
    //       <button className="btn btn-primary">Get Started</button>
    //     </div>
    //   </div>
    // </div>

    <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <img src={image1} alt="" className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img src={image2} alt="" className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img src={image3} alt="" className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img src={image4} alt="" className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
