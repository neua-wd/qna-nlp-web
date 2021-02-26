import '../../../styles/components/choice.scss';

// A Choice component includes the letter (ie. A/B/C/D) and the sentence
const Choice = ({ letter, sentence, correct }) => {
  return (
    <div className={`choice choice--${correct ? 'correct' : 'incorrect'}`}>
      <div className="choice__title">{letter}</div>
      <br />
      {sentence}
    </div>
  );
};

export default Choice;
