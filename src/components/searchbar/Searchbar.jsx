import css from './Searchbar.module.css';

export const Searchbar = () => {
  return (
    <header className={css.searchbar}>
      <form className={css.form}>
        <button
          type='submit'
          className={css.button}
        >
          <span className={css.button_label}>Search</span>
        </button>

        <input
          className={css.input}
          type='text'
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
        />
      </form>
    </header>
  );
};
