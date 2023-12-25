import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const ModalType = {
  CREATE: "create",
  EDIT: "edit",
};
export default function AddEditForm({
  open,
  setOpen,
  modalType,
  confirmUpdateEvent,
  confirmAddEvent,
  confirmDeleteEvent,
  eventData
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const createEvent = () => {
    confirmAddEvent();
  };

  const editEvent = () => {
    confirmUpdateEvent({...eventData, title: 'update name'});
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>

          <Button autoFocus onClick={confirmDeleteEvent}>
            delete
          </Button>
          <Button
            onClick={() => {
              modalType === ModalType.CREATE ? createEvent() : editEvent();
            }}
            autoFocus
          >
            {modalType === ModalType.CREATE ? "Create" : "Edit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddEditForm.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  confirmAddEvent: PropTypes.func,
  confirmUpdateEvent: PropTypes.func,
  confirmDeleteEvent: PropTypes.func,
  modalType: PropTypes.oneOfType([ModalType.CREATE, ModalType.EDIT]),
  selectedDate: PropTypes.string,
  eventData: PropTypes.object,
};
