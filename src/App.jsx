import { Component } from 'react';
import fetchPictures from './utils/fetchPictures';
import Searchbar from './components/searchbar/Searchbar';
import { ImageGallery } from './components/imageGallery/ImageGallery';
import { Button } from './components/button/Button';
import Modal from './components/modal/Modal';
import { Loader } from './components/loader/Loader';

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
      this.handleQuery();
    }
    if (prevState.query === this.state.query && prevState.page !== this.state.page) {
      this.handleLoadMoreFetch();
    }
  }

  handleSubmit = query => {
    this.setState({ query, gallery: [], page: 1 });
  };

  handleQuery = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    const pictures = await fetchPictures.restApi(query, page);

    this.setState({
      gallery: pictures.hits,
      isLoading: false,
      totalHits: pictures.totalHits,
      hitsCounter: pictures.hits.length,
    });
  };

  handleLoadMoreFetch = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    const pictures = await fetchPictures.restApi(query, page);
    this.setState(prevState => ({
      gallery: [...prevState.gallery, ...pictures.hits],
      isLoading: false,
      hitsCounter: prevState.hitsCounter + pictures.hits.length,
    }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  showModal = (picture, alt) => {
    this.setState({ isVisible: true, picture, alt });
  };

  closeModal = () => {
    this.setState({ isVisible: false });
  };

  render() {
    const { isLoading, gallery, error, totalHits, hitsCounter, isVisible, picture, alt } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <Loader />}
        {gallery.length > 0 && (
          <ImageGallery
            gallery={gallery}
            onClickCallback={this.showModal}
          />
        )}
        {gallery.length > 0 && totalHits > hitsCounter && <Button loadMore={this.handleLoadMore} />}
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
