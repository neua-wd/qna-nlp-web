import { useEffect, useState } from 'react';
import axios from 'axios';

import Question from '../../components/Question';
import Choices from '../../components/Choices';
import Explanation from '../../components/Explanation';

import '../../styles/screens/overview.scss';

// The Overview screen contains the overview of a particular question
// Includes the question the choices and the explanation
const Overview = props => {
  useEffect(() => {
    getOverview();
  }, []);

  const [overview, setOverview] = useState([]);

  const getOverview = async () => {
    const res = await axios.get('/overview/' + props.match.params.id);
    setOverview(res.data);
  };

  return (
    <div className="overview">
      <Question question={overview.question} />
      <Choices choices={overview.choices} answer={overview.answer} />
      <Explanation facts={overview.explanation} />
    </div>
  );
};

export default Overview;
