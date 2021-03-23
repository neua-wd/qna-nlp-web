import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContentText from '@material-ui/core/DialogContentText';

import '../../styles/components/alert.scss';

const NoQuestionAlert = ({ showAlert, setShowAlert }) => {
  return (
    <Dialog open={showAlert}>
      <div className="alert__title">
        <DialogTitle>Question does not exist</DialogTitle>
        <IconButton aria-label="close" onClick={() => setShowAlert(false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent dividers>
        <DialogContentText>
          The entered question does not exist. Please enter a question that
          exists in the dataset.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default NoQuestionAlert;
