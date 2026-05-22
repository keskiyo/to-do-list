import { useEffect, useMemo, useReducer, useState } from 'react'
import type { FormEvent } from 'react'
import type { Priority } from '../types/types'
import type { DisplayState, SortMode } from '../constants/todoConfig'
import { initialTodoLists, listColors } from '../constants/todoConfig'
import {
	getActiveCount,
	getCompletedCount,
	loadFromLocalStorage,
	saveToLocalStorage,
	todoReducer,
} from '../helpers/todoHelpers'
import { getCompletionPercent, getVisibleTasks } from '../utils/taskUtils'

export const useTodoBoard = () => {
	const [state, dispatch] = useReducer(todoReducer, initialTodoLists, () => {
		const savedTodos = loadFromLocalStorage()

		return savedTodos.length > 0 ? savedTodos : initialTodoLists
	})
	const [displayState, setDisplayState] = useState<DisplayState>('all')
	const [sortMode, setSortMode] = useState<SortMode>('smart')
	const [searchQuery, setSearchQuery] = useState('')
	const [isMenuOpen, setIsMenuOpen] = useState(true)
	const [currentListId, setCurrentListId] = useState(state[0]?.id || '')
	const [taskName, setTaskName] = useState('')
	const [taskPriority, setTaskPriority] = useState<Priority>('medium')
	const [taskDueDate, setTaskDueDate] = useState('')
	const [taskDescription, setTaskDescription] = useState('')
	const [listName, setListName] = useState('')
	const [selectedColor, setSelectedColor] = useState(listColors[0])

	useEffect(() => saveToLocalStorage(state), [state])

	useEffect(() => {
		if (state.length > 0 && !state.some(list => list.id === currentListId)) {
			setCurrentListId(state[0].id)
		}
	}, [currentListId, state])

	const currentList = state.find(list => list.id === currentListId) || state[0]
	const allTasks = useMemo(
		() => state.flatMap(list => list.listToDo),
		[state]
	)
	const filteredTasks = useMemo(
		() =>
			getVisibleTasks(
				currentList?.listToDo || [],
				displayState,
				searchQuery,
				sortMode
			),
		[currentList, displayState, searchQuery, sortMode]
	)

	const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!currentList || !taskName.trim()) return

		dispatch({
			type: 'ADD_TASK',
			listId: currentList.id,
			taskName: taskName.trim(),
			priority: taskPriority,
			dueDate: taskDueDate || undefined,
			description: taskDescription.trim() || undefined,
		})
		setTaskName('')
		setTaskDescription('')
	}

	const handleAddList = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!listName.trim()) return

		dispatch({
			type: 'ADD_LIST',
			listName: listName.trim(),
			color: selectedColor,
		})
		setListName('')
		setSelectedColor(
			listColors[(listColors.indexOf(selectedColor) + 1) % listColors.length]
		)
	}

	const handleRenameList = () => {
		if (!currentList) return

		const nextName = window
			.prompt('Переименовать список', currentList.task)
			?.trim()

		if (nextName) {
			dispatch({
				type: 'RENAME_LIST',
				listId: currentList.id,
				listName: nextName,
			})
		}
	}

	const handleDeleteList = () => {
		if (!currentList || state.length <= 1) return

		dispatch({ type: 'DELETE_LIST', listId: currentList.id })
	}

	const dispatchTaskAction =
		(type: 'TOGGLE_TASK' | 'TOGGLE_IMPORTANT' | 'DELETE_TASK') =>
		(taskId: string) => {
			if (!currentList) return

			dispatch({ type, listId: currentList.id, taskId })
		}

	const handleEditTask = (
		taskId: string,
		newName: string,
		priority: Priority,
		dueDate?: string,
		description?: string
	) => {
		if (!currentList) return

		dispatch({
			type: 'EDIT_TASK',
			listId: currentList.id,
			taskId,
			newName,
			priority,
			dueDate,
			description,
		})
	}

	return {
		state,
		currentList,
		currentListId,
		displayState,
		filteredTasks,
		isMenuOpen,
		listActive: currentList ? getActiveCount(currentList.listToDo) : 0,
		listName,
		listProgress: currentList ? getCompletionPercent(currentList.listToDo) : 0,
		searchQuery,
		selectedColor,
		sortMode,
		taskDescription,
		taskDueDate,
		taskName,
		taskPriority,
		totalActive: getActiveCount(allTasks),
		totalCompleted: getCompletedCount(allTasks),
		handleAddList,
		handleAddTask,
		handleDeleteList,
		handleEditTask,
		handleRenameList,
		setCurrentListId,
		setDisplayState,
		setIsMenuOpen,
		setListName,
		setSearchQuery,
		setSelectedColor,
		setSortMode,
		setTaskDescription,
		setTaskDueDate,
		setTaskName,
		setTaskPriority,
		toggleTask: dispatchTaskAction('TOGGLE_TASK'),
		toggleImportant: dispatchTaskAction('TOGGLE_IMPORTANT'),
		deleteTask: dispatchTaskAction('DELETE_TASK'),
		clearCompleted: () =>
			currentList &&
			dispatch({
				type: 'CLEAR_COMPLETED',
				listId: currentList.id,
			}),
	}
}
