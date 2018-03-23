import { defaultImage } from '../constants/collectives';
import { imagePreview, getDomain } from '../lib/utils';

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
  style.maxHeight = style.height || height;
>>>>>>> 195a932... added goals
  if (!src && website && type==='ORGANIZATION') {
>>>>>>> a788972... new test for /create and /apply, accept ToS
    src = `https://logo.clearbit.com/${getDomain(website)}`;
  }
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
  if (!src) {
    backgroundStyle.backgroundImage = `url(${defaultImage[type]})`
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
}