import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

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

  const goBack = () => {
    setAddingFact({
      table_name: 'NO-TEMPLATE',
      new_fact: { '[UNLABELED]': '' },
    });

    setTemplates(null);
  };

  return (
    <div className="templates-container">
      <div className="templates">
        <div className="header">
          <span className="back-button">
            <ArrowBackIosOutlinedIcon onClick={goBack} />
          </span>
          Please choose a template for the new fact
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
