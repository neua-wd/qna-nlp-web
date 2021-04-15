import Question from '../../components/Question';
import Facts from '../../components/Facts';
import Spinner from '../../components/Spinner';

import '../../styles/screens/details.scss';

const Details = ({
  clearComponents,
  overview,
  setEditingFact,
  switchScreen,
  loading,
  blurred,
}) => {
  return (
    <div
      className={`details ${blurred ? 'details--blur' : ''}`}
      onClick={clearComponents}
    >
      {overview &&
        (loading ? (
          <Spinner />
        ) : (
          <div>
            <Question question={overview.question} />
            <Facts
              hypothesis={overview.answer}
              facts={overview.categorized_explanation}
              setEditingFact={setEditingFact}
              switchScreen={switchScreen}
            />
          </div>
        ))}
    </div>
  );
};

export default Details;
