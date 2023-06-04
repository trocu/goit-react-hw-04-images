import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClickCallback }) => {
  const showModal = () => {
    onClickCallback(largeImageURL, tags);
  };

  return (
    <li
      className={css.galleryItem}
      onClick={showModal}
    >
      <img
        className={css.galleryImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
};
