import AddFactButton from '../Actions/AddFactButton';

import '../../styles/components/explanation.scss';

const Explanation = ({ explanation, correct, getTemplates, setAddingFact }) => {
  // takes fact as an object. eg:
  //  {
  //    "ACTOR/WHO": "moving",
  //    "VERB": "changes",
  //    "WHAT": "position"
  //  }
  // and returns a string eg "moving changes position"
  const toSentence = fact => {
    let sentence = '';
    for (const column_name in fact) {
      if (!column_name.includes('[SKIP]')) sentence += fact[column_name] + ' ';
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
      <AddFactButton
        disabled={false}
        getTemplates={getTemplates}
        setAddingFact={setAddingFact}
        inExplanation={true}
      />
    </div>
  );
};

export default Explanation;
