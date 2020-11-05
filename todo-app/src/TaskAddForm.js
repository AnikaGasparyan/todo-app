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
    date: '',
    isActive: true,
    id: '',
    isDeleted: false
};

export const TaskAddForm = (props) => {
    const [task, setTask] = useState(initialTaskState);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (event, propertyName) => {
        setTask({
            ...task,
            [propertyName]: event.target.value
        })
    }
    const handleSumbit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (task.priority === '') {
            return
        }

        const taskItem = {
            ...task,
            date: moment().format('Do MMM YYYY, hh:mm '),
            id: uuidv4(),
            title: task.title.trim(),
        };

        props.handleSubmit(taskItem);
        setIsSubmitted(false);
        setTask({
            ...initialTaskState
        });
    }

    return (
        <div className='container'>
            <form onSubmit={(e) => handleSumbit(e)}>
                <TextField id="outlined-basic" label="What needs to be done?" variant="outlined"
                    value={task.title} onChange={(e) => handleChange(e, 'title')}
                />

                <Select
                    native
                    variant="outlined"
                    value={task.priority}
                    onChange={(e) => handleChange(e, 'priority')}
                    placeholder="Select priority"
                >
                    <option value="" disabled>
                        Select Priority
                    </option>
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
                    {task.priority === '' && isSubmitted ? <Alert severity="error">Selecting priority is requiered</Alert> : ''}
                </div>
            </form>
        </div>
    )
}
