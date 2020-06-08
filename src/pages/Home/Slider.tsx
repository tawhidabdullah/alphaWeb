import React from 'react';
import ReactPlayer from "react-player"


interface Props {

}

const Slider = ({ }: Props) => {


  return (
    <div className='col-md-7 col-sm-12 image-slider-section-carousel'>
      <ReactPlayer
        loop={true}
        playing={true}
        width='100%'
        height='100%'
        muted={true}
        url="https://youtu.be/0cbo0f0pZgw?autoplay=1&color=white&controls=0&rel=0"
      />
    </div>
  );
};

export default Slider;