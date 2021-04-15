import { useState } from 'react';
import axios from 'axios';

import { Slide } from '@material-ui/core';

import '../../../styles/components/choice.scss';

// A Choice component includes the letter (ie. A/B/C/D) and the sentence
const Choice = ({
  letter,
  sentence,
  overview,
  setOverview,
  setBodyLoading,
}) => {
  const [mouseOver, setMouseOver] = useState();

  const handleClick = letter => {
    const explanation =
      letter == overview.answer ? 'explanation' : 'incorrect' + letter;
    setOverview({ ...overview, current_explanation: explanation });
  };

  const changeAnswer = async letter => {
    if (letter == overview.answer) return;

    setBodyLoading(true);

    const res = await axios.patch(
      `${process.env.REACT_APP_QNA_NLP_API}/overview`,
      {
        update_type: 'answer',
        question_id: overview.question_id,
        new_answer: letter,
      }
    );

    const updated_overview = res.data;
    updated_overview.current_explanation = 'explanation';

    setOverview(updated_overview);
    setBodyLoading(false);
  };

  const selected = letter => {
    if (letter == overview.answer) {
      return overview.current_explanation == 'explanation';
    }

    return overview.current_explanation == 'incorrect' + letter;
  };

  return (
    <div
      className="choice-container"
      onMouseEnter={() => setMouseOver(letter)}
      onMouseLeave={() => setMouseOver(null)}
    >
      <Slide direction="up" in={mouseOver}>
        <div
          className={`mark-as-correct ${
            letter == overview.answer ? 'mark-as-correct--hidden' : ''
          }`}
          onClick={() => changeAnswer(letter)}
        >
          Mark as correct
        </div>
      </Slide>

      <div
        className={`choice choice--${
          letter == overview.answer ? 'correct' : 'incorrect'
        } choice${selected(letter) ? '--selected' : ''}`}
        onClick={() => handleClick(letter)}
      >
        <div className="choice__title">{letter}</div>
        <br />
        {sentence}
      </div>
    </div>
  );
};

export default Choice;
