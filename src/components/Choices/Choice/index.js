import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/components/choice.scss';

// A Choice component includes the letter (ie. A/B/C/D) and the sentence
const Choice = ({ letter, sentence, correct }) => {
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(!hovered);
  };

  if (!hovered) {
    return (
      <div
        className={`choice choice--${correct ? 'correct' : 'incorrect'}`}
        onMouseEnter={handleHover}
      >
        <div className="choice__title">{letter}</div>
        <br />
        {sentence}
      </div>
    );
  } else {
    return (
      <Link
        to="/details"
        className="choice choice__see-details"
        onMouseLeave={handleHover}
      >
        <div className="choice__see-details--text">See Details ...</div>
      </Link>
    );
  }
};

export default Choice;
