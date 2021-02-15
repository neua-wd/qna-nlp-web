import { Link } from 'react-router-dom';

import '../../styles/components/see-how-link.scss';

const SeeHowLink = () => {
  return (
    <Link to="/details">
      <button className="see-how-link">
        See how we come to this conclusion
      </button>
    </Link>
  );
};

export default SeeHowLink;
