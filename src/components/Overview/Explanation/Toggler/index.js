import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import '../../../../styles/components/toggler.scss';

const Toggler = ({ toggle }) => {
  return (
    <FormControlLabel
      className="toggler"
      control={<Switch color="primary" />}
      label="Detailed"
      onChange={toggle}
    />
  );
};

export default Toggler;
