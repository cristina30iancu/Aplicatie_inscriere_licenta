import React from 'react';
import Grid from '@mui/material/Grid';

const Backdrop = (props) =>
  props.show ? (
    <Grid className={'Backdrop'} onClick={props.clicked}></Grid>
  ) : null;

export default Backdrop;
