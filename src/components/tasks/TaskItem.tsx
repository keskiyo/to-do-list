import React, { useEffect, useState } from 'react'
import type { Priority, Task } from '../../types/types'
import { TaskEditForm } from '../forms/TaskEditForm'
import { TaskView } from './TaskView'

interface TaskItemProps {
	task: Task
	onToggle: () => void
	onToggleImportant: () => void
	onDelete: () => void
	onEdit: (
		newName: string,
		priority: Priority,
		dueDate?: string,
		description?: string
	) => void
}

export const TaskItem = React.memo(
	({ task, onToggle, onToggleImportant, onDelete, onEdit }: TaskItemProps) => {
		const [isEditing, setIsEditing] = useState(false)
		const [editName, setEditName] = useState(task.name)
		const [editPriority, setEditPriority] = useState<Priority>(task.priority)
		const [editDueDate, setEditDueDate] = useState(task.dueDate || '')
		const [editDescription, setEditDescription] = useState(
			task.description || ''
		)

		useEffect(() => {
			if (!isEditing) {
				setEditName(task.name)
				setEditPriority(task.priority)
				setEditDueDate(task.dueDate || '')
				setEditDescription(task.description || '')
			}
		}, [isEditing, task.description, task.dueDate, task.name, task.priority])

		const resetForm = () => {
			setEditName(task.name)
			setEditPriority(task.priority)
			setEditDueDate(task.dueDate || '')
			setEditDescription(task.description || '')
		}

		const handleSave = () => {
			const nextName = editName.trim()

			if (!nextName) return

			onEdit(
				nextName,
				editPriority,
				editDueDate || undefined,
				editDescription.trim() || undefined
			)
			setIsEditing(false)
		}

		const handleCancel = () => {
			resetForm()
			setIsEditing(false)
		}

		return (
			<article
				className={`group border-b border-slate-200 bg-white px-4 py-4 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 sm:px-5 ${
					task.verified ? 'opacity-75' : ''
				}`}
			>
				<div className='flex items-start gap-3'>
					<button
						type='button'
						onClick={onToggle}
						aria-label={task.verified ? 'Сделать активной' : 'Завершить'}
						className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border text-sm font-bold transition ${
							task.verified
								? 'border-emerald-500 bg-emerald-500 text-white'
								: 'border-slate-300 bg-white text-transparent hover:border-emerald-500 dark:border-slate-600 dark:bg-slate-950'
						}`}
					>
						✓
					</button>

					{isEditing ? (
						<div className='min-w-0 flex-1'>
							<TaskEditForm
								name={editName}
								description={editDescription}
								priority={editPriority}
								dueDate={editDueDate}
								onNameChange={setEditName}
								onDescriptionChange={setEditDescription}
								onPriorityChange={setEditPriority}
								onDueDateChange={setEditDueDate}
								onSave={handleSave}
								onCancel={handleCancel}
							/>
						</div>
					) : (
						<TaskView
							task={task}
							onStartEdit={() => setIsEditing(true)}
							onToggleImportant={onToggleImportant}
							onDelete={onDelete}
						/>
					)}
				</div>
			</article>
		)
	}
)
