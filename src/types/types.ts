export type Priority = 'low' | 'medium' | 'high'

export interface Task {
	id: string
	name: string
	verified: boolean
	createdAt: number
	priority: Priority
	important: boolean
	dueDate?: string
	description?: string
	completedAt?: number
}

export interface TodoList {
	id: string
	task: string
	listToDo: Task[]
	color: string
}

export type TodoAction =
	| {
			type: 'ADD_TASK'
			listId: string
			taskName: string
			priority: Priority
			dueDate?: string
			description?: string
	  }
	| { type: 'TOGGLE_TASK'; listId: string; taskId: string }
	| { type: 'TOGGLE_IMPORTANT'; listId: string; taskId: string }
	| { type: 'DELETE_TASK'; listId: string; taskId: string }
	| { type: 'CLEAR_COMPLETED'; listId: string }
	| { type: 'ADD_LIST'; listName: string; color: string }
	| { type: 'DELETE_LIST'; listId: string }
	| { type: 'RENAME_LIST'; listId: string; listName: string }
	| {
			type: 'EDIT_TASK'
			listId: string
			taskId: string
			newName: string
			priority: Priority
			dueDate?: string
			description?: string
	  }
