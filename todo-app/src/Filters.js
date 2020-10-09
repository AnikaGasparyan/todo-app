import React from 'react';
import './TaskContainer.css'
import { Button, ButtonGroup } from '@material-ui/core';

export const Filters = ({ task, onFilter }) => {
  return (
    <div className='container'>
      <ButtonGroup variant="contained"
        color="primary" aria-label="contained primary button group"
        disableElevation
        className="btn-group">
        <Button className={"filter-"} onClick={() => onFilter('All')}>All</Button>
        <Button onClick={() => onFilter('Active')}>Active</Button>
        <Button onClick={() => onFilter('Done')}>Done</Button>
        <Button onClick={() => onFilter('Deleted')}>Deleted</Button>
      </ButtonGroup>
    </div>
  )
}