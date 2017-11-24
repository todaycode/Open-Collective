import { defaultImage } from '../constants/collectives';
import { imagePreview } from '../lib/utils';

export default ({ src, style = {}, height }) => {
  style.height = style.height || height;
<<<<<<< HEAD
=======

>>>>>>> 003ca78... Connect Twitter/Github/Stripe
  const image = imagePreview(src, defaultImage.ORGANIZATION, { height: style.height });
  return (
    <img className="logo" src={image} style={style} />
  );
}