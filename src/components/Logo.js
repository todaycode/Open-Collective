import { defaultImage } from '../constants/collectives';
import { imagePreview } from '../lib/utils';

export default ({ src, style = {}, height, type = 'ORGANIZATION' }) => {
  style.height = style.height || height;
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 003ca78... Connect Twitter/Github/Stripe
  const image = imagePreview(src, defaultImage.ORGANIZATION, { height: style.height });
=======
  const image = imagePreview(src, defaultImage[type], { height: style.height });
>>>>>>> 9b02eb7... create organization on /organizations/new
  return (
    <img className="logo" src={image} style={style} />
  );
}