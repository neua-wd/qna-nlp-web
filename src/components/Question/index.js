import '../../styles/components/question.scss';

const Question = ({ question }) => {
  return (
    <div className="question">
      <div className="question__box">
        <div className="question__title">Question</div>
        <div className="question__text">{': ' + question}</div>
      </div>
    </div>
  );
};

export default Question;
