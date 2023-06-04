import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ query: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={css.searchbar}>
        <form
          className={css.form}
          onSubmit={this.handleSubmit}
        >
          <input
            type='text'
            name='query'
            value={query}
            onChange={this.handleChange}
            autoComplete='off'
            autoFocus
            placeholder='Search images and photos'
          />
          <button type='submit'>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: '#feffff' }}
            />
          </button>
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
