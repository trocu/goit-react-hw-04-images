import { useEffect, useRef, useState } from 'react';
import fetchPictures from './utils/fetchPictures';
import { Searchbar } from './components/searchbar/Searchbar';
import { ImageGallery } from './components/imageGallery/ImageGallery';
import { Button } from './components/button/Button';
import { Modal } from './components/modal/Modal';
import { Loader } from './components/loader/Loader';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [hitsCounter, setHitsCounter] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [picture, setPicture] = useState('');
  const [alt, setAlt] = useState('');

  const handleSubmit = query => {
    setQuery(query);
    setGallery([]);
    setPage(1);
    shouldFetchData.current = true;
  };

  const picturesRef = useRef(null);
  const shouldFetchData = useRef(false);

  useEffect(() => {
    const handleQuery = async () => {
      setIsLoading(true);
      try {
        const pictures = await fetchPictures.restApi(query, page);
        picturesRef.current = pictures;
        const { hits, totalHits } = picturesRef.current;
        setGallery(hits);
        setTotalHits(totalHits);
        setHitsCounter(hits.length);
        shouldFetchData.current = false;
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (shouldFetchData.current && query.length > 0) {
      handleQuery();
    }
  }, [query, page, shouldFetchData]);

  const loadMoreRef = useRef(null);
  const shouldLoadMore = useRef(false);

  useEffect(() => {
    const handleLoadMoreFetch = async () => {
      setIsLoading(true);
      const pictures = await fetchPictures.restApi(query, page);
      loadMoreRef.current = pictures;
      const { hits } = loadMoreRef.current;
      setGallery([...gallery, ...hits]);
      setIsLoading(false);
      setHitsCounter(hitsCounter + hits.length);
      shouldLoadMore.current = false;
    };
    if (shouldLoadMore.current) {
      handleLoadMoreFetch();
    }
  }, [gallery, hitsCounter, query, page, shouldLoadMore]);

  const handleLoadMore = () => {
    setPage(page + 1);
    shouldLoadMore.current = true;
  };

  const showModal = (picture, alt) => {
    setIsModalVisible(true);
    setPicture(picture);
    setAlt(alt);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {gallery.length > 0 && (
        <ImageGallery
          gallery={gallery}
          onClickCallback={showModal}
        />
      )}
      {isLoading && <Loader />}
      {gallery.length > 0 && totalHits > hitsCounter && <Button loadMore={handleLoadMore} />}
      {isModalVisible && (
        <Modal
          onClick={closeModal}
          picture={picture}
          alt={alt}
        />
      )}
    </>
  );
};
