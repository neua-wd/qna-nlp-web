import { useEffect, useState } from 'react';
import axios from 'axios';

import Question from '../../components/Question';
import Choices from '../../components/Choices';
import Explanation from '../../components/Explanation';
import QuestionForm from '../../components/QuestionForm';

import '../../styles/screens/overview.scss';

// The Overview screen contains the overview of a particular question
// Includes the question the choices and the explanation
const Overview = props => {
  // useEffect(() => {
  //   getOverview();
  // }, []);

  const [overview, setOverview] = useState();

  const getOverview = async question => {
    try {
      const res = await axios.get('/overview', { params: { question } });
      setOverview(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="overview">
      <QuestionForm getOverview={getOverview} />
      {overview && (
        <div>
          <Question question={overview.question} />
          <Choices choices={overview.choices} answer={overview.answer} />
          <Explanation facts={overview.explanation} />
        </div>
      )}
    </div>
  );
};

export default Overview;
