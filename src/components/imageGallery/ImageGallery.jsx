import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ gallery, callback }) => {
  return (
    <ul className={css.gallery}>
      {gallery.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          callback={callback}
        />
      ))}
    </ul>
  );
};
