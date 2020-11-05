import React from 'react';
import { TaskAddForm } from './TaskAddForm';
import { Task } from './Task';
import { Filters } from './Filters';
import {Card, CardContent} from '@material-ui/core';

export class TaskContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: this.getLocalData(),
            activeFilter: 'All'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDone = this.onDone.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    getLocalData = () => {
        try {
            return JSON.parse(localStorage.getItem('tasks')) || [];
        }
        catch (ex) {
            return  [];
        }
    }
    updateLocalData = () => {
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }
    handleSubmit = (task) => {
        this.setState(prevState => {
            return {
                ...prevState,
                tasks: [
                    ...prevState.tasks,
                    task,
                ]
            }
        }, () => {
            this.updateLocalData();
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
        }, () => {
            this.updateLocalData();
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
                this.updateLocalData();
            })
    }
    handleFilter = (activeFilter) => {
        this.setState({ activeFilter });
    }
    getFilteredTasks = () => {
        const { activeFilter, tasks } = this.state;


        switch (activeFilter) {
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
                    <TaskAddForm onSubmit={this.handleSubmit} />
                    {tasks.map((task) => {
                        const disabled = this.state.activeFilter === "Deleted";
                        return <Task task={task} key={task.id} onDone={this.onDone} onDelete={this.onDelete} disabled={disabled} />;
                    })}
                    <Filters currentFilter={this.state.activeFilter} onFilter={this.handleFilter} />
                </CardContent>
            </Card>
        )
    }
}
