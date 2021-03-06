import { useState } from 'react';
import { retrieveSuggestions } from '../../services/suggestion';
import { addFact } from '../../services/fact';

import Mic from './Mic';
import Suggestions from './Suggestions';
import LinearProgress from '@material-ui/core/LinearProgress';

import '../../styles/components/facts.scss';
import '../../styles/components/add-fact-form.scss';

const AddFactForm = ({
  overview,
  getTemplates,
  setOverview,
  adding_fact,
  setAddingFact,
  setLoading,
}) => {
  const [micOn, setMic] = useState(false);
  const [timer, setTimer] = useState();
  const [suggestions, setSuggestions] = useState();
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  const SpeechRecognition =
    window.speechRecognition || window.webkitSpeechRecognition;

  const handleChange = e => {
    clearTimeout(timer);

    const new_fact = {
      ...adding_fact.new_fact,
      [e.target.name]: e.target.value,
    };

    setAddingFact({
      ...adding_fact,
      new_fact,
    });

    setTimer(
      setTimeout(() => {
        setSuggestionsLoading(true);
        getSuggestions(new_fact['[UNLABELED]']);
      }, 600)
    );
  };

  const getSuggestions = async sentence => {
    try {
      setSuggestions(await retrieveSuggestions(sentence));

      setSuggestionsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setAddingFact(null);
      setLoading(true);

      const updated_overview = await addFact(overview, adding_fact);

      setOverview({
        ...updated_overview,
        current_explanation: overview.current_explanation,
      });

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const clearLabels = () => {
    setAddingFact({
      table_name: 'NO-TEMPLATE',
      new_fact: { '[UNLABELED]': '' },
    });
  };

  const unlabeled = () => {
    return adding_fact.table_name == 'NO-TEMPLATE';
  };

  const cancelEdit = e => {
    e.preventDefault();
    setAddingFact(null);
    setSuggestions(null);
  };

  return (
    <div className="add-fact-container">
      <div>
        <div className="add-fact-form">
          <div className="add-fact-form__header">
            You can also
            {unlabeled() ? (
              <button className="add-fact-form__button" onClick={getTemplates}>
                choose from a template
              </button>
            ) : (
              <button className="add-fact-form__button" onClick={clearLabels}>
                add one without a template
              </button>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            {adding_fact && (
              <div
                className={`fact edit${
                  adding_fact.table_name == 'NO-TEMPLATE' ? '--no-scroll' : ''
                }`}
              >
                {Object.entries(adding_fact.new_fact).map(([pos, text]) => {
                  if (pos != '[SKIP] UID') {
                    return (
                      <ul
                        className={`fact-part ${
                          adding_fact.table_name == 'NO-TEMPLATE'
                            ? 'full-width'
                            : ''
                        }`}
                      >
                        <li className="fact-part__column-name">{pos}</li>
                        <li className="text-with-mic">
                          <input
                            className={`fact-part__text fact-part__text${
                              pos.includes('[FILL')
                                ? '--fill'
                                : '' + adding_fact.table_name == 'NO-TEMPLATE'
                                ? ' full-width'
                                : ''
                            }`}
                            name={pos}
                            value={text}
                            onChange={handleChange}
                            autocomplete="off"
                          ></input>
                          {adding_fact.table_name == 'NO-TEMPLATE' &&
                            SpeechRecognition && (
                              <Mic
                                SpeechRecognition={SpeechRecognition}
                                setMic={setMic}
                                micOn={micOn}
                                handleChange={handleChange}
                              />
                            )}
                        </li>
                        <LinearProgress
                          className={`progress-bar${micOn ? '' : '--hidden'}`}
                        />
                      </ul>
                    );
                  }
                })}
              </div>
            )}

            <div
              className={`edit edit__button-container${
                adding_fact ? '' : '--hidden'
              }`}
            >
              <input
                type="submit"
                className="btn btn--save"
                value="Save"
              ></input>
              <button className="btn btn--cancel" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </form>
        </div>
        {adding_fact && adding_fact.table_name == 'NO-TEMPLATE' && (
          <Suggestions
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            setAddingFact={setAddingFact}
            overview={overview}
            setOverview={setOverview}
            loading={suggestionsLoading}
            setOverviewLoading={setLoading}
          />
        )}
      </div>
    </div>
  );
};

export default AddFactForm;
