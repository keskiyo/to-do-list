import type { Task } from '../types/types'
import type { DisplayState, SortMode } from '../constants/todoConfig'
import { priorityWeight } from '../constants/todoConfig'
import { getCompletedCount } from '../helpers/todoHelpers'

export const isOverdue = (task: Task) => {
	if (!task.dueDate || task.verified) return false

	const today = new Date()
	today.setHours(0, 0, 0, 0)

	return new Date(`${task.dueDate}T00:00:00`) < today
}

const isDueToday = (task: Task) => {
	if (!task.dueDate) return false

	return task.dueDate === new Date().toISOString().slice(0, 10)
}

export const getCompletionPercent = (tasks: Task[]) => {
	if (tasks.length === 0) return 0

	return Math.round((getCompletedCount(tasks) / tasks.length) * 100)
}

export const filterTasks = (
	tasks: Task[],
	displayState: DisplayState,
	searchQuery: string
) => {
	const normalizedQuery = searchQuery.trim().toLowerCase()

	return tasks.filter(task => {
		const matchesFilter =
			displayState === 'all' ||
			(displayState === 'active' && !task.verified) ||
			(displayState === 'completed' && task.verified) ||
			(displayState === 'important' && task.important) ||
			(displayState === 'overdue' && isOverdue(task))

		const matchesSearch =
			!normalizedQuery ||
			task.name.toLowerCase().includes(normalizedQuery) ||
			(task.description || '').toLowerCase().includes(normalizedQuery)

		return matchesFilter && matchesSearch
	})
}

export const sortTasks = (tasks: Task[], sortMode: SortMode) => {
	const sortedTasks = [...tasks]

	if (sortMode === 'newest') {
		return sortedTasks.sort((left, right) => right.createdAt - left.createdAt)
	}

	if (sortMode === 'oldest') {
		return sortedTasks.sort((left, right) => left.createdAt - right.createdAt)
	}

	if (sortMode === 'priority') {
		return sortedTasks.sort(
			(left, right) =>
				priorityWeight[right.priority] - priorityWeight[left.priority]
		)
	}

	return sortedTasks.sort((left, right) => {
		if (left.verified !== right.verified) return left.verified ? 1 : -1
		if (left.important !== right.important) return left.important ? -1 : 1
		if (isOverdue(left) !== isOverdue(right)) return isOverdue(left) ? -1 : 1
		if (isDueToday(left) !== isDueToday(right)) return isDueToday(left) ? -1 : 1

		return priorityWeight[right.priority] - priorityWeight[left.priority]
	})
}

export const getVisibleTasks = (
	tasks: Task[],
	displayState: DisplayState,
	searchQuery: string,
	sortMode: SortMode
) => sortTasks(filterTasks(tasks, displayState, searchQuery), sortMode)
