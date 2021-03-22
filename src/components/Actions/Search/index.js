import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import '../../../styles/components/actions.scss';
import { useState } from 'react';

const Search = ({ getOverview, withForm, withDesc }) => {
  const [showForm, setShowForm] = useState(withForm);
  const [showDesc, setShowDesc] = useState(false);
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
      <div className="get-question">
        <IconButton
          onMouseEnter={() => setShowDesc(true)}
          onMouseLeave={() => setShowDesc(false)}
        >
          <SearchIcon
            fontSize="large"
            className="get-question__icon"
            color="primary"
            alt="search icon"
            onClick={handleClick}
          />
        </IconButton>
        {showForm && (
          <form onSubmit={onSubmit}>
            <FormControl
              className="get-question__form"
              variant="outlined"
              onSubmit={onSubmit}
            >
              <InputLabel>Enter the exact question</InputLabel>
              <OutlinedInput
                id="outlined-adornment"
                value={question}
                onChange={onChange}
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
          </form>
        )}
      </div>
      <div className={`description${showDesc && withDesc ? '' : '--hidden'}`}>
        Search
      </div>
    </div>
  );
};

export default Search;
