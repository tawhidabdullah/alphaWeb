import React from 'react';
import { useFetch } from '../../hooks';

interface Props {
  windowWidth: number;
}

const SliderRight = ({ windowWidth }: Props) => {
  const sliderRightState = useFetch([], [], 'sliderRight');
  return (
    <>
      {windowWidth < 600 ? (
        <div
          className='col-md-3 col-sm-12'
          style={{
            height: '30vh'
          }}
        >
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '10px'
            }}
          >
            {sliderRightState.data.length > 0 &&
              sliderRightState.data
                .slice(0, 2)
                .map(({ src, target }, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        width: '48%',
                        marginLeft: `${index === 1 ? '5px' : '0'}`,
                        marginRight: `${index === 1 ? '0' : '5px'}`,
                        borderRadius: '5px'
                      }}
                    >
                      <a href={target}>
                        <img
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '5px'
                          }}
                          src={src}
                          alt='Right Slider'
                        />
                      </a>
                    </div>
                  );
                })}
          </div>
        </div>
      ) : (
        <div
          className='col-md-3 col-sm-12 image-slider-section-carousel'
          style={{
            height: '50vh'
          }}
        >
          <div
            className='row'
            style={{
              height: '100%'
            }}
          >
            {sliderRightState.data.length > 0 &&
              sliderRightState.data
                .slice(0, 2)
                .map(({ src, target }, index) => {
                  return (
                    <div
                      key={index}
                      className='col-md-12'
                      style={{
                        height: '48%',
                        alignSelf: `${index === 1 ? 'flex-end' : 'flex-start'}`,
                        borderRadius: '5px'
                      }}
                    >
                      <a href={target}>
                        <img
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '5px'
                          }}
                          src={src}
                          alt='Right Slider'
                        />
                      </a>
                    </div>
                  );
                })}
          </div>
        </div>
      )}
    </>
  );
};

export default SliderRight;
