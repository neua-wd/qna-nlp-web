import '../../../styles/components/choice.scss';

// A Choice component includes the letter (ie. A/B/C/D) and the sentence
const Choice = ({ letter, sentence, overview, setOverview }) => {
  const handleClick = letter => {
    const explanation =
      letter == overview.answer ? 'explanation' : 'incorrect' + letter;
    setOverview({ ...overview, current_explanation: explanation });
  };

  const selected = letter => {
    if (letter == overview.answer) {
      return overview.current_explanation == 'explanation';
    }

    return overview.current_explanation == 'incorrect' + letter;
  };

  return (
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
  );
};

export default Choice;
