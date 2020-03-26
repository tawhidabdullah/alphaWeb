import React from 'react';
import { SliderCarousel } from '../../components/Carousel';
import { useFetch } from '../../hooks';
interface Props {}

const Slider = (props: Props) => {
  const sliderState = useFetch([], [], 'slider');
  return (
    <div className='col-md-7 col-sm-12 image-slider-section-carousel'>
      {sliderState.data.length > 0 && (
        <SliderCarousel imagesContents={sliderState.data} />
      )}
    </div>
  );
};

export default Slider;
