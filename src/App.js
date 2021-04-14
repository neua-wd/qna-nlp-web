import { useState } from 'react';
import axios from 'axios';

import Overview from './screens/Overview';
import Details from './screens/Details';
import ScreenSwitcher from './components/ScreenSwitcher';
import Actions from './components/Actions';
import EditFactForm from './components/EditFactForm';
import AddFactForm from './components/AddFactForm';
import NewFactTemplates from './components/NewFactTemplates';
import NoQuestionAlert from './components/NoQuestionAlert';

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
  const [showAlert, setShowAlert] = useState(false);

  if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

  const getOverview = async question => {
    setLoading(true);
    let res = { data: {} };

    try {
      if (question) {
        res = await axios.get(`${process.env.REACT_APP_QNA_NLP_API}/overview`, {
          params: { question },
        });
      } else {
        res = await axios.get(`${process.env.REACT_APP_QNA_NLP_API}/overview`);
      }

      if (res.data.error && res.data.error[0] == 'Question does not exist') {
        setShowAlert(true);
      } else {
        const data = res.data;
        data.current_explanation = 'explanation';

        setOverview(data);
      }

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
      {overview && <ScreenSwitcher toggle={switchScreen} />}
      {overview && (
        <Actions
          getOverview={getOverview}
          hide_add_fact={screen == 'overview'}
          setAddingFact={setAddingFact}
        />
      )}
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
      {screen == 'overview' ? (
        <Overview
          clearComponents={clearComponents}
          overview={overview}
          getOverview={getOverview}
          setOverview={setOverview}
          getTemplates={getTemplates}
          setAddingFact={setAddingFact}
          setEditingFact={setEditingFact}
          switchScreen={switchScreen}
          loading={loading}
          blurred={adding_fact || editing_fact || templates || suggestions}
        />
      ) : (
        <Details
          clearComponents={clearComponents}
          overview={overview}
          setEditingFact={setEditingFact}
          loading={loading}
          blurred={adding_fact || editing_fact || templates || suggestions}
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
      <NoQuestionAlert showAlert={showAlert} setShowAlert={setShowAlert} />
    </div>
  );
}

export default App;
