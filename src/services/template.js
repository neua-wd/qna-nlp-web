import axios from 'axios';

export const retrieveTemplates = async () => {
  const res = await axios.get(`${process.env.REACT_APP_QNA_NLP_API}/templates`);

  return res.data;
};
