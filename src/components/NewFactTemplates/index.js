import { useEffect, useState } from 'react';
import axios from 'axios';

import Fact from '../Facts/Fact';

import '../../styles/components/templates.scss';

const NewFactTemplates = ({ templates, setAddingFact, setTemplates }) => {
  const handleClick = template => {
    if (template == null) {
      setAddingFact({
        table_name: 'NO-TEMPLATE',
        new_fact: { '[UNLABELED]': '' },
      });
      setTemplates(null);

      return;
    }

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
    <div className="container">
      <div className="templates">
        <div className="header">
          Please choose a template for the new fact or
          <button className="btn" onClick={() => handleClick()}>
            enter without a template
          </button>
        </div>
        <div className="templates__rows">
          <ul>
            {Object.entries(templates).map((template, index) => {
              return (
                <li
                  className="template"
                  key={index}
                  onClick={() => handleClick(template)}
                >
                  {Object.entries(template[1]).map(([index, column_name]) => {
                    if (!column_name.includes('[SKIP]')) {
                      return (
                        <ul className="fact-part" key={index}>
                          <li
                            className={`fact-part__text fact-part__text${
                              column_name.includes('[FILL') ? '--fill' : ''
                            }`}
                          >
                            {column_name}
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
      </div>
    </div>
  );
};

export default NewFactTemplates;
