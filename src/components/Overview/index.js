import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { updateExplanation } from '../../services/overview';

import Question from './Question';
import Choices from './Choices';
import Explanation from './Explanation';
import Spinner from '../../components/Spinner';
import Instructions from '../../components/Instructions';
import Bin from './Bin';
import DeletionPrompt from '../../components/DeletionPrompt';

import '../../styles/components/overview.scss';

// The Overview screen contains the overview of a particular question
// Includes the question the choices and the explanation
const Overview = ({
  clearComponents,
  overview,
  getOverview,
  setOverview,
  setEditingFact,
  toggleInference,
  loading,
  blurred,
}) => {
  const [showBin, setShowBin] = useState(false);
  const [factInBin, setFactInBin] = useState();
  const [showPrompt, setShowPrompt] = useState(false);
  const [bodyLoading, setBodyLoading] = useState(false);
  const [overviewBeforeDeletion, setOverviewBeforeDeletion] = useState();

  const handleDragEnd = ({ source, destination }) => {
    setShowBin(false);

    let new_facts = [];
    if (destination) {
      if (
        destination.droppableId == 'explanation' &&
        source.index != destination.index
      ) {
        new_facts = changeOrder(source, destination);
        updateFacts(new_facts);
      } else if (destination.droppableId == 'bin') {
        setOverviewBeforeDeletion(overview);

        const deleted = overview[overview.current_explanation].filter(
          fact => fact['[SKIP] UID'] !== factInBin
        );

        updateLocally(deleted);
        setShowPrompt(true);
      }
    }

    setFactInBin(null);
  };

  const updateLocally = new_facts => {
    const new_overview = {
      ...overview,
      [overview.current_explanation]: new_facts,
    };

    setOverview(new_overview);
  };

  const updateFacts = async new_facts => {
    const { question_id, current_explanation } = overview;

    const updated_overview = await updateExplanation(
      question_id,
      current_explanation,
      new_facts
    );

    updated_overview.current_explanation = current_explanation;
    setOverview(updated_overview);
  };

  const changeOrder = (source, destination) => {
    const explanation = overview[overview.current_explanation];
    const [moved] = explanation.splice(source.index, 1);

    explanation.splice(destination.index, 0, moved);

    return explanation.map(fact => fact['[SKIP] UID']);
  };

  return (
    <div
      className={`overview${blurred ? '--blurred' : ''}`}
      onClick={clearComponents}
    >
      {loading ? (
        <Spinner />
      ) : overview ? (
        <div style={{ width: '100%' }}>
          <DragDropContext
            onDragEnd={result => handleDragEnd(result)}
            onDragStart={() => setShowBin(true)}
          >
            <Question question={overview.question} getOverview={getOverview} />
            {bodyLoading ? (
              <Spinner />
            ) : (
              <div>
                <Choices
                  overview={overview}
                  setOverview={setOverview}
                  setBodyLoading={setBodyLoading}
                />
                <Explanation
                  overview={overview}
                  factInBin={factInBin}
                  setEditingFact={setEditingFact}
                  toggleInference={toggleInference}
                />
              </div>
            )}
            <Bin showBin={showBin} setFactInBin={setFactInBin} />
          </DragDropContext>
          {overviewBeforeDeletion && (
            <DeletionPrompt
              showPrompt={showPrompt}
              setShowPrompt={setShowPrompt}
              factInBin={factInBin}
              overview={overview}
              setOverview={setOverview}
              overviewBeforeDeletion={overviewBeforeDeletion}
              setOverviewBeforeDeletion={setOverviewBeforeDeletion}
              updateFacts={updateFacts}
            />
          )}
        </div>
      ) : (
        <Instructions getOverview={getOverview} />
      )}
    </div>
  );
};

export default Overview;
