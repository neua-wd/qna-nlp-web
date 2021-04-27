import Choice from './Choice';

import '../../../styles/components/choices.scss';

// Choices component
// For each choice (ie. A/B/C/D) renders a choice component
const Choices = ({ overview, setOverview, setBodyLoading }) => {
  return (
    <div className="choices">
      {overview.choices &&
        Object.entries(overview.choices).map(([key, value]) => {
          return (
            <Choice
              letter={key}
              sentence={value}
              overview={overview}
              setOverview={setOverview}
              setBodyLoading={setBodyLoading}
            />
          );
        })}
    </div>
  );
};

export default Choices;
