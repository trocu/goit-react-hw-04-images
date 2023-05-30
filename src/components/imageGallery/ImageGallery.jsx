import React from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';

export const ImageGallery = () => {
  return (
    <ul className={css.gallery}>
      <ImageGalleryItem />
    </ul>
  );
};
