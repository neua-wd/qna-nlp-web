import { useRef } from 'react';
import Xarrow from 'react-xarrows';

import '../../styles/components/facts.scss';

const Fact = ({ fact, index, setEditingFact, compact, type, id }) => {
  const fact_ref = useRef(index);
  const handleClick = () => {
    setEditingFact(fact);
  };

  return (
    <div>
      {type == 'abstraction' && (
        <Xarrow
          start="hypothesis"
          end={fact_ref}
          startAnchor="right"
          endAnchor="left"
          color="rgb(255, 150, 150, 0.7)"
          _cpx1Offset
        />
      )}
      {type == 'abstraction' && (
        <Xarrow
          start={fact_ref}
          end="unification"
          startAnchor="right"
          endAnchor="left"
          color="rgb(226, 171, 255, 0.7)"
        />
      )}
      <div
        className={`fact fact--selectable ${compact ? 'fact--compact' : ''}`}
        onClick={e => {
          if (!e.defaultPrevented) handleClick();
        }}
        onTouchEnd={handleClick}
        id={id}
        ref={fact_ref}
        key={index}
      >
        {Object.entries(fact).map(([tag, text]) => {
          if (text != '' && tag != '[SKIP] UID') {
            return (
              <ul className={`fact-part${type ? ' fact-part--small' : ''}`}>
                <li
                  className={`fact-part__column-name${
                    type ? ' fact-part__column-name--small' : ''
                  }`}
                >
                  {tag}
                </li>
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
    </div>
  );
};

export default Fact;
