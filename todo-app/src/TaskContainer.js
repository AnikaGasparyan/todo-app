import React from 'react';
import { TaskAddForm } from './TaskAddForm';
import { Task } from './Task';
import { Filters } from './Filters';
import {Card, CardContent} from '@material-ui/core';

export class TaskContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: JSON.parse(localStorage.getItem('tasks')) || [],
            filter: 'All'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDone = this.onDone.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    handleSubmit = (task) => {
        const tasks = [
            ...this.state.tasks,
            task
        ];
        localStorage.setItem('tasks',JSON.stringify(tasks))
        this.setState({
            tasks   
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
                let tasks = this.state.tasks;
                localStorage.setItem('tasks',JSON.stringify(tasks));
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
        },
            () => {
                let tasks = this.state.tasks;
                localStorage.setItem('tasks',JSON.stringify(tasks));
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
                return tasks.filter((task) => task.isActive && !task.isDeleted);

            case 'Done':
                return tasks.filter((task) => !task.isActive && !task.isDeleted);

            case 'Deleted':
                return tasks.filter((task) => task.isDeleted);

            case 'All':
                return tasks.filter((task)=> !task.isDeleted);
            
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
                    <Filters task={this.state.tasks.task} onFilter={this.handleFilter} />
                </CardContent>    
            </Card>
        )
    }
} 