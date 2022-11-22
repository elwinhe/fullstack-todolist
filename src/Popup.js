import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import AddCircle from '@mui/icons-material/AddCircle';
import BorderColor from '@mui/icons-material/BorderColor';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DoNotDisturbIcon from '@mui/icons-material/DoDisturb';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function Popup(obj) {
  return (
    <Dialog open={obj.openPopup} onClose={obj.handleClose}>
      <DialogTitle>
         <AppBar sx={{textAlign: 'right', position: 'absolute' }}>
           <Toolbar>
             <AddCircle fontSize="10px"/>
             <Typography component="div" variant="h8">&nbsp;Add Task</Typography>
           </Toolbar>
         </AppBar>
         <br></br>
       </DialogTitle>
       <DialogContent>
         <br></br>
         {!obj.editing && (<TextField type="text" id="title" label="Title" fullWidth value={obj.title} onChange={(e) => obj.setTitle(e.target.value)}error={obj.titleError || obj.uniqueTitleError}
             {...(obj.titleError ? { helperText: 'Title is Required!' } : {})} 
             {...(obj.uniqueTitleError ? { helperText: 'Title is not Unique!' } : {})}
           /> //title error checker
         )}
         <br></br>
         <br></br>
         <TextField type="text" id="description" label="Description" fullWidth value={obj.description} onChange={(e) => obj.setDescription(e.target.value)} error={obj.descriptionError}
             {...(obj.descriptionError ? { helperText: 'Description is Required!' } : {})}
         />
         <br></br>
         <br></br>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker label="Deadline" inputFormat="MM/DD/YYYY" value={obj.deadline} onChange={(e) =>  obj.setDeadline(e)} error={obj.deadlineError} 
              {...(obj.deadlineError ? { helperText: 'Date is Required!' } : {})} renderInput={(params) => <TextField {...params} />}/>
         </LocalizationProvider>
         <br></br>
         <br></br>
         <FormControl>
         <Typography component="div" variant="h7" sx={{ flexGrow: 1}}>Priority</Typography>
           <RadioGroup name="priority" aria-label="priority" row value={obj.priority} onChange={(e) => obj.setPriority(e.target.value)}>
             <FormControlLabel control={<Radio />} value="low" label="Low"/>
             <FormControlLabel control={<Radio />} value="med" label="Med"/>
             <FormControlLabel control={<Radio />} value="high" label="High"/>
           </RadioGroup>
         </FormControl>
        </DialogContent>

        <DialogActions>
          <button class="btn btn-primary" onClick={() => obj.handleAdd()}>
            {!obj.editing && <AddCircle fontSize="10px"/>}
            {!obj.editing && <AddCircle fontSize="10px"/> && 'Add'}
            {obj.editing && <BorderColor fontSize="18px"/>}
            {obj.editing && <BorderColor fontSize="18px"/> && 'Edit'}
          </button>
          <button class="btn btn-danger" onClick={() => obj.handleCancel()}> <DoNotDisturbIcon/>Cancel </button>
        </DialogActions>
    </Dialog>
  );
}
