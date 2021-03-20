import { ControlCameraOutlined, UpdateSharp } from '@material-ui/icons';
import axios from 'axios';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import '../../styles/components/explanation.scss';

const Explanation = ({
  explanation,
  correct,
  question_id,
  current_explanation,
  setOverview,
}) => {
  // takes fact as an object. eg:
  //  {
  //    "ACTOR/WHO": "moving",
  //    "VERB": "changes",
  //    "WHAT": "position"
  //  }
  // and returns a string eg "moving changes position"
  const toSentence = fact => {
    let sentence = '';
    for (const column_name in fact) {
      if (!column_name.includes('[SKIP]')) sentence += fact[column_name] + ' ';
    }

    return sentence;
  };

  const handleDragEnd = async ({ source, destination }) => {
    const [moved] = explanation.splice(source.index, 1);
    explanation.splice(destination.index, 0, moved);

    const new_order = explanation.map(fact => fact['[SKIP] UID']);

    const res = await axios.patch(
      `${process.env.REACT_APP_QNA_NLP_API}/overview`,
      {
        question_id: question_id,
        explanation_column: current_explanation,
        new_order: new_order,
      }
    );

    const updated_overview = res.data;
    updated_overview.current_explanation = current_explanation;
    setOverview(updated_overview);
  };

  return (
    <div
      className={`explanation explanation--${
        correct ? 'correct' : 'incorrect'
      }`}
    >
      <div className="explanation__title">Explanation</div>
      <DragDropContext onDragEnd={result => handleDragEnd(result)}>
        <Droppable droppableId="explanation" key="explanation">
          {(provided, snapshot) => {
            return (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {explanation?.map((fact, index) => {
                  return (
                    <Draggable
                      draggableId={index.toString()}
                      index={index}
                      key={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            className="explanation__sentence-box"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="explanation__sentence" key={index}>
                              {index + 1 + '. ' + toSentence(fact)}
                            </div>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Explanation;
