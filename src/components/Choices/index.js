import Choice from './Choice';
import '../../styles/components/choices.scss';

// Choices component
// For each choice (ie. A/B/C/D) renders a choice component
const Choices = ({ choices, answer }) => {
  return (
    <div className="choices">
      {choices &&
        Object.entries(choices).map(([key, value]) => {
          return (
            <Choice letter={key} sentence={value} correct={key === answer} />
          );
        })}
    </div>
  );
};

export default Choices;
