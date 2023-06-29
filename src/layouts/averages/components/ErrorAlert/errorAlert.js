import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from "prop-types";

function ErrorAlert({messageErrorList, resetMessages}){
    const [open, setOpen] = React.useState(true);

    React.useEffect(()=>{
        setOpen(true);
    },[])
    const handleClose = () => {
        resetMessages();
        setOpen(false);
      };

      const getMessages = () =>{
        return messageErrorList.map((item, index) => <p key={index}>{index+1} - {item}</p>)
      }

    return (
                <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Algo deu errado!"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {
                        getMessages()
                    }
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} autoFocus>Fechar</Button>
                </DialogActions>
            </Dialog>
    )
}

ErrorAlert.propTypes = {
    messageErrorList: PropTypes.objectOf(PropTypes.array).isRequired,
    resetMessages: PropTypes.func.isRequired
  };

 export default ErrorAlert