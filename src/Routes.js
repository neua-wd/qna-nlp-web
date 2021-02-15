import { Route } from react-router-dom;
import Overview from './screens/Overview'

const Routes = () => {
  return (
    <Route exact path="overview" component={Overview} />
  )
}

export default Routes
