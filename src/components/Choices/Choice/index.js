import '../../../styles/components/choice.scss';

// A Choice component includes the letter (ie. A/B/C/D) and the sentence
const Choice = ({ letter, sentence, correct, overview, setOverview }) => {
  const handleClick = letter => {
    const explanation =
      letter == overview.answer ? 'explanation' : 'explanation' + letter;
    setOverview({ ...overview, current_explanation: explanation });
  };

  return (
    <div
      className={`choice choice--${
        letter == overview.answer ? 'correct' : 'incorrect'
      }`}
      onClick={() => handleClick(letter)}
    >
      <div className="choice__title">{letter}</div>
      <br />
      {sentence}
    </div>
  );
};

export default Choice;
