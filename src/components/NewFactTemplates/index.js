import { useEffect, useState } from 'react';
import axios from 'axios';

import Fact from '../Facts/Fact';

import '../../styles/components/templates.scss';

const NewFactTemplates = ({ templates, setAddingFact, setTemplates }) => {
  const handleClick = template => {
    const new_fact = {};

    template[1].forEach(column_name => {
      new_fact[column_name] = '';
    });

    setAddingFact({
      table_name: template[0],
      new_fact: new_fact,
    });

    setTemplates(null);
  };

  return (
    <div className="templates-container">
      <ul className="templates">
        <h4>Please choose a template for the new fact</h4>
        {Object.entries(templates).map((template, index) => {
          return (
            <li
              className="template"
              key={index}
              onClick={() => handleClick(template)}
            >
              {Object.entries(template[1]).map(([index, column_nane]) => {
                if (!column_nane.includes('[SKIP]')) {
                  return (
                    <ul className="fact-part" key={index}>
                      <li
                        className={`fact-part__text fact-part__text${
                          column_nane.includes('[FILL') ? '--fill' : ''
                        }`}
                      >
                        {column_nane}
                      </li>
                    </ul>
                  );
                }
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NewFactTemplates;
