import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

const fetchRepoData = async (repoUrl) => {
  const res = await axiosInstance.get(`/repository?repoUrl=${repoUrl}`);

  return res.data;
};

export default fetchRepoData;
