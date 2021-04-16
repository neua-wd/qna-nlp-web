import { Fragment } from 'react';
import { updateFact } from '../../services/fact';

import '../../styles/components/facts.scss';

const EditFactForm = ({
  overview,
  setOverview,
  editing_fact,
  setEditingFact,
  getOverview,
  setLoading,
}) => {
  const handleChange = e => {
    setEditingFact({ ...editing_fact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setEditingFact(null);
      setLoading(true);

      await updateFact(editing_fact);
      await getOverview(overview.question);
    } catch (e) {
      setOverview(overview);
      console.log(e);
    }
  };

  const cancelEdit = e => {
    e.preventDefault();
    setEditingFact(null);
  };

  return (
    <div className="edit-container">
      <Fragment>
        <form className="form" onSubmit={handleSubmit}>
          <div className="fact edit">
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
          <div className="edit edit__button-container">
            <input type="submit" className="btn btn--save" value="Save"></input>
            <button className="btn btn--cancel" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </form>
      </Fragment>
    </div>
  );
};

export default EditFactForm;
