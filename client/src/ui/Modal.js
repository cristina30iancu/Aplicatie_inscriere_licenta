import Backdrop from './BackDrop';
import Grid from '@mui/material/Grid';

const Modal = (props) => {
  let modalClasses = ['Modal', props.class, 'Close'];
  if (props.open) {
    modalClasses = ['Modal', props.class, 'Open'];
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height:500,
    bgcolor: 'white',
    border: '0.5px solid #fff',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Backdrop  show={props.open} />
      <Grid sx={style} className={modalClasses.join(' ')}>
        <Grid className={'CloseModal'} onClick={props.closed}>
          <span id='close__modal'>X</span>
        </Grid>
        {props.children}
      </Grid>
    </>
  );
};

export default Modal;
