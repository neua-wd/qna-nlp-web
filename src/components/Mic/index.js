import IconButton from '@material-ui/core/IconButton';
import MicTwoToneIcon from '@material-ui/icons/MicTwoTone';

const Mic = ({
  SpeechRecognition,
  setMic,
  micOn,
  adding_fact,
  setAddingFact,
}) => {
  const mic = new SpeechRecognition();
  mic.onstart = () => setMic(true);
  mic.onend = () => setMic(false);

  mic.onresult = e => {
    const new_fact = {
      ...adding_fact.new_fact,
      '[UNLABELED]': e.results[0][0].transcript,
    };

    setAddingFact({
      ...adding_fact,
      new_fact,
    });
  };

  const toggleMic = () => {
    if (micOn) {
      setMic(false);
      mic.stop();
    } else mic.start();
  };

  return (
    <IconButton size="small" color={micOn ? 'primary' : 'default'}>
      <MicTwoToneIcon fontSize="large" onClick={toggleMic} />
    </IconButton>
  );
};

export default Mic;
