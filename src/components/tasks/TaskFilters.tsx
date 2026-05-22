import type { DisplayState, SortMode } from '../../constants/todoConfig'
import { filterLabels, sortLabels } from '../../constants/todoConfig'

interface TaskFiltersProps {
	searchQuery: string
	displayState: DisplayState
	sortMode: SortMode
	onSearchChange: (value: string) => void
	onDisplayChange: (value: DisplayState) => void
	onSortChange: (value: SortMode) => void
}

export const TaskFilters = ({
	searchQuery,
	displayState,
	sortMode,
	onSearchChange,
	onDisplayChange,
	onSortChange,
}: TaskFiltersProps) => (
	<div className='grid min-w-0 gap-3 border-b border-slate-200 p-4 dark:border-slate-800 lg:grid-cols-[minmax(0,1fr)_auto_auto] sm:p-5'>
		<input
			value={searchQuery}
			onChange={event => onSearchChange(event.target.value)}
			placeholder='Поиск задач'
			className='min-w-0 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-950'
		/>

		<div className='flex flex-wrap gap-2'>
			{Object.entries(filterLabels).map(([value, label]) => (
				<button
					key={value}
					type='button'
					onClick={() => onDisplayChange(value as DisplayState)}
					className={`rounded-md border px-3 py-2 text-sm font-semibold transition ${
						displayState === value
							? 'border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950'
							: 'border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
					}`}
				>
					{label}
				</button>
			))}
		</div>

		<select
			value={sortMode}
			onChange={event => onSortChange(event.target.value as SortMode)}
			className='rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-blue-950'
		>
			{Object.entries(sortLabels).map(([value, label]) => (
				<option key={value} value={value}>
					{label}
				</option>
			))}
		</select>
	</div>
)
