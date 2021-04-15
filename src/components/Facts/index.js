import Fact from './Fact';
import BackButton from '../Actions/BackButton';

import { MapInteractionCSS } from 'react-map-interaction';

import '../../styles/components/facts.scss';

const Facts = ({ facts, setEditingFact, hypothesis, switchScreen }) => {
  return (
    <div>
      <div className="facts-container">
        <BackButton switchScreen={switchScreen} />
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
      </div>
    </div>
  );
};

export default Facts;
