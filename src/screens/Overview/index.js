import { useEffect, useState } from 'react';

import Question from '../../components/Question';
import Choices from '../../components/Choices';
import Explanation from '../../components/Explanation';

import '../../styles/screens/overview.scss';

// The Overview screen contains the overview of a particular question
// Includes the question the choices and the explanation
const Overview = ({ overview }) => {
  return (
    <div className="overview">
      {overview && (
        <div>
          <Question question={overview.question} />
          <Choices choices={overview.choices} answer={overview.answer} />
          <Explanation explanation={overview.explanation} />
        </div>
      )}
    </div>
  );
};

export default Overview;
