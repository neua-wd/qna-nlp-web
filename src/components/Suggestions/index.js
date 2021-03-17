import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

import '../../styles/components/templates.scss';

const Suggestions = ({ suggestions, setSuggestions, setAddingFact }) => {
  const toSentence = fact => {
    console.log(fact);
    let sentence = '';
    for (const column_name in fact) {
      if (!column_name.includes('[SKIP]')) sentence += fact[column_name] + ' ';
    }
    console.log(sentence);

    return sentence;
  };

  const handleClick = suggestion => {
    setSuggestions(null);

    setAddingFact({
      table_name: Object.keys(suggestion)[0],
      new_fact: Object.values(suggestion)[0],
    });
  };

  const goBack = () => {
    setAddingFact({
      table_name: 'NO-TEMPLATE',
      new_fact: { '[UNLABELED]': '' },
    });

    setSuggestions(null);
  };

  return (
    <div className="templates-container">
      <div className="templates">
        <div className="header">
          <span className="back-button">
            <ArrowBackIosOutlinedIcon onClick={goBack} />
          </span>
          Suggestions
        </div>
        <div className="templates__rows">
          <ul>
            {suggestions.map(suggestion => {
              return (
                <li
                  className="template"
                  onClick={() => handleClick(suggestion)}
                >
                  {toSentence(Object.values(suggestion)[0])}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
