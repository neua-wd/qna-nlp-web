import axios from 'axios';

import '../../styles/components/facts.scss';
import '../../styles/components/add-fact-form.scss';

const AddFactForm = ({
  overview,
  getTemplates,
  setOverview,
  adding_fact,
  setAddingFact,
  setSuggestions,
  setLoading,
}) => {
  const handleChange = e => {
    const new_fact = {
      ...adding_fact.new_fact,
      [e.target.name]: e.target.value,
    };

    setAddingFact({
      ...adding_fact,
      new_fact,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setAddingFact(null);
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_QNA_NLP_API}/fact`,
        {
          table_name: adding_fact.table_name,
          to_question: overview.question_id,
          explanation: overview.current_explanation,
          new_fact: adding_fact.new_fact,
        }
      );

      setOverview({
        ...res.data,
        current_explanation: overview.current_explanation,
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const cancelEdit = e => {
    e.preventDefault();
    setAddingFact(null);
  };

  const showSuggestions = async () => {
    setAddingFact(null);
    setLoading(true);

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_QNA_NLP_API}/suggestions`
      );

      setSuggestions(res.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`add-fact-form-container${adding_fact ? '' : '--hidden'}`}>
      <div className="add-fact-form">
        <div className="add-fact-form__header">
          You can also
          <button className="add-fact-form__button" onClick={getTemplates}>
            choose from a template
          </button>
          &nbsp;or
          <button className="add-fact-form__button" onClick={showSuggestions}>
            see suggestions
          </button>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="fact edit">
            {adding_fact &&
              Object.entries(adding_fact.new_fact).map(([pos, text]) => {
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
                      <li>
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
                      </li>
                    </ul>
                  );
                }
              })}
          </div>
          <div
            className={`edit edit__button-container${
              adding_fact ? '' : '--hidden'
            }`}
          >
            <input type="submit" className="btn btn--save" value="Save"></input>
            <button className="btn btn--cancel" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFactForm;
