import { Droppable } from 'react-beautiful-dnd';

import Sentence from './Sentence';
import Fact from '../Facts/Fact';
import ScreenSwitcher from '../ScreenSwitcher';

import '../../styles/components/explanation.scss';

import { useState } from 'react';

const Explanation = ({ explanation, correct, factInBin, setEditingFact }) => {
  const [detailed, setDetailed] = useState(false);

  const toggleDetailed = () => {
    setDetailed(!detailed);
  };

  return (
    <div
      className={`explanation explanation--${
        correct ? 'correct' : 'incorrect'
      }`}
      elevation={3}
    >
      <div className="explanation__header">
        <ScreenSwitcher toggle={toggleDetailed} inBox={true} />
        <div className="explanation__title">
          {correct
            ? 'Explanation (why this is correct)'
            : 'Contrastive Explanation (why this is incorrect)'}
        </div>
      </div>
      <div className="explanation__body">
        <Droppable droppableId="explanation" key="explanation">
          {(provided, snapshot) => {
            return (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {explanation?.map((fact, index) => {
                  return detailed ? (
                    <Fact
                      fact={fact}
                      index={index}
                      setEditingFact={setEditingFact}
                      compact={true}
                    />
                  ) : (
                    <Sentence
                      index={index}
                      fact={fact}
                      hidden={fact['[SKIP] UID'] == factInBin}
                      setEditingFact={setEditingFact}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};

export default Explanation;
