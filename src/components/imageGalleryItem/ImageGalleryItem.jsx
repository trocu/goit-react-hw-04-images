import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, callback }) => {
  const showModal = () => {
    // console.log({ largeImageURL });
    // const data = { largeImageURL };
    callback(largeImageURL, tags);
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
