import { Component } from 'react';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import Searchbar from './components/searchbar/Searchbar';
import { ImageGallery } from './components/imageGallery/ImageGallery';

// axios.defaults.baseURL = 'https://pixabay.com/api/';

// const axiosParams = {
//   method: 'get',
//   baseURL: 'https://pixabay.com/api/',
//   params: {
//     key: '23189800-058574acc8566088f091aab47',
//     q: `${query}`,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     per_page: `${perPage}`,
//     page: `${page}`,
//   },
// };

export default class App extends Component {
  state = {
    gallery: [],
    query: '',
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '23189800-058574acc8566088f091aab47',
        q: `cats`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: `12`,
        page: `1`,
      },
    });
    this.setState({ gallery: response.data.hits, isLoading: false });
  }

  componentDidUpdate(prevState) {
    if (prevState.query !== this.query) {
      console.log('Component update: ', this.state);
      this.handleQuery();
    }
  }

  handleSubmit = query => {
    // const { query } = this.state;
    console.log('App query: ', query);
    this.setState({ query: query });
    this.handleQuery();
  };

  async handleQuery() {
    const { query } = this.state;
    console.log('Handle query: ', this.state);
    console.log('Handle query: ', query);
    this.setState({ isLoading: true });
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '23189800-058574acc8566088f091aab47',
        q: `${query}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: `12`,
        page: `1`,
      },
    });
    this.setState({ gallery: response.data.hits, isLoading: false });
  }

  render() {
    console.log('Render state: ', this.state);
    const { isLoading, gallery } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading ? (
          <RotatingLines
            strokeColor='grey'
            strokeWidth='5'
            animationDuration='0.75'
            width='96'
            visible={true}
          />
        ) : (
          <ImageGallery gallery={gallery} />
        )}
      </>
    );
  }
}
