export interface Task {
	id: string
	name: string
	verified: boolean
	createdAt: number
}

export interface TodoList {
	id: string
	task: string
	listToDo: Task[]
}

export type TodoAction =
	| { type: 'ADD_TASK'; listId: string; taskName: string }
	| { type: 'TOGGLE_TASK'; listId: string; taskId: string }
	| { type: 'DELETE_TASK'; listId: string; taskId: string }
	| { type: 'CLEAR_COMPLETED'; listId: string }
	| { type: 'ADD_LIST'; listName: string }
	| { type: 'EDIT_TASK'; listId: string; taskId: string; newName: string }
