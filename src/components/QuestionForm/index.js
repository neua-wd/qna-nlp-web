import { useState } from 'react';

import '../../styles/components/question-form.scss';

const QuestionForm = ({ getOverview }) => {
  const [question, setQuestion] = useState();

  const onChange = e => {
    setQuestion(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    getOverview(question);
  };

  return (
    <form onSubmit={onSubmit} className="question-form">
      <label className="question-form__label">
        <input
          className="question-form__input"
          type="text"
          name="question"
          value={question}
          onChange={onChange}
          required
        ></input>
      </label>
      <input type="submit" value="Submit" className="question-form__button" />
    </form>
  );
};

export default QuestionForm;
