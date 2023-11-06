import { Image } from './Image';
import { Video } from './Video';

export function Visual(props) {
  return props.type === 'video' ? (
    <Video src={props.src} />
  ) : (
    <Image src={props.src} title={props.title} />
  );
}
