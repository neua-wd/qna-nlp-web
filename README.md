# Q&A Explanation Feedback
[Go to the app](https://qna-nlp.herokuapp.com)
## Description

A proof-of-concept web application to facilitate human feedback to an AI question answering system. The API that serves the required data emulates an AI system that uses [Conceptual Unification](https://arxiv.org/abs/2009.14539) as the mechanism for explaining natural language reasoning. It uses [Peter Jansen's Explanation Bank](http://cognitiveai.org/explanationbank/) as the dataset.

## Development

To run this in development environment, you will also need the API mentioned above. For this you can either run [its repository](https://github.com/neua-wd/qna-nlp-api) locally or use the production URI (
https://qna-nlp-api.herokuapp.com) in place of the local variable REACT_APP_QNA_NLP_API.

Then run `npm install` to install all the required dependencies,

and run `npm start` start the server.