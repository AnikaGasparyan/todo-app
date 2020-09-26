import React from 'react';
import './TaskContainer.css'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export const Filters = ({ onFilter }) => {
  const btnStyle = { display: 'block', marginTop: '25px'}
  
  return (
    <div className='container'>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" disableElevation style={btnStyle}>
        <Button onClick={()=>onFilter('All')}>All</Button>
        <Button onClick={()=>onFilter('Active')}>Active</Button>
        <Button onClick={()=>onFilter('Done')}>Done</Button>
        <Button onClick={()=>onFilter('Deleted')}>Deleted</Button>
      </ButtonGroup>
    </div>
  )
}