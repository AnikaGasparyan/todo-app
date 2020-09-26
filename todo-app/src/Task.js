import React from 'react';
import './Task.css'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


export const Task = ({ task, onDone, onDelete }) => {
  return (
    <div className={`deleted-${task.isDeleted} list`}>
      <ListItem key={task.id} className={'priority-'+task.priority} >
        <ListItemIcon>
          <input 
            type='checkbox' 
            onClick={() => {
              let taskId = task.id;
              onDone(taskId) }}
            defaultChecked={!task.isActive}
            disabled={task.isDeleted}>
          </input>
        </ListItemIcon>
        <ListItemText primary={task.title} className={'isActive-'+ task.isActive} />
        <ListItemSecondaryAction>
          {task.date}
          <IconButton edge="end" aria-label="delete" onClick={() => {
            let taskId = task.id;
            onDelete(taskId)
          }}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  )
}