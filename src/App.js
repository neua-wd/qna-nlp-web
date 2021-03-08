import { useState } from 'react';
import axios from 'axios';

import Overview from './screens/Overview';
import Details from './screens/Details';
import ScreenSwitcher from './components/ScreenSwitcher';
import GetQuestionButton from './components/GetQuestionButton';
import EditFactForm from './components/EditFactForm';
import AddFactButton from './components/AddFactButton';
import AddFactForm from './components/AddFactForm';
import NewFactTemplates from './components/NewFactTemplates';
import Suggestions from './components/Suggestions';

import './styles/app.scss';
import './styles/components/actions.scss';

function App() {
  const [screen, setScreen] = useState('overview');
  const [overview, setOverview] = useState();
  const [editing_fact, setEditingFact] = useState();
  const [adding_fact, setAddingFact] = useState();
  const [suggestions, setSuggestions] = useState();
  const [templates, setTemplates] = useState();
  const [loading, setLoading] = useState(false);

  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

  const getOverview = async question => {
    setLoading(true);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_QNA_NLP_API}/overview`,
        {
          params: { question },
        }
      );

      const data = res.data;
      data.current_explanation = 'explanation';

      setOverview(data);

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getTemplates = async () => {
    setLoading(true);

    setAddingFact(null);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_QNA_NLP_API}/templates`
      );

      setTemplates(res.data);
      setLoading(false);
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

  const clearComponents = () => {
    if (adding_fact) setAddingFact(null);
    if (templates) setTemplates(null);
    if (suggestions) setSuggestions(null);
    if (editing_fact) setEditingFact(null);
  };

  return (
    <div className="app">
      {overview && <ScreenSwitcher switchScreen={switchScreen} />}
      <div className="actions">
        <GetQuestionButton getOverview={getOverview} />
        <AddFactButton
          hidden={screen == 'overview'}
          setAddingFact={setAddingFact}
        />
      </div>
      {templates && (
        <NewFactTemplates
          templates={templates}
          setAddingFact={setAddingFact}
          setTemplates={setTemplates}
          overview={overview}
          setOverview={setOverview}
          adding_fact={adding_fact}
          setLoading={setLoading}
        />
      )}
      {suggestions && (
        <Suggestions
          suggestions={suggestions}
          setAddingFact={setAddingFact}
          setSuggestions={setSuggestions}
        />
      )}
      {screen == 'overview' ? (
        <Overview
          clearComponents={clearComponents}
          overview={overview}
          setOverview={setOverview}
          getTemplates={getTemplates}
          setAddingFact={setAddingFact}
          loading={loading}
          blurred={templates != null || adding_fact != null}
        />
      ) : (
        <Details
          clearComponents={clearComponents}
          overview={overview}
          setEditingFact={setEditingFact}
          loading={loading}
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
        getTemplates={getTemplates}
        setOverview={setOverview}
        adding_fact={adding_fact}
        setAddingFact={setAddingFact}
        setSuggestions={setSuggestions}
        setLoading={setLoading}
      />
    </div>
  );
}

export default App;
