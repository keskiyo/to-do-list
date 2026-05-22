interface EmptyTasksProps {
	hasActiveTasks: boolean
}

export const EmptyTasks = ({ hasActiveTasks }: EmptyTasksProps) => (
	<div className='flex min-h-[360px] flex-col items-center justify-center px-6 text-center'>
		<div className='rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200'>
			{hasActiveTasks ? 'Ничего не найдено' : 'Список чистый'}
		</div>
		<h3 className='mt-4 text-2xl font-black text-slate-950 dark:text-white'>
			{hasActiveTasks ? 'Попробуйте другой фильтр' : 'Активных задач нет'}
		</h3>
		<p className='mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400'>
			Добавьте задачу, измените поисковый запрос или переключите фильтр, чтобы
			вернуть задачи на экран.
		</p>
	</div>
)
