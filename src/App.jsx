import { Component } from 'react';
// import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import fetchPictures from './utils/fetchPictures';
import Searchbar from './components/searchbar/Searchbar';
import { ImageGallery } from './components/imageGallery/ImageGallery';
import { Button } from './components/button/Button';

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
    if (prevState.page !== this.state.page) {
      console.log('componentDidUpdate PAGE: ', this.state.page);
      this.handleLoadMoreFetch();
    }
    // console.log('Component update: ', this.state);
  }

  handleSubmit = query => {
    // const { query } = this.state;
    this.setState({ query });
    console.log('App hadleSubmit query: ', query);
    console.log('App handleSubmit state: ', this.state);
    this.handleQuery();
  };

  handleQuery = async () => {
    const { query, page } = this.state;
    // console.log('Handle query: ', this.state);
    // console.log('Handle query: ', query);
    this.setState({ isLoading: true, page: 1 });
    const pictures = await fetchPictures.restApi(query, page);

    this.setState({
      gallery: pictures.hits,
      isLoading: false,
      totalHits: pictures.totalHits,
      hitsCounter: pictures.hits.length,
    });
    console.log('typeOf: ', typeof pictures);
    console.log('handleQuery: ', gallery);
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

  render() {
    // console.log('Render state: ', this.state);
    console.log('Render state PAGE: ', this.state.page);
    console.log('Render state query: ', this.state.query);
    console.log('Render state gallery: ', this.state.gallery);
    const { isLoading, gallery, error, totalHits, hitsCounter } = this.state;
    // let loadMoreButton = null;
    // if (gallery.length === 0) {
    //   return;
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
        {gallery.length > 0 && <ImageGallery gallery={gallery} />}
        {gallery.length > 0 && totalHits > hitsCounter && <Button loadMore={this.handleLoadMore} />}
        {/* <div>{loadMoreButton}</div> */}
      </>
    );
  }
}
