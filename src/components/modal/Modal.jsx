import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default class Modal extends Component {
  state = {
    isCaptionVisible: 'none',
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    this.timerID = setTimeout(() => {
      this.showCaption();
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timerID);
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  showCaption = () => {
    this.setState({ isCaptionVisible: 'block' });
  };

  handleKeyPress = e => {
    if (e.code === 'Escape') {
      this.closeModal();
    }
  };

  closeModal = () => {
    this.props.onClick();
    this.setState({ isCaptionVisible: 'none' });
  };

  render() {
    const { picture, alt } = this.props;
    const { isCaptionVisible } = this.state;
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
          <p
            className={css.caption}
            style={{ display: isCaptionVisible }}
          >
            {alt}
          </p>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  picture: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
