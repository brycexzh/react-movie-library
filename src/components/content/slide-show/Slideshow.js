/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import './Slideshow.scss';

export const Slideshow = (props) => {
  const { images, auto } = props;
  const [state, setState] = useState({
    sldeShow: images[0],
    slideIndex: 0
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderInterval, setSliderInterval] = useState(0);

  const { slideShow, slideIndex } = state;
  let currentSlideIndex = 1;

  useEffect(() => {
    if (auto) {
      const timeInterval = setInterval(() => {
        autoMoveSlide();
      }, 5000);
      setSliderInterval(timeInterval);

      return () => {
        clearInterval(timeInterval);
        clearInterval(sliderInterval);
      };
    }
  }, []);

  const autoMoveSlide = () => {
    let lastIndex = 0;
    lastIndex = currentSlideIndex + 1;
    currentSlideIndex = lastIndex >= images.length ? 0 : lastIndex;
    setState((prev) => (
      {
        ...prev,
        slideIndex: currentSlideIndex,
        slideShow: images[currentSlideIndex]
      }
    ));
  };

  const moveSlideWithArrows = (type) => {
    let index = currentIndex;
    if (type === 'prev') {
      if (currentIndex <= 0) {
        index = images.length - 1;
      } else {
        index -= 1;
      }
    } else {
      if (currentIndex < images.length) {
        index += 1;
      }
      if (index === images.length) {
        index = 0;
      }
    }

    setCurrentIndex(index);
    setState((prev) => (
      {
        ...prev,
        slideIndex: index,
        slideShow: images[index]
      }
    ));
  };

  const RenderArrows = () => {
    return (
      <div className="slider-arrows">
        <div className="slider-arrow slider-arrow--left" onClick={() => moveSlideWithArrows('prev')} />
        <div className="slider-arrow slider-arrow--right" onClick={() => moveSlideWithArrows('next')} />
      </div>
    );
  };

  const Indicators = (props) => {
    const { currentSlide } = props;
    const listIndicators = images.map((slide, i) => {
      const buttonClass = i === currentSlide ? 'slider-navButton slider-navButton--active' : 'slider-navButton';
      return <button className={buttonClass} key={i} />;
    });
    return <div className="slider-nav" >{listIndicators}</div>;
  };

  return (
    <>
      <div className="slider">
        <div className="slider-slides">
          {
            images && images.length && slideShow && (
              <div
                className="slider-image"
                style={{ backgroundImage: `url(${slideShow.url})` }}
              ></div>
            )
          }
        </div>
        <Indicators currentSlide={slideIndex}/>
        <RenderArrows />
      </div>
    </>
  );
};

export default Slideshow;
