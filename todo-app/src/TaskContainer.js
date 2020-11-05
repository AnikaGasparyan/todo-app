import React, {useState, useEffect, useMemo} from 'react';
import {TaskAddForm} from './TaskAddForm';
import {Task} from './Task';
import {Filters} from './Filters';
import {Card, CardContent} from '@material-ui/core';

export const TaskContainer = () => {
	const initialTasksState = JSON.parse(localStorage.getItem('tasks')) || [];
	const [tasks, setTasks] = useState(initialTasksState);
	const [activeFilter, setActiveFilter] = useState('All');

	const handleSubmit = (task) => {
		const tasksItems = [
			...tasks,
			task,
		];
		setTasks(tasksItems);
	};
	const setCurrentTaskStatus = (taskId, props = {}) => {
		const taskList = tasks.map(task => {
			if (task.id === taskId) {
				return {
					...task,
					...props,
				};
			}
			return task;
		});
		setTasks(taskList);
	};
	const onDone = (taskId, checked) => {
		setCurrentTaskStatus(taskId, {isActive: !checked});
	};

	const onDelete = (taskId) => {
		setCurrentTaskStatus(taskId, {isDeleted: true});
	};

	const handleFilter = (activeFilter) => {
		setActiveFilter(activeFilter);
	};

	const filteredTasks = useMemo(() => {
		switch (activeFilter) {
			case 'Active':
				return tasks.filter((task) => task.isActive && !task.isDeleted);

			case 'Done':
				return tasks.filter(
					(task) => !task.isActive && !task.isDeleted);

			case 'Deleted':
				return tasks.filter((task) => task.isDeleted);

			case 'All':
				return tasks.filter((task) => !task.isDeleted);

			default:
				return tasks;
		}
	}, [activeFilter, tasks]);

	useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

	return (
		<Card>
			<CardContent>
				<TaskAddForm handleSubmit={handleSubmit}/>
				{filteredTasks.map(
					(task) => {
						const deleted = activeFilter === "Deleted";
						return <Task task={task} key={task.id} onDone={onDone}
						             onDelete={onDelete}
						             deleted={deleted}/>;
					})}
				<Filters currentFilter={activeFilter} onFilter={handleFilter}/>
			</CardContent>
		</Card>
	);

};
