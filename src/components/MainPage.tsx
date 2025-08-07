//
// Сделать чтобы создавало с 0 Target с который можно сразу удалять или отмечать что комплит ( или сделать пометку что при 1 запуске нужно создать новый Target)
//

import React, { useReducer, useState, useEffect, useRef } from 'react'
import type { TodoList, Task } from '../types/types'
import {
	todoReducer,
	getCompletedCount,
	loadFromLocalStorage,
} from '../helpers/todoHelpers'
import { TaskItem } from './TaskItem'
import '../style/style.css'

const initialState: TodoList[] = [
	{
		id: '1',
		task: 'Create First Target',
		listToDo: [],
	},
]

export const MainPage = () => {
	const [state, dispatch] = useReducer(
		todoReducer,
		loadFromLocalStorage() || initialState
	)
	const [displayState, setDisplayState] = useState<
		'all' | 'active' | 'completed'
	>('all')
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const [currentListId, setCurrentListId] = useState(state[0]?.id || '1')

	useEffect(() => {
		if (state.length > 0 && !currentListId) {
			setCurrentListId(state[0].id)
		}
	}, [state, currentListId])

	const didRun = useRef(false)

	useEffect(() => {
		if (didRun.current) return
		didRun.current = true

		if (!loadFromLocalStorage() || loadFromLocalStorage().length === 0) {
			dispatch({ type: 'ADD_LIST', listName: 'My First Todo List' })
		}
	}, [])

	const handleAddTask = (
		e: React.FormEvent<HTMLFormElement>,
		listId: string
	) => {
		e.preventDefault()
		const form = e.currentTarget
		const input = form.elements.namedItem('task') as HTMLInputElement
		const taskName = input.value.trim()

		if (taskName) {
			dispatch({ type: 'ADD_TASK', listId, taskName })
			input.value = ''
		}
	}

	const handleAddList = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.currentTarget
		const input = form.elements.namedItem('TargetInput') as HTMLInputElement
		const listName = input.value.trim()

		if (listName) {
			dispatch({ type: 'ADD_LIST', listName })
			input.value = ''
		}
	}

	const currentList =
		state.find(list => list.id === currentListId) || initialState[0]

	const currentTasks = currentList?.listToDo || []

	const filteredTasks = currentTasks.filter((task: Task) => {
		if (displayState === 'active') return !task.verified
		if (displayState === 'completed') return task.verified
		return true
	})

	return (
		<div className='min-h-screen bg-gray-100 dark:bg-gray-800 py-8'>
			<div className='max-w-4xl mx-auto px-4'>
				<h1 className='text-5xl font-thin text-red-200 dark:text-red-300 text-center mb-8'>
					todos
				</h1>

				<div className='flex w-full'>
					{/* Sidebar */}
					<div
						className={`h-[100%] ${
							isMenuOpen ? 'w-[400px]' : 'w-[0px]'
						} bg-white dark:bg-gray-700 overflow-hidden rounded transition-all duration-200 shadow-lg`}
					>
						<div className='flex flex-col'>
							<div className='w-[100%] flex items-center p-[20px] h-[70px] border-b border-solid dark:border-gray-600'>
								<form
									onSubmit={handleAddList}
									className='flex gap-[10px] w-full'
								>
									<button
										type='submit'
										className='hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-pointer border border-solid rounded p-[5px]'
									>
										Add Target
									</button>
									<input
										name='TargetInput'
										type='text'
										placeholder='Type Here'
										className='flex-1 dark:bg-gray-200 dark:text-white'
									/>
								</form>
							</div>

							{state.map(list => (
								<div
									key={list.id}
									onClick={() => setCurrentListId(list.id)}
									className={`hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer p-[10px] w-[100%] flex justify-between border-b border-solid dark:border-gray-600 items-center ${
										currentListId === list.id
											? 'bg-gray-200 dark:bg-gray-600'
											: ''
									}`}
								>
									<span className='dark:text-white'>{list.task}</span>
									<span className='dark:text-gray-300'>
										{list.listToDo.length} items
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Main Content */}
					<div className='relative min-h-[500px] w-full flex justify-center items-center'>
						<div className='w-full max-w-[700px] px-4'>
							<form
								className='w-[100%] h-[40px] rounded flex mb-[5px] gap-[5px]'
								onSubmit={e => handleAddTask(e, currentListId)}
							>
								<button
									type='submit'
									className='cursor-pointer bg-white dark:bg-gray-700 dark:text-white w-[100px] p-[10px] rounded flex justify-center shadow-lg'
								>
									Add Task
								</button>
								<input
									name='task'
									className='h-[100%] w-[100%] text-[20px] px-[5px] bg-white dark:bg-gray-700 dark:text-white shadow-lg'
									placeholder='Type here'
								/>
							</form>

							<div className='bg-white dark:bg-gray-700 h-[400px] rounded shadow-lg flex flex-col font-thin'>
								<div className='h-[70px] w-[100%] flex text-[25px] items-center px-[25px] border-b border-solid dark:border-gray-600 gap-[30px] text-gray-400 dark:text-gray-300'>
									<button
										onClick={() => setIsMenuOpen(prev => !prev)}
										className={`cursor-pointer text-[20px] ${
											isMenuOpen ? 'rotate-90' : ''
										} transition-all duration-200`}
									>
										ᐯ
									</button>
									<span className='italic dark:text-white'>
										{currentList.task}
									</span>
								</div>

								<div className='overflow-y-auto flex-1'>
									{filteredTasks.map((task: Task) => (
										<TaskItem
											key={task.id}
											task={task}
											onToggle={() =>
												dispatch({
													type: 'TOGGLE_TASK',
													listId: currentListId,
													taskId: task.id,
												})
											}
											onDelete={() =>
												dispatch({
													type: 'DELETE_TASK',
													listId: currentListId,
													taskId: task.id,
												})
											}
											onEdit={newName =>
												dispatch({
													type: 'EDIT_TASK',
													listId: currentListId,
													taskId: task.id,
													newName,
												})
											}
										/>
									))}
								</div>

								<div className='bg-white dark:bg-gray-700 flex items-center h-[50px] text-gray-400 dark:text-gray-300 w-[100%] border-t border-solid dark:border-gray-600 px-[20px] justify-between'>
									<span>{getCompletedCount(currentList.listToDo)} left</span>

									<div className='flex gap-[10px]'>
										<button
											className={`cursor-pointer w-[50px] hover:text-gray-900 dark:hover:text-white transition rounded p-[5px] ${
												displayState === 'all' ? 'border border-solid' : ''
											}`}
											onClick={() => setDisplayState('all')}
										>
											All
										</button>
										<button
											className={`cursor-pointer hover:text-gray-900 dark:hover:text-white transition rounded p-[5px] ${
												displayState === 'active' ? 'border border-solid' : ''
											}`}
											onClick={() => setDisplayState('active')}
										>
											Active
										</button>
										<button
											className={`cursor-pointer hover:text-gray-900 dark:hover:text-white transition rounded p-[5px] ${
												displayState === 'completed'
													? 'border border-solid'
													: ''
											}`}
											onClick={() => setDisplayState('completed')}
										>
											Completed
										</button>
									</div>

									<button
										onClick={() =>
											dispatch({
												type: 'CLEAR_COMPLETED',
												listId: currentListId,
											})
										}
										className='cursor-pointer hover:text-gray-900 dark:hover:text-white transition'
									>
										Clear Completed
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MainPage
