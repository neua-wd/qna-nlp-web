import axios from 'axios';
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import Question from '../../components/Question';
import Choices from '../../components/Choices';
import Explanation from '../../components/Explanation';
import Spinner from '../../components/Spinner';
import Instructions from '../../components/Instructions';
import Bin from '../../components/Bin';
import DeletionPrompt from '../../components/DeletionPrompt';

import '../../styles/screens/overview.scss';

// The Overview screen contains the overview of a particular question
// Includes the question the choices and the explanation
const Overview = ({
  clearComponents,
  overview,
  getOverview,
  setOverview,
  setEditingFact,
  loading,
  blurred,
}) => {
  const [showBin, setShowBin] = useState(false);
  const [factInBin, setFactInBin] = useState();
  const [showPrompt, setShowPrompt] = useState(false);
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
    const current_explanation = overview.current_explanation;

    const res = await axios.patch(
      `${process.env.REACT_APP_QNA_NLP_API}/overview`,
      {
        question_id: overview.question_id,
        explanation_column: current_explanation,
        new_facts: new_facts,
      }
    );

    const updated_overview = res.data;
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
        <div>
          <DragDropContext
            onDragEnd={result => handleDragEnd(result)}
            onDragStart={() => setShowBin(true)}
          >
            <Question question={overview.question} />
            <Choices overview={overview} setOverview={setOverview} />
            <Explanation
              explanation={overview[overview.current_explanation]}
              correct={overview.current_explanation == 'explanation'}
              factInBin={factInBin}
              setEditingFact={setEditingFact}
            />
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
