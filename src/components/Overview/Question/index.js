import { useState } from 'react';
import '../../../styles/components/question.scss';
import Mic from '../../AddFactForm/Mic';
import LinearProgress from '@material-ui/core/LinearProgress';
import '../../../styles/components/add-fact-form.scss';

const Question = ({ question, getOverview }) => {
  const [micOn, setMic] = useState(false);

  const SpeechRecognition =
    window.speechRecognition || window.webkitSpeechRecognition;

  const handleChange = async e => {
    const transcript = e.target.value;

    const data = await getOverview(
      transcript.charAt(0).toUpperCase() + transcript.slice(1)
    );

    if (!data.error) {
      const utterance = new SpeechSynthesisUtterance(getScript(data));
      speechSynthesis.speak(utterance);
    }
  };

  const getScript = data => {
    const noOfFacts = data.explanation.length;
    let script = data.choices[data.answer];
    if (noOfFacts != 0) {
      script += '. The reason is that';

      data.explanation.forEach((fact, index) => {
        if (noOfFacts > 1) {
          script += ', ';
          if (index == noOfFacts - 1) script += ' and';
          script += index + 1 + '. ';
        }

        Object.keys(fact).forEach(key => {
          if (key != '[SKIP] UID') {
            script += fact[key] + ' ';
          }
        });

        script += '. ';
      });
    }

    return script;
  };

  return (
    <div className="question">
      <div className="question__title">Question</div>
      <div className="question__box">
        {micOn ? (
          <LinearProgress className="progress-bar" />
        ) : (
          <span>{' ' + question}</span>
        )}
      </div>
      <Mic
        SpeechRecognition={SpeechRecognition}
        micOn={micOn}
        setMic={setMic}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Question;
