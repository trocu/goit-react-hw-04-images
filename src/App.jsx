import { Component } from 'react';
import { Searchbar } from './components/searchbar/Searchbar';
import { ImageGallery } from './components/imageGallery/ImageGallery';

export default class App extends Component {
  render() {
    return (
      <>
        <Searchbar />
        <ImageGallery />
      </>
    );
  }
}
