import { Fragment } from 'react';
import axios from 'axios';

import '../../styles/components/facts.scss';

const EditFactForm = ({
  overview,
  setOverview,
  editing_fact,
  setEditingFact,
  getOverview,
}) => {
  const handleChange = e => {
    setEditingFact({ ...editing_fact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const to_submit = editing_fact;
      setEditingFact(null);
      await apiUpdateFact(to_submit);

      await getOverview(overview.question);
    } catch (e) {
      setOverview(overview);
      console.log(e);
    }
  };

  const apiUpdateFact = async editing_fact => {
    try {
      await axios.put(`${process.env.REACT_APP_QNA_NLP_API}/fact`, {
        edited_fact: editing_fact,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const cancelEdit = e => {
    e.preventDefault();
    setEditingFact(null);
  };

  return (
    editing_fact && (
      <div className="edit-container">
        <Fragment>
          <form className="form" onSubmit={handleSubmit}>
            <div className={`fact edit${editing_fact ? '' : '--hidden'}`}>
              {Object.entries(editing_fact).map(([pos, text]) => {
                if (pos != '[SKIP] UID') {
                  return (
                    <ul className="fact-part">
                      <li className="fact-part__column-name">{pos}</li>
                      <li>
                        <input
                          className={`fact-part__text fact-part__text${
                            pos.includes('[FILL') ? '--fill' : ''
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
                editing_fact ? '' : '--hidden'
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
        </Fragment>
      </div>
    )
  );
};

export default EditFactForm;
