import '../../styles/components/explanation.scss';
import AddFactButton from '../AddFactButton';

const Explanation = ({ explanation, correct, getTemplates }) => {
  // takes fact as an object. eg:
  //  {
  //    "ACTOR/WHO": "moving",
  //    "VERB": "changes",
  //    "WHAT": "position"
  //  }
  // and returns a string eg "moving changes position"
  const toSentence = fact => {
    let sentence = '';
    for (const pos in fact) {
      if (pos != '[SKIP] UID') sentence += fact[pos] + ' ';
    }

    return sentence;
  };

  return (
    <div
      className={`explanation explanation--${
        correct ? 'correct' : 'incorrect'
      }`}
    >
      <div className="explanation__title">Explanation</div>
      {explanation?.map((fact, index) => {
        return (
          <div key={index}>
            {index + 1 + '. ' + toSentence(fact)}
            <br />
            <br />
          </div>
        );
      })}
      <AddFactButton disabled={false} getTemplates={getTemplates} />
    </div>
  );
};

export default Explanation;
