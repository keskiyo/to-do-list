import type { TodoList, TodoAction, Task, Priority } from '../types/types'

const fallbackColors = ['#2563eb', '#059669', '#f59e0b', '#e11d48', '#7c3aed']

const createId = () =>
	`${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

const normalizePriority = (priority: unknown): Priority => {
	if (priority === 'low' || priority === 'medium' || priority === 'high') {
		return priority
	}

	return 'medium'
}

const listNameTranslations: Record<string, string> = {
	'Personal sprint': 'Личный спринт',
	'Work queue': 'Рабочая очередь',
	'Create First Target': 'Первый список',
	'My First Todo List': 'Мой первый список',
}

const taskNameTranslations: Record<string, string> = {
	'Plan the day': 'Спланировать день',
	'Clean up old notes': 'Разобрать старые заметки',
}

const descriptionTranslations: Record<string, string> = {
	'Pick the three tasks that actually matter.':
		'Выбрать три задачи, которые действительно важны.',
}

const translateSavedText = (
	value: string | undefined,
	translations: Record<string, string>,
	fallback: string
) => {
	if (!value) return fallback

	return translations[value] || value
}

export const createTask = (
	name: string,
	priority: Priority,
	dueDate?: string,
	description?: string
): Task => ({
	id: createId(),
	name,
	verified: false,
	createdAt: Date.now(),
	priority,
	important: false,
	dueDate: dueDate || undefined,
	description: description || undefined,
})

export const createList = (
	listName: string,
	color = fallbackColors[0]
): TodoList => ({
	id: createId(),
	task: listName,
	listToDo: [],
	color,
})

export const normalizeTodoLists = (todos: TodoList[]): TodoList[] =>
	todos.map((list, index) => ({
		id: list.id || createId(),
		task: translateSavedText(list.task, listNameTranslations, 'Без названия'),
		color: list.color || fallbackColors[index % fallbackColors.length],
		listToDo: (list.listToDo || []).map(task => ({
			id: task.id || createId(),
			name: translateSavedText(task.name, taskNameTranslations, 'Новая задача'),
			verified: Boolean(task.verified),
			createdAt: task.createdAt || Date.now(),
			priority: normalizePriority(task.priority),
			important: Boolean(task.important),
			dueDate: task.dueDate || undefined,
			description: task.description
				? translateSavedText(task.description, descriptionTranslations, '')
				: undefined,
			completedAt: task.completedAt,
		})),
	}))

export const todoReducer = (
	state: TodoList[],
	action: TodoAction
): TodoList[] => {
	switch (action.type) {
		case 'ADD_TASK':
			return state.map(list =>
				list.id === action.listId
					? {
							...list,
							listToDo: [
								...list.listToDo,
								createTask(
									action.taskName,
									action.priority,
									action.dueDate,
									action.description
								),
							],
					  }
					: list
			)

		case 'TOGGLE_TASK':
			return state.map(list =>
				list.id === action.listId
					? {
						...list,
						listToDo: list.listToDo.map(task =>
							task.id === action.taskId
								? {
										...task,
										verified: !task.verified,
										completedAt: task.verified ? undefined : Date.now(),
								  }
								: task
						),
				  }
					: list
			)

		case 'TOGGLE_IMPORTANT':
			return state.map(list =>
				list.id === action.listId
					? {
							...list,
							listToDo: list.listToDo.map(task =>
								task.id === action.taskId
									? { ...task, important: !task.important }
									: task
							),
					  }
					: list
			)

		case 'DELETE_TASK':
			return state.map(list =>
				list.id === action.listId
					? {
							...list,
							listToDo: list.listToDo.filter(task => task.id !== action.taskId),
					  }
					: list
			)

		case 'CLEAR_COMPLETED':
			return state.map(list =>
				list.id === action.listId
					? {
							...list,
							listToDo: list.listToDo.filter(task => !task.verified),
					  }
					: list
			)

		case 'ADD_LIST':
			return [
				...state,
				createList(action.listName, action.color),
			]

		case 'DELETE_LIST':
			return state.filter(list => list.id !== action.listId)

		case 'RENAME_LIST':
			return state.map(list =>
				list.id === action.listId ? { ...list, task: action.listName } : list
			)

		case 'EDIT_TASK':
			return state.map(list =>
				list.id === action.listId
					? {
							...list,
							listToDo: list.listToDo.map(task =>
								task.id === action.taskId
									? {
											...task,
											name: action.newName,
											priority: action.priority,
											dueDate: action.dueDate || undefined,
											description: action.description || undefined,
									  }
									: task
							),
					  }
					: list
			)

		default:
			return state
	}
}

export const getCompletedCount = (tasks: Task[]): number => {
	return tasks.filter(task => task.verified).length
}

export const getActiveCount = (tasks: Task[]): number => {
	return tasks.filter(task => !task.verified).length
}

export const saveToLocalStorage = (todos: TodoList[]) => {
	try {
		if (typeof localStorage === 'undefined') return

		localStorage.setItem('todos', JSON.stringify(todos))
	} catch (error) {
		console.error('Failed to save todos to localStorage', error)
	}
}

export const loadFromLocalStorage = (): TodoList[] => {
	try {
		if (typeof localStorage === 'undefined') return []

		const saved = localStorage.getItem('todos')
		return saved ? normalizeTodoLists(JSON.parse(saved)) : []
	} catch (error) {
		console.error('Failed to load todos from localStorage', error)
		return []
	}
}
