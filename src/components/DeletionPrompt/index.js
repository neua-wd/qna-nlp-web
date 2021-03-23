import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeletionPrompt = ({
  showPrompt,
  setShowPrompt,
  overview,
  setOverview,
  overviewBeforeDeletion,
  setOverviewBeforeDeletion,
  updateFacts,
}) => {
  const handleConfirm = () => {
    updateFacts(
      overview[overview.current_explanation].map(fact => fact['[SKIP] UID'])
    );

    setShowPrompt(false);
    setOverviewBeforeDeletion(null);
  };

  const handleCancel = () => {
    setOverview(overviewBeforeDeletion);
    setShowPrompt(false);
    setOverviewBeforeDeletion(null);
  };

  return (
    <Dialog open={showPrompt}>
      <DialogTitle>
        {'Do you want to remove the fact from this explanation?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Only remove a fact if it does not explain the reasoning for the
          decision <br />
          This will only remove it from this particular explanation and NOT from
          the dataset (Explanation Bank).
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
        <Button onClick={handleCancel} color="default" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletionPrompt;
