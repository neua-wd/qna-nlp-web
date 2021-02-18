import { useEffect, useState } from 'react';
import axios from 'axios';

import Question from '../../components/Question';

const Details = () => {
  useEffect(() => {
    getDetails();
  }, []);

  const [details, setDetails] = useState([]);

  const getDetails = async () => {
    const res = await axios.get('/details');
    setDetails(res.data);
  };

  return <Question question={details.question} />;
};

export default Details;
