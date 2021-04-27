import axios from 'axios';

export const getOverviewFromQuestion = async question => {
  const res = await axios.get(`${process.env.REACT_APP_QNA_NLP_API}/overview`, {
    params: { question },
  });

  return res.data;
};

export const getRandomOverview = async () => {
  const res = await axios.get(`${process.env.REACT_APP_QNA_NLP_API}/overview`);

  return res.data;
};

export const updateAnswer = async (question_id, new_answer) => {
  const res = await axios.patch(
    `${process.env.REACT_APP_QNA_NLP_API}/overview`,
    {
      update_type: 'answer',
      question_id: question_id,
      new_answer: new_answer,
    }
  );

  return res.data;
};

export const addFactToExplanation = async (
  question_id,
  explanation_column,
  new_fact_id
) => {
  const res = await axios.patch(
    `${process.env.REACT_APP_QNA_NLP_API}/overview`,
    {
      update_type: 'add fact',
      question_id,
      explanation_column,
      new_fact_id,
    }
  );

  return res.data;
};

export const updateExplanation = async (
  question_id,
  explanation_column,
  new_facts
) => {
  const res = await axios.patch(
    `${process.env.REACT_APP_QNA_NLP_API}/overview`,
    {
      update_type: 'facts',
      question_id,
      explanation_column,
      new_facts,
    }
  );

  return res.data;
};
