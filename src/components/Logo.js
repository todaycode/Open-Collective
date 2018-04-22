import React from 'react';
import PropTypes from 'prop-types';

import { defaultImage } from '../constants/collectives';
import { imagePreview, getDomain } from '../lib/utils';

<<<<<<< HEAD
export default ({ src, style = {}, height, type = 'ORGANIZATION', website }) => {
<<<<<<< HEAD
  style.height = style.height || height;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 003ca78... Connect Twitter/Github/Stripe
  const image = imagePreview(src, defaultImage.ORGANIZATION, { height: style.height });
=======
=======
  if (!src && website) {
=======
=======
=======
const Logo = ({ src, style = {}, height, type = 'ORGANIZATION', website }) => {
>>>>>>> bb3ea6c... add PropTypes to Logo and update code style
  style.maxHeight = style.height || height;
<<<<<<< HEAD
>>>>>>> 195a932... added goals
  if (!src && website && type==='ORGANIZATION') {
>>>>>>> a788972... new test for /create and /apply, accept ToS
    src = `https://logo.clearbit.com/${getDomain(website)}`;
  }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 2f8bcc9... using clearbit to deduce company logo
=======
  const backgroundStyle = { height, minWidth: height };
  if (!src) {
    backgroundStyle.backgroundImage = `url(${defaultImage[type]})`
  }
>>>>>>> 2d1b6fb... fix issue with transparent collective logo
  const image = imagePreview(src, defaultImage[type], { height: style.height });
>>>>>>> 9b02eb7... create organization on /organizations/new
=======
  const backgroundStyle = { height, minWidth: Math.max(0, height/2) };
=======
  const backgroundStyle = { height, minWidth: Math.max(0, parseInt(height)/2) };
>>>>>>> 332434b... make sure we show insufficiant balance when viewing all expenses across collectives of the host
=======
  if (!src && website && type === 'ORGANIZATION') {
    src = `https://logo.clearbit.com/${getDomain(website)}`;
  }
  const backgroundStyle = { height };
  if (height && parseInt(height, 10) == height) {
    backgroundStyle.minWidth = parseInt(height, 10) / 2;
  }
>>>>>>> 520b18e... only add minWidth if height is integer
  if (!src) {
    backgroundStyle.backgroundImage = `url(${defaultImage[type]})`;
  }
  const image = imagePreview(src, defaultImage[type], { height: style.maxHeight });
>>>>>>> 195a932... added goals
  return (
    <div className="Logo" style={backgroundStyle}>
      <style jsx>{`
        .Logo {
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .image {
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
        }
      `}</style>
      <img className="logo" src={image} style={style} />
    </div>
  );
};

Logo.propTypes = {
  src: PropTypes.string,
  style: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string,
  website: PropTypes.string,
};

export default Logo;
