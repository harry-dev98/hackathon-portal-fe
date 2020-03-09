//Hackathon Setting. File needs to be renames from modal.js

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
import { SimpleTabs } from './tabs';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  modal: {
    margin: 'auto',
    width: '40%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid blue',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: 'black'
  },
  label: {
    background: '#D0DDFF',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  button: {
    cursor: 'pointer',
    color: '#311B92',
    background: 'white',
    width: '187px',
    height: '42px',
    'font-weight': 'bold',
    'font-size': '14px',
    'font-family': 'Muli',
    border: '1px solid #311B92',
    'border-radius': '4px',
    'margin-bottom': '10px',
    'text-transform': 'none',
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function SpringModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className={classes.button} onClick={handleOpen}>
        Edit Event
      </button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h3 id="spring-modal-title">Edit hackathon details</h3>
            <SimpleTabs />
            <Button color='primary' onClick={handleClose}>Exit</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}