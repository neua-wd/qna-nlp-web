import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import IconButton from '@material-ui/core/IconButton';

import '../../styles/components/actions.scss';

const AddFactButton = ({ hidden, getTemplates }) => {
  return (
    <IconButton
      aria-label="Add a new fact"
      titleAccess="meaning"
      style={hidden ? { display: 'none' } : {}}
      onClick={getTemplates}
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
