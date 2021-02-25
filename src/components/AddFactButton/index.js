import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import IconButton from '@material-ui/core/IconButton';

import '../../styles/components/actions.scss';

const AddFactButton = ({ detailed, getTemplates }) => {
  return (
    <IconButton
      aria-label="Add a new fact"
      titleAccess="meaning"
      disabled={detailed ? false : true}
      onClick={getTemplates}
    >
      <AddCircleTwoToneIcon
        fontSize="large"
        className="add-fact"
        color={detailed ? 'primary' : 'disabled'}
        aria-label="delete"
        titleAccess="meaning"
      />
    </IconButton>
  );
};

export default AddFactButton;
