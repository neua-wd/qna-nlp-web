import { Droppable } from 'react-beautiful-dnd';
import { Slide } from '@material-ui/core';

import Sentence from './Sentence';
import Fact from '../../Fact';
import Toggler from './Toggler';

import '../../../styles/components/explanation.scss';

import { useState } from 'react';

const Explanation = ({
  overview,
  factInBin,
  setEditingFact,
  toggleInference,
}) => {
  const [detailed, setDetailed] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

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

  const hasDetail = () => {
    return (
      overview &&
      overview.current_explanation == 'explanation' &&
      Object.keys(overview.categorized_explanation.unification).length != 0
    );
  };

  return (
    <div
      className="explanation-container"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <div
        className={`explanation explanation--${
          current_explanation == 'explanation' ? 'correct' : 'incorrect'
        }`}
        elevation={3}
      >
        <div className="explanation__header">
          <Toggler toggle={toggleDetailed} />
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
      {hasDetail() && (
        <Slide direction="left" in={mouseOver}>
          <div className="view-inference" onClick={toggleInference}>
            View inference
          </div>
        </Slide>
      )}
    </div>
  );
};

export default Explanation;
