import axios from 'axios';

export const retrieveSuggestions = async sentence => {
  const res = await axios.get(
    `${process.env.REACT_APP_QNA_NLP_API}/suggestions`,
    { params: { sentence } }
  );

  return res.data;
};
