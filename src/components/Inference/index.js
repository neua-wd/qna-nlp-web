import InteractiveMap from './InteractiveMap';

import '../../styles/components/inference.scss';

const Inference = ({
  clearComponents,
  overview,
  setEditingFact,
  toggleInference,
  loading,
  blurred,
}) => {
  return (
    <div
      className={`inference ${blurred ? 'inference--blur' : ''}`}
      onClick={clearComponents}
    >
      {overview && (
        <InteractiveMap
          hypothesis={overview.answer}
          facts={overview.categorized_explanation}
          setEditingFact={setEditingFact}
          toggleInference={toggleInference}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Inference;
