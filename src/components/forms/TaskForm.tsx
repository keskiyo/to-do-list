import type { FormEvent } from 'react'
import type { Priority } from '../../types/types'
import { priorityOptionLabels } from '../../constants/todoConfig'

interface TaskFormProps {
	taskName: string
	taskDescription: string
	taskPriority: Priority
	taskDueDate: string
	onTaskNameChange: (value: string) => void
	onTaskDescriptionChange: (value: string) => void
	onTaskPriorityChange: (value: Priority) => void
	onTaskDueDateChange: (value: string) => void
	onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export const TaskForm = ({
	taskName,
	taskDescription,
	taskPriority,
	taskDueDate,
	onTaskNameChange,
	onTaskDescriptionChange,
	onTaskPriorityChange,
	onTaskDueDateChange,
	onSubmit,
}: TaskFormProps) => (
	<form
		onSubmit={onSubmit}
		className='mt-5 grid min-w-0 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950 xl:grid-cols-[minmax(0,1fr)_150px_160px_auto]'
	>
		<div className='space-y-2 lg:col-span-1'>
			<input
				value={taskName}
				onChange={event => onTaskNameChange(event.target.value)}
				placeholder='Что нужно сделать?'
				className='w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-950'
			/>
			<input
				value={taskDescription}
				onChange={event => onTaskDescriptionChange(event.target.value)}
				placeholder='Заметка, если нужна'
				className='w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-950'
			/>
		</div>

		<select
			value={taskPriority}
			onChange={event => onTaskPriorityChange(event.target.value as Priority)}
			className='h-12 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-950'
		>
			{Object.entries(priorityOptionLabels).map(([value, label]) => (
				<option key={value} value={value}>
					{label}
				</option>
			))}
		</select>

		<input
			type='date'
			value={taskDueDate}
			onChange={event => onTaskDueDateChange(event.target.value)}
			className='h-12 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-blue-950'
		/>

		<button
			type='submit'
			className='h-12 rounded-md bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200'
		>
			Добавить
		</button>
	</form>
)
