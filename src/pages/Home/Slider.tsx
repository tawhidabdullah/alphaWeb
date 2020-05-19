import React, { useEffect, useState } from 'react';
import { useHandleFetch } from '../../hooks';
import { checkIfItemExistsInCache } from '../../utils';
import ReactPlayer from "react-player"


interface Props {
  addItemToCache: (any) => void;
  cache: any;
}

const Slider = ({ addItemToCache, cache }: Props) => {
  const [sliderState, handleSliderStateFetch] = useHandleFetch([], 'slider');

  const [slider, setSlider] = useState([]);

  useEffect(() => {
    if (checkIfItemExistsInCache(`slider`, cache)) {
      const slider = cache['slider'];
      setSlider(slider);
    } else {
      const getAndSetSlider = async () => {
        const slider = await handleSliderStateFetch({});
        // @ts-ignore
        if (slider) {
          // @ts-ignore
          setSlider(slider);
          addItemToCache({
            slider: slider,
          });
        }
      };

      getAndSetSlider();
    }
  }, []);

  return (
    <div className='col-md-7 col-sm-12 image-slider-section-carousel'>
      <ReactPlayer
        width='100%'
        height='100%'
        url="https://youtu.be/0cbo0f0pZgw?autoplay=1&color=white&controls=0&rel=0"
      />
    </div>
  );
};

export default Slider;