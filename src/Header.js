import * as React from 'react';
import AddCircle from '@mui/icons-material/AddCircle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header(obj) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="div" variant="h5" sx={{ flexGrow: 1, textAlign: 'center' }}>≡ FRAMEWORKS</Typography>
        <button class="btn btn-dark" onClick={() => obj.popUp()}><AddCircle fontSize="10px"/> ADD </button>
      </Toolbar>
    </AppBar>
  );
}
