import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CasinoTwoToneIcon from '@material-ui/icons/CasinoTwoTone';
import AddFactButton from './AddFactButton';
import Search from './Search';

import '../../styles/components/actions.scss';
import { useState } from 'react';

const Actions = ({ getOverview, hide_add_fact, setAddingFact }) => {
  return (
    <div className="get-question">
      <Search getOverview={getOverview} withForm={false} />
      <IconButton color="primary" onClick={() => getOverview()}>
        <CasinoTwoToneIcon fontSize="large" />
      </IconButton>
      <AddFactButton hidden={hide_add_fact} setAddingFact={setAddingFact} />
    </div>
  );
};

export default Actions;
