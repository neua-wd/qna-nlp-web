import Fact from './Fact';
import EditFact from '../EditFactForm';

import { MapInteractionCSS } from 'react-map-interaction';
import { useState } from 'react';

import '../../styles/components/facts.scss';
import { findByLabelText } from '@testing-library/react';

const Facts = ({ facts, setEditingFact }) => {
  return (
    <div className="facts-container">
      <MapInteractionCSS id="container">
        <div className="facts">
          {facts.map((fact, index) => {
            return (
              <Fact fact={fact} index={index} setEditingFact={setEditingFact} />
            );
          })}
        </div>
      </MapInteractionCSS>
    </div>
  );
};

export default Facts;
