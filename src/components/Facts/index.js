import Fact from './Fact';
import CloseButton from '../Actions/CloseButton';
import Xarrow from 'react-xarrows';
import Spinner from '../Spinner';

import { MapInteractionCSS } from 'react-map-interaction';

import '../../styles/components/facts.scss';

const Facts = ({
  facts,
  setEditingFact,
  hypothesis,
  toggleInference,
  loading,
}) => {
  return (
    <div className="facts-container">
      <CloseButton switchScreen={toggleInference} />
      <div className="map-container">
        {loading ? (
          <Spinner boxed={true} />
        ) : (
          <MapInteractionCSS id="container">
            <div className="interactive-map">
              <div id="hypothesis" className="hypothesis">
                Hypothesis {hypothesis}
              </div>
              <div className="facts__abstraction">
                {facts.abstraction.map((fact, index) => {
                  return (
                    <div className="fact-container">
                      <Fact
                        fact={fact}
                        index={index}
                        setEditingFact={setEditingFact}
                        type="abstraction"
                        id={index}
                      />
                    </div>
                  );
                })}
              </div>

              <Xarrow
                start="hypothesis"
                end="unification"
                startAnchor="right"
                endAnchor="left"
                color="rgb(226, 171, 255, 0.5)"
              />
              <div className="fact-container">
                <div className="facts__unification">
                  <Fact
                    fact={facts.unification}
                    index={facts.length}
                    setEditingFact={setEditingFact}
                    type="unification"
                    id="unification"
                  />
                </div>
              </div>
            </div>
          </MapInteractionCSS>
        )}
      </div>
    </div>
  );
};

export default Facts;
