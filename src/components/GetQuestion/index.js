import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import SearchIcon from '@material-ui/icons/Search';

import '../../styles/components/get-question.scss';
import { useState } from 'react';

const GetQuestion = ({ getOverview }) => {
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState();

  const handleClick = () => {
    setShowForm(!showForm);
  };

  const onChange = e => {
    setQuestion(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    setShowForm(false);
    getOverview(question);
  };

  return (
    <div className="get-question">
      <SearchIcon
        fontSize="large"
        className="get-question__icon"
        alt="search icon"
        onClick={handleClick}
      />
      {showForm && (
        <FormControl className="get-question__form" variant="outlined">
          <InputLabel fullWidth>Enter the exact question</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={question}
            onChange={onChange}
            onSubmit={onSubmit}
            endAdornment={
              <InputAdornment
                onClick={onSubmit}
                className="get-question__button"
              >
                Submit
              </InputAdornment>
            }
            labelWidth={60}
          />
        </FormControl>
      )}
    </div>
  );
};

export default GetQuestion;
