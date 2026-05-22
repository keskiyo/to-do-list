import type { ThemeMode } from '../../constants/todoConfig'
import { AppLogo } from './AppLogo'
import { StatsCards } from './StatsCards'
import { ThemeToggle } from './ThemeToggle'

interface AppHeaderProps {
	activeCount: number
	completedCount: number
	listCount: number
	themeMode: ThemeMode
	onThemeChange: (themeMode: ThemeMode) => void
}

export const AppHeader = ({
	activeCount,
	completedCount,
	listCount,
	themeMode,
	onThemeChange,
}: AppHeaderProps) => (
	<header className='grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end'>
		<div className='flex items-start gap-4'>
			<div className='mt-1'>
				<AppLogo />
			</div>
			<div className='min-w-0'>
				<h1 className='break-words text-4xl font-black leading-tight text-slate-950 dark:text-white sm:text-5xl'>
					My-todo-list
				</h1>
				<p className='mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300'>
					Планируйте задачи по спискам, приоритетам и срокам. Быстро ищите
					нужное, отмечайте важное и следите за прогрессом прямо на доске.
				</p>
			</div>
		</div>

		<div className='grid min-w-0 gap-3 lg:min-w-[420px]'>
			<StatsCards
				activeCount={activeCount}
				completedCount={completedCount}
				listCount={listCount}
			/>
			<ThemeToggle themeMode={themeMode} onChange={onThemeChange} />
		</div>
	</header>
)
