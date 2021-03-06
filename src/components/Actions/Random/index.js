import IconButton from '@material-ui/core/IconButton';
import CasinoTwoToneIcon from '@material-ui/icons/CasinoTwoTone';

import { useState } from 'react';

const Random = ({ getOverview, withDesc }) => {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div>
      <IconButton
        color="primary"
        onClick={() => getOverview(null, true)}
        onMouseEnter={() => setShowDesc(true)}
        onMouseLeave={() => setShowDesc(false)}
      >
        <CasinoTwoToneIcon fontSize="large" className="get-question__icon" />
      </IconButton>
      <div className={`description${showDesc && withDesc ? '' : '--hidden'}`}>
        Get a random question
      </div>
    </div>
  );
};

export default Random;
