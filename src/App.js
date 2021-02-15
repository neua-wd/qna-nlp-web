import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Overview from './screens/Overview';

function App() {
  return (
    <Router>
      <Overview />
    </Router>
  );
}

export default App;
