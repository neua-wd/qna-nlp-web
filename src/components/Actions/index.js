import AddFactButton from './AddFactButton';
import Search from './Search';

import '../../styles/components/actions.scss';
import Random from './Random';

const Actions = ({ getOverview, setAddingFact, blurred }) => {
  return (
    <div className={`actions ${blurred ? 'actions--blur' : ''}`}>
      <div className="get-question">
        <Search getOverview={getOverview} withForm={false} withDesc={true} />
        <Random getOverview={getOverview} withDesc={true} />
      </div>
      <AddFactButton setAddingFact={setAddingFact} />
    </div>
  );
};

export default Actions;
