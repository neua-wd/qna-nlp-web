import '../../styles/components/explanation.scss';

const Explanation = ({ facts }) => {
  return (
    <div className="explanation">
      <div className="explanation__title">Explanation</div>
      {facts?.map((element, index) => {
        return <div key={index}>{element}</div>;
      })}
    </div>
  );
};

export default Explanation;
