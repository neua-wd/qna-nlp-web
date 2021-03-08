import Question from '../../components/Question';
import Facts from '../../components/Facts';
import Spinner from '../../components/Spinner';

import '../../styles/screens/details.scss';

const Details = ({
  clearComponents,
  overview,
  setEditingFact,
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
          <div className={`details ${blurred ? 'details--blur' : ''}`}>
            <Question question={overview.question} />
            <Facts
              facts={overview[overview.current_explanation]}
              setEditingFact={setEditingFact}
            />
          </div>
        ))}
    </div>
  );
};

export default Details;
