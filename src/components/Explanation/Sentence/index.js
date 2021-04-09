import { Draggable } from 'react-beautiful-dnd';

const Sentence = ({ index, fact, hidden, setEditingFact }) => {
  const toSentence = fact => {
    let sentence = '';
    for (const column_name in fact) {
      if (!column_name.includes('[SKIP]')) sentence += fact[column_name] + ' ';
    }

    return sentence;
  };

  return (
    <Draggable
      draggableId={fact['[SKIP] UID']}
      index={index}
      key={fact['[SKIP] UID']}
    >
      {(provided, snapshot) => {
        return (
          <div
            className="explanation__sentence-box"
            key={index}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={e => {
              if (!e.defaultPrevented) setEditingFact(fact);
            }}
          >
            <div
              className={`explanation__sentence${hidden ? '--hidden' : ''}`}
              key={index}
            >
              {index + 1 + '. ' + toSentence(fact)}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Sentence;
