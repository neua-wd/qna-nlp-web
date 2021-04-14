import axios from 'axios';

import Spinner from '../Spinner';

import '../../styles/components/suggestions.scss';

const Suggestions = ({
  suggestions,
  setSuggestions,
  setAddingFact,
  overview,
  setOverview,
  loading,
  setOverviewLoading,
}) => {
  const toSentence = fact => {
    let sentence = '';

    for (const column_name in fact) {
      const word = fact[column_name];
      if (!column_name.includes('[SKIP]') && word.length != 0)
        if (sentence === '') {
          sentence += word;
        } else {
          sentence += ' ' + word;
        }
    }

    return sentence;
  };

  const addToExplanation = async fact => {
    setSuggestions(null);
    setAddingFact(null);
    setOverviewLoading(true);

    const current_explanation = overview.current_explanation;

    const res = await axios.patch(
      `${process.env.REACT_APP_QNA_NLP_API}/overview`,
      {
        update_type: 'add fact',
        question_id: overview.question_id,
        explanation_column: current_explanation,
        new_fact: fact['[SKIP] UID'],
      }
    );

    const updated_overview = res.data;
    updated_overview.current_explanation = current_explanation;

    setOverview(updated_overview);
    setOverviewLoading(false);
  };

  const goBack = () => {
    setAddingFact({
      table_name: 'NO-TEMPLATE',
      new_fact: { '[UNLABELED]': '' },
    });

    setSuggestions(null);
  };

  return (
    <div className="suggestions-container">
      <div className="suggestions">
        <div className="suggestions__header">Suggestions</div>
        {loading ? (
          <Spinner boxed={true} />
        ) : (
          suggestions &&
          suggestions.map(suggestion => {
            return (
              <div
                className="suggestions__item"
                onClick={() => addToExplanation(suggestion)}
              >
                {toSentence(suggestion)}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Suggestions;
