import { useState } from 'react';
import { Link } from 'react-router-dom';

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
      if (pos != '[SKIP] UID') sentence += fact[pos] + ' ';
    }

    return sentence;
  };

  return (
    <div className="explanation">
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
    </div>
  );
};

export default Explanation;
