import { useState } from 'react';
import axios from 'axios';

import Overview from './screens/Overview';
import Details from './screens/Details';
import Actions from './components/Actions';
import EditFactForm from './components/EditFactForm';
import AddFactForm from './components/AddFactForm';
import NewFactTemplates from './components/NewFactTemplates';
import NoQuestionAlert from './components/NoQuestionAlert';

import './styles/app.scss';
import './styles/components/actions.scss';

function App() {
  const [showInference, setShowInference] = useState(false);
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

  const getOverview = async (question, clear_inference) => {
    setLoading(true);
    let res = { data: {} };

    try {
      if (clear_inference) {
        setShowInference(false);
      }

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

  const toggleInference = () => {
    setShowInference(!showInference);
  };

  const clearComponents = () => {
    if (adding_fact) setAddingFact(null);
    if (templates) setTemplates(null);
    if (suggestions) setSuggestions(null);
    if (editing_fact) setEditingFact(null);
  };

  return (
    <div className="app">
      {overview && (
        <Actions
          getOverview={getOverview}
          setAddingFact={setAddingFact}
          blurred={adding_fact || editing_fact || templates || suggestions}
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
      {showInference && (
        <Details
          clearComponents={clearComponents}
          overview={overview}
          setEditingFact={setEditingFact}
          toggleInference={toggleInference}
          loading={showInference && loading}
          blurred={adding_fact || editing_fact || templates || suggestions}
        />
      )}
      <Overview
        clearComponents={clearComponents}
        overview={overview}
        getOverview={getOverview}
        setOverview={setOverview}
        getTemplates={getTemplates}
        setAddingFact={setAddingFact}
        setEditingFact={setEditingFact}
        toggleInference={toggleInference}
        loading={!showInference && loading}
        blurred={
          adding_fact ||
          editing_fact ||
          templates ||
          suggestions ||
          showInference
        }
      />
      )
      {editing_fact && (
        <EditFactForm
          overview={overview}
          setOverview={setOverview}
          editing_fact={editing_fact}
          setEditingFact={setEditingFact}
          adding_fact={adding_fact}
          setAddingFact={setAddingFact}
          getOverview={getOverview}
          setLoading={setLoading}
        />
      )}
      {adding_fact && (
        <AddFactForm
          overview={overview}
          getTemplates={getTemplates}
          setOverview={setOverview}
          adding_fact={adding_fact}
          setAddingFact={setAddingFact}
          setSuggestions={setSuggestions}
          setLoading={setLoading}
        />
      )}
      <NoQuestionAlert showAlert={showAlert} setShowAlert={setShowAlert} />
    </div>
  );
}

export default App;
