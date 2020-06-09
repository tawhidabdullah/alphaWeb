import React, { useLayoutEffect, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { cacheOperations } from '../../state/ducks/cache';


// import Home components
import TopTags from './TopTags';
import SliderLeftMenu from './SliderLeftMenu';
import Slider from './Slider';
import SliderRight from './SliderRight';
import Categories from './Categories';
import CategoryProducts from './CategoryProducts';
import { tagOperations } from '../../state/ducks/tag';

interface Props {
  history: any;
  category: any;
  addItemToCache: () => void;
  cache: any;
  addTag: (any) => void;
  tag: any;
}

const Home = ({
  history,
  category,
  cache,
  addItemToCache,
  addTag,
  tag,
}: Props) => {
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
      {windowWidth < 700 ? (
        ''
      ) : (
          <TopTags history={history} addTag={addTag} tag={tag} />
        )}

      <section className='image-slider-section'>
        <div className='row'>
          <SliderLeftMenu history={history} category={category} />
          <Slider />
          <SliderRight
            windowWidth={windowWidth}
            addItemToCache={addItemToCache}
            cache={cache}
          />
        </div>
      </section>
      <Categories category={category} />
      <CategoryProducts
        history={history}
        windowWidth={windowWidth}
        category={category}
        cache={cache}
        addItemToCache={addItemToCache}
      />
    </>
  );
};

const mapDispatchToProps = {
  addItemToCache: cacheOperations.addItemToCache,
  addTag: tagOperations.addTag,
};

const mapStateToProps = (state) => ({
  category: state.category,
  cache: state.cache,
  tag: state.tag,
});

// @ts-ignore
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(Home);


