import AddFactButton from './AddFactButton';
import Search from './Search';

import '../../styles/components/actions.scss';
import Random from './Random';

const Actions = ({ getOverview, hide_add_fact, setAddingFact }) => {
  return (
    <div className="actions">
      <div className="get-question">
        <Search getOverview={getOverview} withForm={false} withDesc={true} />
        <Random getOverview={getOverview} withDesc={true} />
      </div>
      <AddFactButton hidden={hide_add_fact} setAddingFact={setAddingFact} />
    </div>
  );
};

export default Actions;
