import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import '../../styles/components/screen-switcher.scss';

const Toggler = ({ toggle, inBox }) => {
  return (
    <FormControlLabel
      className={`screen-switcher ${inBox ? 'screen-switcher--in-box' : ''}`}
      control={<Switch color="primary" />}
      label="Detailed"
      onChange={toggle}
    />
  );
};

export default Toggler;
