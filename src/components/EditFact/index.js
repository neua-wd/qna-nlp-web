import { Fragment, useState } from 'react';
import axios from 'axios';

import '../../styles/components/facts.scss';

const EditFact = ({
  fact,
  index,
  overview,
  setOverview,
  setEditingFact,
  getOverview,
}) => {
  const handleChange = e => {
    setEditingFact({ ...fact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await apiUpdateFact(fact);

      await getOverview(overview.question);

      setEditingFact(null);
    } catch (e) {
      setOverview(overview);
      console.log(e);
    }
  };

  const apiUpdateFact = async fact => {
    try {
      await axios.put('/fact', { edited_fact: fact });
    } catch (e) {
      console.log(e);
    }
  };

  const cancelEdit = e => {
    e.preventDefault();
    setEditingFact(null);
  };

  return (
    <Fragment>
      <form className="form" onSubmit={handleSubmit}>
        <div className={`fact edit${fact ? '' : '--hidden'}`}>
          {fact &&
            Object.entries(fact).map(([pos, text]) => {
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
        <div className={`edit edit__button-container${fact ? '' : '--hidden'}`}>
          <input type="submit" className="btn btn--save" value="Save"></input>
          <button className="btn btn--cancel" onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default EditFact;
