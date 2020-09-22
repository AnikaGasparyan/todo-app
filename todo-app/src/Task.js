import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete'
export const Task = ({ task }) => {
  return (
    <ListItem key={task.id}>
      <ListItemIcon>
        <Checkbox />
      </ListItemIcon>
      {task.title}
      <ListItemText />
      <ListItemSecondaryAction>
        {task.date}
        <IconButton edge="end" aria-label="delete">
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}