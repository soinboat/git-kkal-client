import axios from 'axios';

const fetchRepoData = async (repoUrl) => {
  const data = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/repository?repoUrl=${repoUrl}`,
  );

  return data;
};

export default fetchRepoData;
