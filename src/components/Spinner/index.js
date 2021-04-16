import CircularProgress from '@material-ui/core/CircularProgress';

import '../../styles/components/spinner.scss';

const Spinner = ({ boxed }) => {
  return (
    <div className={`spinner ${boxed ? 'spinner--boxed' : ''}`}>
      <div className="spinner__icon">
        <CircularProgress />
      </div>
    </div>
  );
};

export default Spinner;
