import React from 'react';
import './MainContent.scss';
import Slideshow from '../slide-show/Slideshow';

export const MainContent = () => {
  return (
    <div className="main-content">
      <Slideshow />
      <div className="grid-movie-title">
        <div className="movieType">Now Playing</div>
        <div className="paginate">Paginate</div>
      </div>
      {/* display grid component */}
    </div>
  );
};

export default MainContent;
