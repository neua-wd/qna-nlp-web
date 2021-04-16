import Question from '../../components/Question';
import Facts from '../../components/Facts';
import Spinner from '../../components/Spinner';

import '../../styles/screens/details.scss';

const Details = ({
  clearComponents,
  overview,
  setEditingFact,
  toggleInference,
  loading,
  blurred,
}) => {
  return (
    <div
      className={`details ${blurred ? 'details--blur' : ''}`}
      onClick={clearComponents}
    >
      {overview && (
        <Facts
          hypothesis={overview.answer}
          facts={overview.categorized_explanation}
          setEditingFact={setEditingFact}
          toggleInference={toggleInference}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Details;
