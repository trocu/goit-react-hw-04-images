import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};
