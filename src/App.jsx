import { Component } from 'react';
// import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import fetchPictures from './utils/fetchPictures';
import Searchbar from './components/searchbar/Searchbar';
import { ImageGallery } from './components/imageGallery/ImageGallery';
import { Button } from './components/button/Button';
import Modal from './components/modal/Modal';

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
    page: 1,
    isLoading: false,
    error: null,
    totalHits: 0,
    hitsCounter: 0,
    isVisible: false,
    picture: '',
    alt: '',
  };

  async componentDidMount() {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    try {
      const pictures = await fetchPictures.restApi(query, page);
      this.setState({
        gallery: pictures.hits,
        totalHits: pictures.totalHits,
        hitsCounter: pictures.hits.length,
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      console.log('componentDidUpdate query: ', this.state.query);
      this.handleQuery();
    }
    if (prevState.query === this.state.query && prevState.page !== this.state.page) {
      console.log('componentDidUpdate PAGE: ', this.state.page);
      this.handleLoadMoreFetch();
    }
    // console.log('Component update: ', this.state);
  }

  handleSubmit = query => {
    // const { query } = this.state;
    this.setState({ query, page: 1 });
    console.log('App hadleSubmit query: ', query);
    console.log('App handleSubmit state: ', this.state);
  };

  handleQuery = async () => {
    const { query, page } = this.state;
    // console.log('Handle query: ', this.state);
    // console.log('Handle query: ', query);
    this.setState({ isLoading: true });
    const pictures = await fetchPictures.restApi(query, page);

    this.setState({
      gallery: pictures.hits,
      isLoading: false,
      totalHits: pictures.totalHits,
      hitsCounter: pictures.hits.length,
    });
    // console.log('typeOf: ', typeof pictures);
    // console.log('handleQuery: ', gallery);
  };

  handleLoadMoreFetch = async () => {
    const { query, page } = this.state;
    // console.log('Handle query: ', this.state);
    // console.log('Handle query: ', query);
    this.setState({ isLoading: true });
    const pictures = await fetchPictures.restApi(query, page);
    console.log('TEST: ', pictures);
    this.setState(prevState => ({
      gallery: [...prevState.gallery, ...pictures.hits],
      isLoading: false,
      hitsCounter: prevState.hitsCounter + pictures.hits.length,
    }));
  };

  handleLoadMore = () => {
    // e.preventDefault();
    // console.log(e.target);
    this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log('PAGE: ', this.state.page);
  };

  showModal = (picture, alt) => {
    this.setState({ isVisible: true, picture, alt });
    console.log('SHOW MODAL: ', picture, alt);
  };

  closeModal = () => {
    this.setState({ isVisible: false });
  };

  render() {
    // console.log('Render state: ', this.state);
    console.log('Render state PAGE: ', this.state.page);
    console.log('Render state query: ', this.state.query);
    console.log('Render state gallery: ', this.state.gallery);
    const { isLoading, gallery, error, totalHits, hitsCounter, isVisible, picture, alt } =
      this.state;
    // let loadMoreButton = null;
    // if (gallery.length === 0) {
    //   return null;
    // } else if (totalHits > hitsCounter) {
    //   loadMoreButton = <Button loadMore={this.handleLoadMore} />;
    // }
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && (
          <RotatingLines
            strokeColor='grey'
            strokeWidth='5'
            animationDuration='0.75'
            width='96'
            visible={true}
          />
        )}
        {gallery.length > 0 && (
          <ImageGallery
            gallery={gallery}
            callback={this.showModal}
          />
        )}
        {gallery.length > 0 && totalHits > hitsCounter && <Button loadMore={this.handleLoadMore} />}
        {/* <div>{loadMoreButton}</div> */}
        {/* <button
          type='button'
          onClick={this.showModal}
        >
          Show Modal
        </button> */}
        <Modal
          onClick={this.closeModal}
          isVisible={isVisible}
          picture={picture}
          alt={alt}
        />
      </>
    );
  }
}

/*
Do poprawy zmiana page przy nowym query. 
W tej chwili najpierw wysyla zapytanie o page 2, 
a pozniej o page 1, ale wrzuca galerie z page 2
*/
