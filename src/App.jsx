import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from './components/searchbar/Searchbar';
import { ImageGallery } from './components/imageGallery/ImageGallery';

const axiosParams = {
  method: 'get',
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '23189800-058574acc8566088f091aab47',
    q: `cats`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: `12`,
    page: `1`,
  },
};
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
  };

  async componentDidMount() {
    const response = await axios(axiosParams);
    this.setState({ gallery: response.data.hits });
  }

  render() {
    console.log('Render state: ', this.state);
    const { gallery } = this.state;
    return (
      <>
        <Searchbar />
        <ImageGallery gallery={gallery} />
      </>
    );
  }
}
