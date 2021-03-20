import { useState } from 'react';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import IconButton from '@material-ui/core/IconButton';

import '../../../styles/components/actions.scss';

const AddFactButton = ({ setAddingFact, inExplanation }) => {
  const [showDesc, setShowDesc] = useState(false);

  const handleClick = () => {
    setAddingFact({
      table_name: 'NO-TEMPLATE',
      new_fact: { '[UNLABELED]': '' },
    });
  };

  return (
    <div className="add-fact-btn">
      <IconButton
        aria-label="Add a new fact"
        titleAccess="meaning"
        onClick={handleClick}
        onMouseEnter={() => setShowDesc(true)}
        onMouseLeave={() => setShowDesc(false)}
      >
        <AddCircleTwoToneIcon
          fontSize="large"
          className="add-fact"
          color="primary"
          aria-label="delete"
        />
      </IconButton>
      <div
        className={`description${showDesc ? '' : '--hidden'} ${
          inExplanation ? 'description--relative' : ''
        }`}
      >
        Add a new fact to the explanation
      </div>
    </div>
  );
};

export default AddFactButton;
