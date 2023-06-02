import { Component } from 'react';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    // console.log('Change value: ', value);
    this.setState({ query: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    // console.log('Searchbar handleSubmit query: ', query);
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
          <button
            type='submit'
            className={css.button}
          >
            <span className={css.button_label}>Search</span>
          </button>

          <input
            className={css.input}
            type='text'
            name='query'
            value={query}
            onChange={this.handleChange}
            autoComplete='off'
            autoFocus
            placeholder='Search images and photos'
          />
        </form>
      </header>
    );
  }
}
