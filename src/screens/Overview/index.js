import axios from 'axios';
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import Question from '../../components/Question';
import Choices from '../../components/Choices';
import Explanation from '../../components/Explanation';
import Spinner from '../../components/Spinner';
import Instructions from '../../components/Instructions';
import Bin from '../../components/Bin';

import '../../styles/screens/overview.scss';

// The Overview screen contains the overview of a particular question
// Includes the question the choices and the explanation
const Overview = ({
  clearComponents,
  overview,
  getOverview,
  setOverview,
  loading,
  blurred,
}) => {
  const [showBin, setShowBin] = useState(false);
  const [factInBin, setFactInBin] = useState();

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
        const deleted = overview[overview.current_explanation].filter(
          (fact, index) => index !== source.index
        );

        updateLocally(deleted);
        updateFacts(deleted.map(fact => fact['[SKIP] UID']));
      }

      setFactInBin(null);
    }
  };

  const changeOrder = (source, destination) => {
    const explanation = overview[overview.current_explanation];
    const [moved] = explanation.splice(source.index, 1);

    explanation.splice(destination.index, 0, moved);

    return explanation.map(fact => fact['[SKIP] UID']);
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
            // onDragUpdate={update => handleUpdate(update)}
            onDragStart={() => setShowBin(true)}
          >
            <Question question={overview.question} />
            <Choices overview={overview} setOverview={setOverview} />
            <Explanation
              explanation={overview[overview.current_explanation]}
              correct={overview.current_explanation == 'explanation'}
              factInBin={factInBin}
            />
            <Bin showBin={showBin} setFactInBin={setFactInBin} />
          </DragDropContext>
        </div>
      ) : (
        <Instructions getOverview={getOverview} />
      )}
    </div>
  );
};

export default Overview;
