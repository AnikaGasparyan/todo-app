import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import moment from '../node_modules/moment'
import { v4 as uuidv4 } from '../node_modules/uuid'

export class TaskAddForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            task: {
                title: '',
                priority: '',
                date: '',
                isActive: 'true',
                id: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSumbit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            task: {
                ...this.state.task,
                title: event.target.value,
            }
        })
    }
    handleSelectChange(event) {
        this.setState({
            task: {
                ...this.state.task,
                priority: event.target.value
            }
        })
    }

    handleSubmit() {
        this.setState({
            task: {
                ...this.state.task,
                date: 'Added on ' + moment().format('Do MMM YYYY, hh:mm '),
                id: uuidv4(),
            }
        }, () => {
            this.props.handleSubmit(this.state.task);
            console.log(this.state.task)

        })
    }
    render() {
        return (
            <div style={{ display: "inline-flex" }}    >
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Task Title" variant="outlined"
                        value={this.state.task.title} onChange={this.handleChange}
                    />
                </form>
                <Select
                    native
                    labe="priority"
                    id="demo-simple-select"
                    value={this.state.task.priority}
                    onChange={this.handleSelectChange}

                >
                    <option defaultValue>Priority</option>
                    <option value={0} >Low</option>
                    <option value={1} >Normal</option>
                    <option value={2}>Important</option>
                </Select>
                <Button variant="contained" color="primary"
                    onClick={this.handleSumbit}
                >
                    Submit
            </Button>
            </div>
        )
    }
}
