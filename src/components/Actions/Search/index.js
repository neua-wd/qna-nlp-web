import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import '../../../styles/components/actions.scss';
import { useState } from 'react';

const Search = ({ getOverview, withForm }) => {
  const [showForm, setShowForm] = useState(withForm);
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
    <div>
      <IconButton>
        <SearchIcon
          fontSize="large"
          className="get-question__icon"
          color="primary"
          alt="search icon"
          onClick={handleClick}
        />
      </IconButton>
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

export default Search;
