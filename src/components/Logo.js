import { defaultImage } from '../constants/collectives';
import { imagePreview, getDomain } from '../lib/utils';

export default ({ src, style = {}, height, type = 'ORGANIZATION', website }) => {
  style.height = style.height || height;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 003ca78... Connect Twitter/Github/Stripe
  const image = imagePreview(src, defaultImage.ORGANIZATION, { height: style.height });
=======
=======
  if (!src && website) {
    src = `https://logo.clearbit.com/${getDomain(website)}`;
  }
>>>>>>> 2f8bcc9... using clearbit to deduce company logo
  const image = imagePreview(src, defaultImage[type], { height: style.height });
>>>>>>> 9b02eb7... create organization on /organizations/new
  return (
    <div className="Logo" style={{ width: height, height, backgroundImage: `url(${defaultImage[type]})` }}>
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