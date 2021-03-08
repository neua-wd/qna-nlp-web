import Question from '../../components/Question';
import Choices from '../../components/Choices';
import Explanation from '../../components/Explanation';
import Spinner from '../../components/Spinner';

import '../../styles/screens/overview.scss';

// The Overview screen contains the overview of a particular question
// Includes the question the choices and the explanation
const Overview = ({
  overview,
  setOverview,
  getTemplates,
  adding_fact,
  setAddingFact,
  templates,
  setTemplates,
  loading,
  blurred,
}) => {
  const handleClick = () => {
    if (templates) setTemplates(null);
    if (adding_fact) setAddingFact(null);
  };

  return (
    <div
      className={`overview${blurred ? '--blurred' : ''}`}
      onClick={handleClick}
    >
      {loading ? (
        <Spinner />
      ) : (
        overview && (
          <div>
            <Question question={overview.question} />
            <Choices overview={overview} setOverview={setOverview} />
            <Explanation
              explanation={overview[overview.current_explanation]}
              correct={overview.current_explanation == 'explanation'}
              getTemplates={getTemplates}
              setAddingFact={setAddingFact}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Overview;
