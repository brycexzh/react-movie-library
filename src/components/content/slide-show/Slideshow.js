import React from 'react';

import './Slideshow.scss';

export const Slideshow = () => {
  const RenderArrows = () => {
    return (
      <div className="slider-arrows">
        <div className="slider-arrow slider-arrow--left" />
        <div className="slider-arrow slider-arrow--right" />
      </div>
    );
  };

  return (
    <>
      <div className="slider">
        <div className="slider-slides">
          <div
            className="slider-image"
            style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616__340.jpg)' }}
          ></div>
        </div>
        <RenderArrows />
      </div>
    </>
  );
};

export default Slideshow;
