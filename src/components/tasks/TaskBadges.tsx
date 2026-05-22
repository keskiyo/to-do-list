import type { Task } from '../../types/types'
import { priorityLabels } from '../../constants/todoConfig'
import { isOverdue } from '../../utils/taskUtils'

const priorityStyles = {
	low: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200',
	medium:
		'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200',
	high: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200',
}

const formatDate = (date?: string) => {
	if (!date) return ''

	return new Intl.DateTimeFormat('ru-RU', {
		month: 'short',
		day: 'numeric',
	}).format(new Date(`${date}T00:00:00`))
}

export const TaskBadges = ({ task }: { task: Task }) => (
	<div className='mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold'>
		<span className={`rounded-full border px-2.5 py-1 ${priorityStyles[task.priority]}`}>
			{priorityLabels[task.priority]}
		</span>

		{task.dueDate && (
			<span
				className={`rounded-full border px-2.5 py-1 ${
					isOverdue(task)
						? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200'
						: 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
				}`}
			>
				Срок: {formatDate(task.dueDate)}
			</span>
		)}
	</div>
)
