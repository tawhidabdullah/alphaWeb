import React, { useLayoutEffect, useEffect, useState } from 'react';
import Footer from '../../layout/Footer';
// import Home components
import TopTags from './TopTags';
import SliderLeftMenu from './SliderLeftMenu';
import Slider from './Slider';
import SliderRight from './SliderRight';
import Categories from './Categories';
import CategoryProducts from './CategoryProducts';

interface Props {
  history: any;
}

const Home = ({ history }: Props) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const getWindowWidth = () => {
    return Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
  };

  useLayoutEffect(() => {
    setWindowWidth(getWindowWidth());
  }, []);

  const onResize = () => {
    window.requestAnimationFrame(() => {
      setWindowWidth(getWindowWidth());
    });
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <TopTags history={history} />
      <section className='image-slider-section'>
        <div className='row'>
          <SliderLeftMenu history={history} />
          <Slider />
          <SliderRight windowWidth={windowWidth} />
        </div>
      </section>
      <Categories />
      <CategoryProducts history={history} windowWidth={windowWidth} />
      <Footer />
    </>
  );
};

export default Home;
