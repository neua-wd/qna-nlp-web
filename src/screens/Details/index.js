import Question from '../../components/Question';
import Facts from '../../components/Facts';

import '../../styles/screens/details.scss';

const Details = ({
  overview,
  editing_fact,
  setEditingFact,
  adding_fact,
  setAddingFact,
  templates,
  setTemplates,
  blurred,
}) => {
  const handleClick = () => {
    if (editing_fact) setEditingFact(null);
    if (templates) setTemplates(null);
    if (adding_fact) setAddingFact(null);
  };

  return (
    <div
      className={`details ${blurred ? 'details--blur' : ''}`}
      onClick={handleClick}
    >
      {overview && (
        <div className={`details ${blurred ? 'details--blur' : ''}`}>
          <Question question={overview.question} />
          <Facts
            facts={overview[overview.current_explanation]}
            setEditingFact={setEditingFact}
          />
        </div>
      )}
    </div>
  );
};

export default Details;
