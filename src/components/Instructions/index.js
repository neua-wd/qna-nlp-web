import Search from '../Actions/Search';
import Random from '../Actions/Random';

const Instructions = ({ getOverview }) => {
  return (
    <div>
      Please search for an exact question <br />
      (eg. What remains in the same location in the sky of the Northern
      Hemisphere each night?) <br />
      <br />
      <Search getOverview={getOverview} withForm={true} withDesc={false} />
      <br />
      or <br />
      Get a random question
      <Random getOverview={getOverview} withDesc={false} />
    </div>
  );
};

export default Instructions;
