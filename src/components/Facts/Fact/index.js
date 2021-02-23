import '../../../styles/components/facts.scss';

const Fact = ({ fact, index, setEditingFact }) => {
  const handleClick = () => {
    setEditingFact(fact);
  };

  return (
    <div
      className="fact"
      onClick={e => {
        if (!e.defaultPrevented) handleClick();
      }}
      onTouchEnd={handleClick}
      key={index}
    >
      {Object.entries(fact).map(([pos, text]) => {
        if (text != '' && pos != '[SKIP] UID') {
          return (
            <ul className="fact-part">
              <li className="fact-part__column-name">{pos}</li>
              <li
                className={`fact-part__text fact-part__text${
                  pos.includes('[FILL') ? '--fill' : ''
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
