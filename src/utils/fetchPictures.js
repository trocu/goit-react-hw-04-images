import axios from 'axios';

const restApi = async (query, page) => {
  const axiosParams = {
    method: 'get',
    baseURL: 'https://pixabay.com/api/',
    params: {
      key: '23189800-058574acc8566088f091aab47',
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: '12',
      page: `${page}`,
    },
  };
  console.log('fetchPictures PAGE: ', page);
  const response = await axios(axiosParams);
  return response.data;
};

const fetchPictures = { restApi };
export default fetchPictures;
