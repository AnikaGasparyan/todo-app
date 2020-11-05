import React from 'react';
import './Task.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';


export const Task = ({ task, onDone, onDelete, disabled }) => {
  const handleClick = () => {
    onDone(task.id);
  }

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div className={`list ${disabled ? 'disabled' : ''}`}>
      <ListItem
        className={`priority-${task.priority}`}
        dense
        disabled={task.isDeleted}
        onClick={handleClick}
         >
        <ListItemIcon>
          <Checkbox
            onClick={handleClick}
            checked={!task.isActive}
            disabled={task.isDeleted}
            edge="start"
          />
        </ListItemIcon>
        <ListItemText primary={task.title} className={`isActive-${task.isActive} task`} />
        <ListItemSecondaryAction>
          Added on {task.date}
          <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  )
}
