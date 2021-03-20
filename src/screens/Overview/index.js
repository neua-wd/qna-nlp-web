import Question from '../../components/Question';
import Choices from '../../components/Choices';
import Explanation from '../../components/Explanation';
import Spinner from '../../components/Spinner';

import '../../styles/screens/overview.scss';
import Instructions from '../../components/Instructions';

// The Overview screen contains the overview of a particular question
// Includes the question the choices and the explanation
const Overview = ({
  clearComponents,
  overview,
  getOverview,
  setOverview,
  loading,
  blurred,
}) => {
  console.log(overview);
  return (
    <div
      className={`overview${blurred ? '--blurred' : ''}`}
      onClick={clearComponents}
    >
      {loading ? (
        <Spinner />
      ) : overview ? (
        <div>
          <Question question={overview.question} />
          <Choices overview={overview} setOverview={setOverview} />
          <Explanation
            explanation={overview[overview.current_explanation]}
            correct={overview.current_explanation == 'explanation'}
            question_id={overview.question_id}
            current_explanation={overview.current_explanation}
            setOverview={setOverview}
          />
        </div>
      ) : (
        <Instructions getOverview={getOverview} />
      )}
    </div>
  );
};

export default Overview;
