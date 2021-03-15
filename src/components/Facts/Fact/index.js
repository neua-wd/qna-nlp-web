import '../../../styles/components/facts.scss';

const Fact = ({ fact, index, setEditingFact }) => {
  const handleClick = () => {
    setEditingFact(fact);
  };

  return (
    <div
      className="fact fact--selectable"
      onClick={e => {
        if (!e.defaultPrevented) handleClick();
      }}
      onTouchEnd={handleClick}
      key={index}
    >
      {Object.entries(fact).map(([tag, text]) => {
        if (text != '' && tag != '[SKIP] UID') {
          return (
            <ul className="fact-part">
              <li className="fact-part__column-name">{tag}</li>
              <li
                className={`fact-part__text fact-part__text${
                  tag.includes('[FILL') ? '--fill' : ''
                }`}
              >
                {text}
              </li>
            </ul>
          );
        }
      })}
    </div>
  );
};

export default Fact;
