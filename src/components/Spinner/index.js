import CircularProgress from '@material-ui/core/CircularProgress';

import '../../styles/components/spinner.scss';

const Spinner = ({ boxed }) => {
  return (
    <div className={`spinner${boxed ? '--boxed' : ''}`}>
      <CircularProgress />
    </div>
  );
};

export default Spinner;
