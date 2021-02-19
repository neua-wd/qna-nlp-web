import '../../styles/components/explanation.scss';

const Explanation = ({ explanation }) => {
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
      sentence += fact[pos] + ' ';
    }
    console.log(sentence);

    return sentence;
  };

  return (
    <div className="explanation">
      <div className="explanation__title">Explanation</div>
      {explanation?.map((fact, index) => {
        return <div key={index}>{index + 1 + '. ' + toSentence(fact)}</div>;
      })}
    </div>
  );
};

export default Explanation;
