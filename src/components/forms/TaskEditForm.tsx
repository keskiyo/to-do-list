import type { Priority } from '../../types/types'
import { priorityOptionLabels } from '../../constants/todoConfig'

interface TaskEditFormProps {
	name: string
	description: string
	priority: Priority
	dueDate: string
	onNameChange: (value: string) => void
	onDescriptionChange: (value: string) => void
	onPriorityChange: (value: Priority) => void
	onDueDateChange: (value: string) => void
	onSave: () => void
	onCancel: () => void
}

export const TaskEditForm = ({
	name,
	description,
	priority,
	dueDate,
	onNameChange,
	onDescriptionChange,
	onPriorityChange,
	onDueDateChange,
	onSave,
	onCancel,
}: TaskEditFormProps) => (
	<div className='space-y-3'>
		<input
			type='text'
			value={name}
			onChange={event => onNameChange(event.target.value)}
			onKeyDown={event => {
				if (event.key === 'Enter') onSave()
				if (event.key === 'Escape') onCancel()
			}}
			autoFocus
			className='w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base font-semibold text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-950'
		/>

		<textarea
			value={description}
			onChange={event => onDescriptionChange(event.target.value)}
			placeholder='Добавить заметку'
			rows={2}
			className='w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-950'
		/>

		<div className='grid gap-3 sm:grid-cols-[1fr_1fr_auto]'>
			<select
				value={priority}
				onChange={event => onPriorityChange(event.target.value as Priority)}
				className='rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-950'
			>
				{Object.entries(priorityOptionLabels).map(([value, label]) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</select>

			<input
				type='date'
				value={dueDate}
				onChange={event => onDueDateChange(event.target.value)}
				className='rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-950'
			/>

			<div className='flex gap-2'>
				<button
					type='button'
					onClick={onSave}
					className='rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200'
				>
					Сохранить
				</button>
				<button
					type='button'
					onClick={onCancel}
					className='rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
				>
					Отмена
				</button>
			</div>
		</div>
	</div>
)
