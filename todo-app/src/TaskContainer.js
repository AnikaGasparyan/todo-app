import React from 'react';
import { TaskAddForm } from './TaskAddForm';
import { Task } from './Task';

export class TaskContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tasks: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = (task) => {
        this.setState({
            tasks: [
                ...this.state.tasks,
                task
            ]
        });
    }
    render() {
        return (
            <>
                <TaskAddForm handleSubmit={this.handleSubmit} />
                {this.state.tasks.map((task) => <Task task={task} key={task.id} />)}
            </>
        )
    }
}