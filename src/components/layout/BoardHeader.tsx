import type { TodoList } from '../../types/types'

interface BoardHeaderProps {
	currentList: TodoList
	listProgress: number
	canDeleteList: boolean
	onToggleMenu: () => void
	onRenameList: () => void
	onClearCompleted: () => void
	onDeleteList: () => void
}

export const BoardHeader = ({
	currentList,
	listProgress,
	canDeleteList,
	onToggleMenu,
	onRenameList,
	onClearCompleted,
	onDeleteList,
}: BoardHeaderProps) => (
	<div className='flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between'>
		<div className='min-w-0'>
			<div className='flex flex-wrap items-center gap-2'>
				<button
					type='button'
					onClick={onToggleMenu}
					className='rounded-md border border-slate-200 px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
				>
					Меню
				</button>
				<span
					className='h-4 w-4 rounded-full'
					style={{ backgroundColor: currentList.color }}
				/>
				<h2 className='truncate text-2xl font-black text-slate-950 dark:text-white'>
					{currentList.task}
				</h2>
			</div>
			<div className='mt-3 flex max-w-lg items-center gap-3'>
				<div className='h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800'>
					<div
						className='h-full rounded-full bg-emerald-500 transition-all'
						style={{ width: `${listProgress}%` }}
					/>
				</div>
				<span className='text-sm font-bold text-slate-500 dark:text-slate-300'>
					{listProgress}%
				</span>
			</div>
		</div>

		<div className='flex flex-wrap gap-2'>
			<button
				type='button'
				onClick={onRenameList}
				className='rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
			>
				Переименовать
			</button>
			<button
				type='button'
				onClick={onClearCompleted}
				className='rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
			>
				Очистить готовые
			</button>
			<button
				type='button'
				disabled={!canDeleteList}
				onClick={onDeleteList}
				className='rounded-md border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-950'
			>
				Удалить список
			</button>
		</div>
	</div>
)
