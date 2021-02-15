import { Route, BrowserRouter as Router } from 'react-router-dom';
import Overview from './screens/Overview';
import Details from './screens/Details';

const Routes = () => {
  return (
    <Router>
      <Route exact path="/overview" component={Overview} />
      <Route exact path="/details" component={Details} />
    </Router>
  );
};

export default Routes;
