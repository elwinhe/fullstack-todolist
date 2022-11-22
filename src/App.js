import React from 'react';
import Heading from './Header.js';
import moment from 'moment';
import Popup from './Popup.js';
import TableLayout from './TableLayout.js';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import './style.css';

function addTask(id, title, description, deadline, priority, isComplete, action) {
  return { id, title, description, deadline, priority, isComplete, action };
}

export default function App() {
  const [idVal, setId] = React.useState(0);
  const [openPopup, setPopup] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [editingId, setEditingId] = React.useState(1);
  const [deadline, setDeadline] = React.useState(moment());
  const [priority, setPriority] = React.useState('low');
  const [titleError, setTitleError] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [uniqueTitleError, setUniqueTitleError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [deadlineError, setDeadlineError] = React.useState(false);
 
  function taskList(id, title, description, deadline, priority, isComplete, action) { //appends task in an array
    setTasks((arr) => arr.concat([addTask(id, title, description, deadline, priority, isComplete, action),]));
    setId(idVal + 1);
    toastr.success("Task Added Successfully", "", {"positionClass": "toast-bottom-right",});
    console.log(tasks);
  }

  const handleAdd = () => { //adds the task if the entries are valid
    console.log(title);
    if (title != '' && description != '' && deadline != null && tasks.findIndex((e) => e.title == title) == -1 && !editing) {
      taskList(idVal, title, description, deadline.format('MM/DD/YYYY'), priority, false, '');
      setId(idVal + 1);
      setPopup(false);
      resetForm();
    } else if (editing == true) {
      let updatedTask = tasks.find((e) => e.id == editingId);
      updatedTask.description = description;
      updatedTask.deadline = deadline.format('MM/DD/YYYY');
      updatedTask.priority = priority;
      setPopup(false);
      resetForm();
      toastr.success("Task Updated Successfully", "", {"positionClass": "toast-bottom-right",});
    }
    else {
      if (!title) {
        setTitleError(true);
      } else {
        setTitleError(false);
      }
      if (!deadline) {
        setDeadlineError(true);
      } else {
        setDeadlineError(false);
      }
      if (!editing && tasks.findIndex((e) => e.title == title) != -1) {
        setUniqueTitleError(true);
      } else {
        setUniqueTitleError(false);
      }
      if (!description) {
        setDescriptionError(true);
      } else {
        setDescriptionError(false);
      }
    }
  };

  function deleteTask(id) {
    setTasks((arr) => arr.filter((x) => x.id != id));
    toastr.success("Task Deleted Successfully", "", {"positionClass": "toast-bottom-right",});
  }

  const popUp = () => {
    setPopup(true);
  };

  function setComplete(id) {
    setTasks((arr) => arr.map((t) => (t.id === id ? { ...t, isComplete: 'changed' } : t)));
  }

  function openUpdate(id) {
    let updating = tasks.find((x) => x.id == id);
    setEditing(true);
    setPopup(true);
    setEditingId(id);
    setDescription(updating.description);
    setDeadline(moment(updating.deadline));
    setPriority(updating.priority);
  }

  const handleCancel = () => {
    resetForm();
    setPopup(false);
  };

  function resetForm() {
    setTitle('');
    setDescription('');
    setDeadline(moment());
    setPriority('low');
    setTitleError(false);
    setUniqueTitleError(false);
    setEditing(false);
    setDescriptionError(false);
    setDeadlineError(false);
  }
  const handleClose = () => {
    setPopup(false);
  };

  return (
    <div>
      <Popup
        openPopup={openPopup}
        setPopup={setPopup}
        popUp={popUp}
        handleAdd={handleAdd}
        handleClose={handleClose}
        handleCancel={handleCancel}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        setDeadline={setDeadline}
        deadlineError={deadlineError}
        setDeadlineError={setDeadlineError}
        priority={priority}
        setPriority={setPriority}
        editingId={editingId}
        editing={editing}
        titleError={titleError}
        descriptionError={descriptionError}
        deadline={deadline}
        uniqueTitleError={uniqueTitleError}
        editing={editing}
      />
      <Heading popUp={popUp} />
      <TableLayout
        rows={tasks}
        setId={setId}
        idVal={idVal}
        deleteTask={deleteTask}
        setComplete={setComplete}
        openUpdate={openUpdate}
      />
    </div>
  );
}


