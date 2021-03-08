import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import IconButton from '@material-ui/core/IconButton';

import '../../styles/components/actions.scss';

const AddFactButton = ({ hidden, setAddingFact }) => {
  const handleClick = () => {
    setAddingFact({
      table_name: 'NO-TEMPLATE',
      new_fact: { '[UNLABELED]': '' },
    });
  };

  return (
    <IconButton
      aria-label="Add a new fact"
      titleAccess="meaning"
      style={hidden ? { display: 'none' } : {}}
      onClick={handleClick}
    >
      <AddCircleTwoToneIcon
        fontSize="large"
        className="add-fact"
        color="primary"
        aria-label="delete"
        titleAccess="meaning"
      />
    </IconButton>
  );
};

export default AddFactButton;
