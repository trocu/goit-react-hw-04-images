import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form
        className={css.form}
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          name='query'
          value={query}
          onChange={handleChange}
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
};

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
