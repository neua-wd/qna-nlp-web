import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';

import '../../../styles/components/actions.scss';

const BackButton = ({ switchScreen }) => {
  return (
    <div className="go-back" onClick={switchScreen}>
      <IconButton>
        <ArrowBackIosTwoToneIcon />
        <span className="go-back__text">Go Back</span>
      </IconButton>
    </div>
  );
};

export default BackButton;
