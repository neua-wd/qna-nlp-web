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

  return (
    <div className="templates-container">
      <div className="templates">
        <div className="header">Suggestions</div>
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
