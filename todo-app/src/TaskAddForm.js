import React from 'react';
import './TaskContainer.css'
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import moment from '../node_modules/moment'
import { v4 as uuidv4 } from '../node_modules/uuid'
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export class TaskAddForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            task: {
                title: '',
                priority: '',
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (propertyName) => (event) => {
        this.setState({
            task: {
                ...this.state.task,
                [propertyName]: event.target.value,
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const { priority, title } = this.state.task;

        if (priority === '') {
            this.setState({
                error: "Selecting priority is required",
            });
        }
        else if (title.trim().length === 0) {
            this.setState({
                error: "Title is required",
            });
        }
        else {
            const submitData = {
                ...this.state.task,
                date: moment().format('Do MMM YYYY, hh:mm'),
                id: uuidv4(),
                title: title.trim(),
                isActive: true,
                isDeleted: false,
            };

            this.props.onSubmit(submitData);
            this.setState({
                error: "",
                task: {
                    title: '',
                    priority: ''
                }
            });
        }
    }

    render() {
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit}>
                    <TextField id="outlined-basic" label="What needs to be done?" variant="outlined"
                        value={this.state.task.title} onChange={this.handleChange('title')}
                    />

                    <Select
                        native
                        variant="outlined"
                        value={this.state.task.priority}
                        onChange={this.handleChange('priority')}
                        placeholder="Select priotiy"
                    >
                        <option value="" disabled>Select Priority</option>
                        <option value={'low'} >Low</option>
                        <option value={'normal'} >Normal</option>
                        <option value={'high'}>Important</option>
                    </Select>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={this.state.task.title === ''}
                        type="submit"
                    >
                        SUBMIT
                </Button>

                <div>
                   { this.state.error && <Alert severity="error">{this.state.error}</Alert> }
                </div>
                </form>
            </div>
        )
    }
}
