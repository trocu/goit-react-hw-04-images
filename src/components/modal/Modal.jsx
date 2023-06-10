import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ onClick, picture, alt }) => {
  const [isCaptionVisible, setIsCaptionVisible] = useState('none');

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    const timerID = setTimeout(() => {
      showCaption();
    }, 1000);
    return () => {
      clearTimeout(timerID);
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  const showCaption = () => {
    setIsCaptionVisible('block');
  };

  const handleKeyPress = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const closeModal = () => {
    onClick();
    setIsCaptionVisible('none');
  };

  return (
    <div
      className={css.overlay}
      onClick={closeModal}
    >
      <div className={css.modal}>
        <img
          className={css.picture}
          src={picture}
          alt={alt}
        />
        <p
          className={css.caption}
          style={{ display: isCaptionVisible }}
        >
          {alt}
        </p>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  picture: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
