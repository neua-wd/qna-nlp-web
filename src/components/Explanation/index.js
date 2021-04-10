import { Droppable } from 'react-beautiful-dnd';

import Sentence from './Sentence';
import Fact from '../Facts/Fact';
import ScreenSwitcher from '../ScreenSwitcher';

import '../../styles/components/explanation.scss';

import { useState } from 'react';

const Explanation = ({ overview, factInBin, setEditingFact }) => {
  const [detailed, setDetailed] = useState(false);

  const explanation = overview[overview.current_explanation];
  const current_explanation = overview.current_explanation;

  const toggleDetailed = () => {
    setDetailed(!detailed);
  };

  const currentLetter = () => {
    return current_explanation == 'explanation'
      ? overview.answer
      : current_explanation.charAt(current_explanation.length - 1);
  };

  return (
    <div
      className={`explanation explanation--${
        current_explanation == 'explanation' ? 'correct' : 'incorrect'
      }`}
      elevation={3}
    >
      <div className="explanation__header">
        <ScreenSwitcher toggle={toggleDetailed} inBox={true} />
        <div className="explanation__title">
          {current_explanation == 'explanation'
            ? `Explanation (why ${currentLetter()} is correct)`
            : `Contrastive Explanation (why ${currentLetter()} is incorrect)`}
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
