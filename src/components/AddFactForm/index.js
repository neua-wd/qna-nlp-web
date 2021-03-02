import { Fragment } from 'react';
import axios from 'axios';

import '../../styles/components/facts.scss';

const AddFactForm = ({ overview, setOverview, adding_fact, setAddingFact }) => {
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
      setAddingFact(null);
    } catch (e) {
      console.log(e);
    }
  };

  const cancelEdit = e => {
    e.preventDefault();
    setAddingFact(null);
  };

  return (
    <Fragment>
      <form className="form" onSubmit={handleSubmit}>
        <div className={`fact edit${adding_fact ? '' : '--hidden'}`}>
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
    </Fragment>
  );
};

export default AddFactForm;
