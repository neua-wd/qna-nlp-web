import IconButton from '@material-ui/core/IconButton';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';

import '../../../styles/components/actions.scss';

const CloseButton = ({ switchScreen }) => {
  return (
    <div className="close" onClick={switchScreen}>
      <div className="close__icon">
        <IconButton>
          <CloseTwoToneIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CloseButton;
