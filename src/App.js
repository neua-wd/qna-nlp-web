import { useState } from 'react';
import axios from 'axios';

import Overview from './screens/Overview';
import Details from './screens/Details';
import ScreenSwitcher from './components/ScreenSwitcher';
import GetQuestionButton from './components/GetQuestionButton';
import EditFactForm from './components/EditFactForm';
import NewFactTemplates from './components/NewFactTemplates';
import AddFactButton from './components/AddFactButton';
import AddFactForm from './components/AddFactForm';

import './styles/app.scss';
import './styles/components/actions.scss';

function App() {
  const [screen, setScreen] = useState('overview');
  const [overview, setOverview] = useState();
  const [editing_fact, setEditingFact] = useState();
  const [adding_fact, setAddingFact] = useState();
  const [templates, setTemplates] = useState();

  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

  const getOverview = async question => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_QNA_NLP_API}/overview`,
        {
          params: { question },
        }
      );

      setOverview(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getTemplates = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_QNA_NLP_API}/templates`
      );

      setTemplates(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const switchScreen = () => {
    if (screen == 'overview') {
      setScreen('details');
    } else {
      setEditingFact(null);
      setScreen('overview');
    }
  };

  return (
    <div className="app">
      {overview && <ScreenSwitcher switchScreen={switchScreen} />}
      <div className="actions">
        <GetQuestionButton getOverview={getOverview} />
        <AddFactButton
          detailed={screen != 'overview'}
          getTemplates={getTemplates}
        />
      </div>
      {templates && (
        <NewFactTemplates
          templates={templates}
          setAddingFact={setAddingFact}
          setTemplates={setTemplates}
        />
      )}
      {screen == 'overview' ? (
        <Overview overview={overview} />
      ) : (
        <Details
          overview={overview}
          editing_fact={editing_fact}
          setEditingFact={setEditingFact}
          adding_fact={adding_fact}
          setAddingFact={setAddingFact}
          templates={templates}
          setTemplates={setTemplates}
          blurred={
            editing_fact != null || templates != null || adding_fact != null
          }
        />
      )}
      <EditFactForm
        overview={overview}
        setOverview={setOverview}
        editing_fact={editing_fact}
        setEditingFact={setEditingFact}
        adding_fact={adding_fact}
        setAddingFact={setAddingFact}
        getOverview={getOverview}
      />
      <AddFactForm
        overview={overview}
        setOverview={setOverview}
        adding_fact={adding_fact}
        setAddingFact={setAddingFact}
      />
    </div>
  );
}

export default App;
