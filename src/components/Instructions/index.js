import Search from '../Actions/Search';
import Random from '../Actions/Random';
import Card from '@material-ui/core/Card';

import '../../styles/components/instructions.scss';

const Instructions = ({ getOverview }) => {
  return (
    <div className="instructions">
      <Card className="instructions__card">
        Please enter the exact question <br />
        (eg. What remains in the same location in the sky of the Northern
        Hemisphere each night?) <br />
        <br />
        <Search getOverview={getOverview} withForm={true} withDesc={false} />
      </Card>
      <Card className="instructions__card">
        Or get a random question
        <Random getOverview={getOverview} withDesc={false} />
      </Card>
    </div>
  );
};

export default Instructions;
