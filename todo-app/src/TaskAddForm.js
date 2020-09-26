import React from 'react';
import './TaskContainer.css'
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
                isActive: true,
                id: '',
                isDeleted: false
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSumbit = this.handleSubmit.bind(this);
    }

    handleChange(event,propertyName) {
        this.setState({
            task: {
                ...this.state.task,
                [propertyName]: event.target.value,
            }
        })
    }
    
    handleSubmit() {
        this.setState({
            task: {
                ...this.state.task,
                date: moment().format('Do MMM YYYY, hh:mm '),
                id: uuidv4(),
                title:this.state.task.title.trim()
            }
        }, () => {
            if(!!this.state.task.title){
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
        return (
            <div className='container'>
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="What needs to be done?" variant="outlined"
                        value={this.state.task.title} onChange={(e)=>this.handleChange(e,'title')}
                    />
                </form>
                <Select
                    native
                    variant="outlined"
                    labe="priority"
                    id="demo-simple-select"
                    value={this.state.task.priority}
                    onChange={(e)=>this.handleChange(e,'priority')}

                >
                    <option defaultValue>Priority</option>
                    <option value={0} >Low</option>
                    <option value={1} >Normal</option>
                    <option value={2}>Important</option>
                </Select>
                <Button variant="contained" color="primary"
                    onClick={this.handleSumbit}
                     disabled={this.state.task.title===''}
                >
                    Submit
            </Button>
            </div>
        )
    }
}
