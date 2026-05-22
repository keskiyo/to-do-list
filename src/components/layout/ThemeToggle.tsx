import type { ThemeMode } from '../../constants/todoConfig'
import { themeLabels } from '../../constants/todoConfig'

interface ThemeToggleProps {
	themeMode: ThemeMode
	onChange: (themeMode: ThemeMode) => void
}

export const ThemeToggle = ({ themeMode, onChange }: ThemeToggleProps) => (
	<div className='flex min-w-0 flex-wrap items-center gap-2 rounded-lg border border-white bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900'>
		<span className='px-2 text-xs font-bold uppercase text-slate-400'>
			Тема
		</span>
		{Object.entries(themeLabels).map(([value, label]) => (
			<button
				key={value}
				type='button'
				onClick={() => onChange(value as ThemeMode)}
				className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
					themeMode === value
						? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
						: 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
				}`}
			>
				{label}
			</button>
		))}
	</div>
)
