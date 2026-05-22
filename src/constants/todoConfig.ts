import type { Priority, TodoList } from '../types/types'

export type DisplayState = 'all' | 'active' | 'completed' | 'important' | 'overdue'
export type SortMode = 'smart' | 'newest' | 'oldest' | 'priority'
export type ThemeMode = 'light' | 'dark' | 'system'

export const listColors = ['#2563eb', '#059669', '#f59e0b', '#e11d48', '#7c3aed']
export const themeStorageKey = 'todo-theme'

export const initialTodoLists: TodoList[] = [
	{
		id: 'personal',
		task: 'Личный спринт',
		color: '#2563eb',
		listToDo: [
			{
				id: 'starter-1',
				name: 'Спланировать день',
				verified: false,
				createdAt: Date.now() - 60000,
				priority: 'high',
				important: true,
				description: 'Выбрать три задачи, которые действительно важны.',
			},
			{
				id: 'starter-2',
				name: 'Разобрать старые заметки',
				verified: false,
				createdAt: Date.now() - 120000,
				priority: 'medium',
				important: false,
			},
		],
	},
	{
		id: 'work',
		task: 'Рабочая очередь',
		color: '#059669',
		listToDo: [],
	},
]

export const filterLabels: Record<DisplayState, string> = {
	all: 'Все',
	active: 'Активные',
	completed: 'Готово',
	important: 'Важные',
	overdue: 'Просрочены',
}

export const sortLabels: Record<SortMode, string> = {
	smart: 'Умная сортировка',
	priority: 'Сначала приоритет',
	newest: 'Сначала новые',
	oldest: 'Сначала старые',
}

export const priorityLabels: Record<Priority, string> = {
	low: 'Низкий',
	medium: 'Средний',
	high: 'Высокий',
}

export const priorityOptionLabels: Record<Priority, string> = {
	low: 'Низкий приоритет',
	medium: 'Средний приоритет',
	high: 'Высокий приоритет',
}

export const themeLabels: Record<ThemeMode, string> = {
	light: 'Светлая',
	dark: 'Темная',
	system: 'Системная',
}

export const priorityWeight: Record<Priority, number> = {
	high: 3,
	medium: 2,
	low: 1,
}
