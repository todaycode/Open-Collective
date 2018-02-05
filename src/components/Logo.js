import { defaultImage } from '../constants/collectives';
import { imagePreview, getDomain } from '../lib/utils';

export default ({ src, style = {}, height, type = 'ORGANIZATION', website }) => {
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
  if (!src && website && type==='ORGANIZATION') {
>>>>>>> a788972... new test for /create and /apply, accept ToS
    src = `https://logo.clearbit.com/${getDomain(website)}`;
  }
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
  return (
    <div className="Logo" style={backgroundStyle}>
      <style jsx>{`
        .Logo {
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          overflow: hidden;
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