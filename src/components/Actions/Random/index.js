import IconButton from '@material-ui/core/IconButton';
import CasinoTwoToneIcon from '@material-ui/icons/CasinoTwoTone';

const Random = ({ getOverview }) => {
  return (
    <IconButton color="primary" onClick={() => getOverview()}>
      <CasinoTwoToneIcon fontSize="large" className="get-question__icon" />
    </IconButton>
  );
};

export default Random;
