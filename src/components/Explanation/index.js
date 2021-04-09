import { Droppable } from 'react-beautiful-dnd';

import Sentence from './Sentence';

import '../../styles/components/explanation.scss';

const Explanation = ({ explanation, correct, factInBin, setEditingFact }) => {
  return (
    <div
      className={`explanation explanation--${
        correct ? 'correct' : 'incorrect'
      }`}
      elevation={3}
    >
      <div className="explanation__title">Explanation</div>
      <Droppable droppableId="explanation" key="explanation">
        {(provided, snapshot) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {explanation?.map((fact, index) => {
                return (
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
  );
};

export default Explanation;
