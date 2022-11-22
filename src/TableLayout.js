import * as React from 'react';
import BorderColor from '@mui/icons-material/BorderColor';
import Checkbox from '@mui/material/Checkbox';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function TableLayout(obj) {
  return (
    <TableContainer class="table">
      <Table aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Deadline</TableCell>
            <TableCell align="right">Priority</TableCell>
            <TableCell align="right">Is Complete</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {obj.rows?.map((row) => (
            <TableRow key={row.title}>
              <TableCell scope="row"> {row.title} </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.deadline}</TableCell>
              <TableCell align="right">{row.priority}</TableCell>
              <TableCell align="right"><Checkbox inputProps={{ 'aria-label': 'controlled' }} checked={row.isComplete} onChange={() => obj.setComplete(row.id)}/></TableCell>
              <TableCell align="right">{!row.isComplete && <button class="btn btn-primary" onClick={() => obj.openUpdate(row.id)}><BorderColor fontSize="small"/>UPDATE</button>}
              <br></br>
              <button class="btn btn-danger" onClick={() => obj.deleteTask(row.id)}><DoDisturbIcon />DELETE</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableLayout;