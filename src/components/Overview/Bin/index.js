import Slide from '@material-ui/core/Slide';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import { Droppable } from 'react-beautiful-dnd';

import '../../../styles/components/bin.scss';
import { Fragment } from 'react';

const Bin = ({ showBin, setFactInBin }) => {
  return (
    <Fragment>
      <div className="bin">
        <Droppable droppableId="bin" key="bin">
          {(provided, snapshot) => {
            setFactInBin(snapshot.draggingOverWith);
            return (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
      <div className="bin__icon">
        <Slide direction="up" in={showBin}>
          <DeleteForeverTwoToneIcon fontSize="large" color="secondary" />
        </Slide>
      </div>
    </Fragment>
  );
};

export default Bin;
