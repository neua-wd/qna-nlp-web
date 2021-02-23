import { useState } from 'react';
import axios from 'axios';

import Overview from './screens/Overview';
import Details from './screens/Details';
import ScreenSwitcher from './components/ScreenSwitcher';
import GetQuestion from './components/GetQuestion';

import './styles/app.scss';
import EditFact from './components/EditFact';

function App() {
  const [screen, setScreen] = useState('overview');
  const [overview, setOverview] = useState();
  const [editing_fact, setEditingFact] = useState();

  const getOverview = async question => {
    try {
      const res = await axios.get('/overview', { params: { question } });
      setOverview(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const switchScreen = () => {
    console.log(overview);
    if (screen == 'overview') {
      setScreen('details');
    } else {
      setEditingFact(null);
      setScreen('overview');
    }
  };

  return (
    <div className="app">
      <ScreenSwitcher switchScreen={switchScreen} />
      <GetQuestion getOverview={getOverview} />
      {screen == 'overview' ? (
        <Overview overview={overview} />
      ) : (
        <Details
          overview={overview}
          editing_fact={editing_fact}
          setEditingFact={setEditingFact}
          blurred={editing_fact != null}
        />
      )}
      <EditFact
        fact={editing_fact}
        overview={overview}
        setOverview={setOverview}
        setEditingFact={setEditingFact}
        getOverview={getOverview}
      />
    </div>
  );
}

export default App;
