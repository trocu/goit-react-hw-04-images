import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.code === 'Escape') {
      this.closeModal();
    }
  };

  closeModal = () => {
    this.props.onClick();
  };

  render() {
    const { isVisible, picture, alt } = this.props;
    if (!isVisible) {
      return null;
    }
    return (
      <div
        className={css.overlay}
        onClick={this.closeModal}
      >
        <div className={css.modal}>
          <img
            className={css.picture}
            src={picture}
            alt={alt}
          />
          <p className={css.caption}>{alt}</p>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  picture: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
