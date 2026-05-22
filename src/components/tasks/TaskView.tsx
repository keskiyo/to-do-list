import type { Task } from '../../types/types'
import { TaskBadges } from './TaskBadges'

interface TaskViewProps {
	task: Task
	onStartEdit: () => void
	onToggleImportant: () => void
	onDelete: () => void
}

export const TaskView = ({
	task,
	onStartEdit,
	onToggleImportant,
	onDelete,
}: TaskViewProps) => (
	<>
		<div className='min-w-0 flex-1'>
			<div className='flex flex-wrap items-center gap-2'>
				<button
					type='button'
					onClick={onToggleImportant}
					aria-label={task.important ? 'Убрать важность' : 'Отметить важной'}
					className={`rounded-md border px-2 py-1 text-xs font-bold transition ${
						task.important
							? 'border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200'
							: 'border-slate-200 text-slate-400 hover:text-amber-600 dark:border-slate-700 dark:text-slate-500 dark:hover:text-amber-300'
					}`}
				>
					!
				</button>

				<button
					type='button'
					onDoubleClick={onStartEdit}
					className={`min-w-0 text-left text-base font-semibold leading-6 text-slate-950 transition dark:text-white ${
						task.verified ? 'line-through text-slate-400 dark:text-slate-500' : ''
					}`}
				>
					{task.name}
				</button>
			</div>

			{task.description && (
				<p className='mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400'>
					{task.description}
				</p>
			)}

			<TaskBadges task={task} />
		</div>

		<div className='flex shrink-0 gap-2'>
			<button
				type='button'
				onClick={onStartEdit}
				className='rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-900 dark:hover:bg-blue-950 dark:hover:text-blue-200'
			>
				Изменить
			</button>
			<button
				type='button'
				onClick={onDelete}
				className='rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-900 dark:hover:bg-rose-950 dark:hover:text-rose-200'
			>
				Удалить
			</button>
		</div>
	</>
)
