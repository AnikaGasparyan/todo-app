import React from 'react';
import './TaskContainer.css'
import { ButtonGroup, Button } from '@material-ui/core';

export const Filters = ({ onFilter, currentFilter }) => {
  return (
    <div className='container'>
      <ButtonGroup variant="contained"
        color="primary" aria-label="contained primary button group"
        disableElevation
        className="btn-group">
        <Button onClick={() => onFilter('All')}  color={currentFilter === 'All' ? 'secondary': 'primary'}>All</Button>
        <Button onClick={() => onFilter('Active')} color={currentFilter === 'Active' ? 'secondary': 'primary'}>Active</Button>
        <Button onClick={() => onFilter('Done')} color={currentFilter === 'Done' ? 'secondary': 'primary'}>Done </Button>
        <Button onClick={() => onFilter('Deleted')} color={currentFilter === 'Deleted' ? 'secondary': 'primary'}>Deleted </Button>
      </ButtonGroup>
    </div>
  )
}