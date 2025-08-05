import type { TodoList, TodoAction, Task } from '../types/types'

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
								{
									id: Date.now().toString(),
									name: action.taskName,
									verified: false,
									createdAt: Date.now(),
								},
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
									? { ...task, verified: !task.verified }
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
				{
					id: Date.now().toString(),
					task: action.listName,
					listToDo: [],
				},
			]

		case 'EDIT_TASK':
			return state.map(list =>
				list.id === action.listId
					? {
							...list,
							listToDo: list.listToDo.map(task =>
								task.id === action.taskId
									? { ...task, name: action.newName }
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

export const saveToLocalStorage = (todos: TodoList[]) => {
	try {
		localStorage.setItem('todos', JSON.stringify(todos))
	} catch (error) {
		console.error('Failed to save todos to localStorage', error)
	}
}

export const loadFromLocalStorage = (): TodoList[] => {
	try {
		const saved = localStorage.getItem('todos')
		return saved ? JSON.parse(saved) : []
	} catch (error) {
		console.error('Failed to load todos from localStorage', error)
		return []
	}
}
