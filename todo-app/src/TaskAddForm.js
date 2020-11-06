import React, { useState } from 'react';
import './TaskContainer.css'
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const initialTaskState = {
    title: '',
    priority: '',
};

export const TaskAddForm = (props) => {
    const [task, setTask] = useState(initialTaskState);
    const [error, setError] = useState('');

    const handleChange = (propertyName) => (event) => {
        setTask({
            ...task,
            [propertyName]: event.target.value
        })
    }
    const handleSumbit = (e) => {
        e.preventDefault();
        

        if (task.priority === '') {
            setError('Selecting priority is requiered');
        }
        else if(task.title.trim().length === 0) {
            setError('Task title is requiered')
        }
        else {
            const submitData = {
                ...task,
                date: moment().format('Do MMM YYYY, hh:mm'),
                id: uuidv4(),
                title: task.title.trim(),
                isActive: true,
                isDeleted: false
            }
            props.handleSubmit(submitData);
            setError('')
            setTask({
                ...initialTaskState
            });
        }
    }

    return (
        <div className='container'>
            <form onSubmit={handleSumbit}>
                <TextField id="outlined-basic" label="What needs to be done?" variant="outlined"
                    value={task.title} onChange={handleChange('title')}
                />

                <Select
                    native
                    variant="outlined"
                    value={task.priority}
                    onChange={handleChange('priority')}
                    placeholder="Select priority"
                >
                    <option value="" disabled>Select Priority</option>
                    <option value={'low'} >Low</option>
                    <option value={'normal'} >Normal</option>
                    <option value={'high'}>Important</option>
                </Select>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={task.title === ''}
                    type="submit"
                >
                    SUBMIT
            </Button>
                <div>
                     {error &&  <Alert severity="error">{error}</Alert> }
                </div>
            </form>
        </div>
    )
}
