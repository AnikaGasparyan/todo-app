import React from 'react';
import { TaskAddForm } from './TaskAddForm';
import { Task } from './Task';
import { Filters } from './Filters';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


export class TaskContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            filter: 'All'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDone = this.onDone.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    handleSubmit = (task) => {
        this.setState({
            tasks: [
                ...this.state.tasks,
                task
            ]
        });
    }
    onDone = (taskId) => {
        this.setState({
            tasks: this.state.tasks.map(task => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        isActive: !task.isActive
                    }
                }
                return task
            })
        },
            () => {
                console.log(this.state.tasks)
            }
        )

    }
    onDelete = (taskId) => {
        this.setState({
            tasks: this.state.tasks.map(task => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        isDeleted: true,
                    }
                }
                return task
            })
        })
    }
    handleFilter = (filter) => {
        this.setState({
            filter: filter
        })
    }
    getFilteredTasks = () => {
        const { filter, tasks } = this.state;

        switch (filter) {
            case 'Active':
                return tasks.filter((task) => task.isActive);

            case 'Done':
                return tasks.filter((task) => !task.isActive);
                // <Checkbox checked/>

            case 'Deleted':
                return tasks.filter((task) => task.isDeleted);


            case 'All':
            default:
                return tasks
        }


    }

    render() {
        const tasks = this.getFilteredTasks();
        return (
            <Card>
                <CardContent>
                    <TaskAddForm handleSubmit={this.handleSubmit} />
                    {tasks.map((task) => <Task task={task} key={task.id} onDone={this.onDone} onDelete={this.onDelete} />)}
                    <Filters onFilter={this.handleFilter} />
                </CardContent>    
            </Card>
        )
    }
}   