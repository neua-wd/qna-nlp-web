import '../../styles/components/question.scss';

const Question = ({ question }) => {
  return (
    <div className="question">
      <div className="question__title">Question</div>
      {': ' + question}
    </div>
  );
};

export default Question;
