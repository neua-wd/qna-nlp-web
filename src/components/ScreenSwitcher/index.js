import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import '../../styles/components/screen-switcher.scss';

const ScreenSwitcher = ({ switchScreen }) => {
  return (
    <FormControlLabel
      className="screen-switcher"
      control={<Switch color="primary" />}
      label="Detailed"
      onChange={switchScreen}
    />
  );
};

export default ScreenSwitcher;
