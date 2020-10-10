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
        super(props)
        this.state = {
            task: {
                title: '',
                priority: '',
                date: '',
                isActive: true,
                id: '',
                isDeleted: false
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSumbit = this.handleSubmit.bind(this);
    }

    handleChange(event, propertyName) {
        this.setState({
            task: {
                ...this.state.task,
                [propertyName]: event.target.value,
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.task.priority === ''){
             return 
        }
        this.setState({
            task: {
                ...this.state.task,
                date: moment().format('Do MMM YYYY, hh:mm '),
                id: uuidv4(),
                title: this.state.task.title.trim()
            }
        }, () => {
            if (!!this.state.task.title) {
                this.props.handleSubmit(this.state.task);
                this.setState({
                    task: {
                        isActive: true,
                        isDeleted: false,
                        title: '',
                        priority: ''
                    }
                })
            }

        })
    }
    
    render() {
        const errorMsg = <Alert severity="error">Selecting priority is requiered</Alert>;
        return (
            <div className='container'>
                <form onSubmit={(e) => this.handleSumbit(e)}>
                    <TextField id="outlined-basic" label="What needs to be done?" variant="outlined"
                        value={this.state.task.title} onChange={(e) => this.handleChange(e, 'title')}
                    />

                    <Select
                        native
                        variant="outlined"
                        value={this.state.task.priority}
                        onChange={(e) => this.handleChange(e, 'priority')}
                        placeholder="Select priotiy"
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
                        disabled={this.state.task.title === ''}
                        type="submit"
                    >
                        SUBMIT
                </Button>
                <div>
                   { this.state.task.priority===''? errorMsg : '' }
                </div>
                </form>
            </div>
        )
    }
}
