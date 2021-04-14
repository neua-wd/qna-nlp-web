import IconButton from '@material-ui/core/IconButton';
import MicTwoToneIcon from '@material-ui/icons/MicTwoTone';

const Mic = ({ SpeechRecognition, setMic, micOn, handleChange }) => {
  const mic = new SpeechRecognition();
  mic.onstart = () => setMic(true);
  mic.onend = () => setMic(false);

  mic.onresult = e => {
    handleChange({
      target: { name: '[UNLABELED]', value: e.results[0][0].transcript },
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
