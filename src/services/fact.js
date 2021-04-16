import axios from 'axios';

export const addFact = async (current_overview, fact) => {
  const res = await axios.post(`${process.env.REACT_APP_QNA_NLP_API}/fact`, {
    table_name: fact.table_name,
    to_question: current_overview.question_id,
    explanation_column: current_overview.current_explanation,
    new_fact: fact.new_fact,
  });

  return res.data;
};

export const updateFact = async new_fact => {
  await axios.put(`${process.env.REACT_APP_QNA_NLP_API}/fact`, {
    edited_fact: new_fact,
  });
};
