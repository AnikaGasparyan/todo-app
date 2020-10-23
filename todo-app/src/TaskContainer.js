import React, { useState } from 'react';
import { TaskAddForm } from './TaskAddForm';
import { Task } from './Task';
import { Filters } from './Filters';
import { Card, CardContent } from '@material-ui/core';

export const TaskContainer = () => {
    const initialTasksState = JSON.parse(localStorage.getItem('tasks')) || [];
    const [tasks, setTasks] = useState(initialTasksState);
    const [activeFilter, setActiveFilter] = useState('All');

    const handleSubmit = (task) => {
        const tasksItems = [
            ...tasks,
            task
        ];
        localStorage.setItem('tasks', JSON.stringify(tasks));
        setTasks(tasksItems);
    }
    const setCurrentTaskStatus = (taskId, currentState = {}) => {
        const taskList = tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    ...currentState
                }
            }
            return task
        });
        setTasks(taskList);
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }
    const onDone = (taskId,checked) => {
        setCurrentTaskStatus(taskId, { isActive: !checked })
    }

    const onDelete = (taskId) => {
        setCurrentTaskStatus(taskId, { isDeleted: true })
    }
    const handleFilter = (activeFilter) => {
        setActiveFilter(activeFilter);
    }
    const getFilteredTasks = () => {

        switch (activeFilter) {
            case 'Active':
                return tasks.filter((task) => task.isActive && !task.isDeleted);

            case 'Done':
                return tasks.filter((task) => !task.isActive && !task.isDeleted);

            case 'Deleted':
                return tasks.filter((task) => task.isDeleted);

            case 'All':
                return tasks.filter((task) => !task.isDeleted);

            default:
                return tasks
            }
        }

  
    const filteredTasks = getFilteredTasks();

        return (
            <Card>
                <CardContent>
                    <TaskAddForm handleSubmit={handleSubmit} />
                    {filteredTasks.map((task) => <Task task={task} key={task.id} onDone={onDone} onDelete={onDelete} currentFilter={activeFilter} />)}
                    <Filters currentFilter={activeFilter} onFilter={handleFilter} />
                </CardContent>
            </Card>
        )
    
} 